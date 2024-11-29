import { Collection, ObjectId } from "mongodb";
import { Flight, FlightModel } from "./types.ts";
import { fromModelToFlight } from "./utils.ts";

export const resolvers = {
  Query: {
    getFlights: async (
        _: unknown, 
        { origen, destino }: { origen?: string; destino?: string }, 
        context: { FlightsCollection: Collection<FlightModel> }, 
      ): Promise<Flight[]> => {
        const query: { origen?: string; destino?: string } = {};       
        if (origen) {
          query.origen = origen;
        }
        
        if (destino) {
          query.destino = destino;
        }
        const flightsModel = await context.FlightsCollection.find(query).toArray();
  
        return flightsModel.map((flightModel) => fromModelToFlight(flightModel));
      },
  
    getFlight: async (
      _: unknown,
      { id }: { id: string },
      context: {
        FlightsCollection: Collection<FlightModel>;
      },
    ): Promise<Flight | null> => {
      const flightModel = await context.FlightsCollection.findOne({
        _id: new ObjectId(id),
      });
      if (!flightModel) {
        return null;
      }
      return fromModelToFlight(flightModel);
    },
  },
  Mutation: {
    addFlight: async (
      _: unknown,
      args: { origen: string; destino: string; fecha: string },
      context: {
        FlightsCollection: Collection<FlightModel>;
      },
    ): Promise<Flight> => {
      const { origen, destino, fecha } = args;
      const { insertedId } = await context.FlightsCollection.insertOne({
        origen,
        destino,
        fecha,
      });
      const flightModel = {
        _id: insertedId,
        origen,
        destino,
        fecha,
      };
      return fromModelToFlight(flightModel!);
    },
   
  },
};