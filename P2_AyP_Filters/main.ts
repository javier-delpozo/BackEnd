type producto = {
  id: number;
  nombre: string;
  precio: number;
};

const productos = [
  { id: 1, nombre: "Producto A", precio: 30 },
  { id: 2, nombre: "Producto B", precio: 20 },
  { id: 3, nombre: "Producto C", precio: 50 },
  { id: 4, nombre: "Producto D", precio: 10 },
];

const handler = async (req: Request): Promise<Response> => {
  const method = req.method;
  const url = new URL(req.url);
  const path = url.pathname;
  const searchParams = url.searchParams;
  if (method === "GET") {
    if (path === "/productos") { //Ruta 1
      if (searchParams.get("maxPrecio")) {
        const maxPrecio = Number(searchParams.get("maxPrecio"));
        const u = productos.filter((elem) => elem.precio <= maxPrecio);
        return new Response(JSON.stringify(u));
      } else if (searchParams.get("minPrecio")) {
        const minPrecio = Number(searchParams.get("minPrecio"));
        const l = productos.filter((elem) => elem.precio >= minPrecio);
        return new Response(JSON.stringify(l));
      } else {
        return new Response(JSON.stringify(productos));
      }
    } else if (path.startsWith("/producto/")) { //Ruta 2
      const idArray = path.split("/")[2];
      const id = Number(idArray);
      const p = productos.find((elem) => elem.id === id);

      if (!p) {
        return new Response("Producto no encontrado", { status: 404 });
      } else {
        return new Response(JSON.stringify(p));
      }
    } else if (path === "/calcular-promedio") { //Ruta 3
      if (searchParams.get("maxPrecio")) {
        const maxPrecio = Number(searchParams.get("maxPrecio"));
        const u = productos.filter((elem) => elem.precio <= maxPrecio);
        const promedioMax = u.reduce((acc, producto) =>
          acc + producto.precio, 0) / u.length;
        return new Response(JSON.stringify(promedioMax));
      } else if (searchParams.get("minPrecio")) {
        const minPrecio = Number(searchParams.get("minPrecio"));
        const l = productos.filter((elem) => elem.precio >= minPrecio);
        const promedioMin = l.reduce((acc, producto) =>
          acc + producto.precio, 0) / l.length;
        return new Response(JSON.stringify(promedioMin));
      } else {
        const promedio = productos.reduce((acc, producto) =>
          acc + producto.precio, 0) / productos.length;
        return new Response(JSON.stringify(promedio));
      }
    }
  }

  return new Response("Endpoint not found", { status: 404 });
};

Deno.serve({ port: 3000 }, handler);
