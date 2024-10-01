
function torresHanoi(nDiscos:number, torreInicial:string, torreFinal : string, torreAux: string): void  {

    if(nDiscos === 0){  // comprueba si no hay discos ya que si no hay no se puede jugar
        console.log("Las torres estan vacias")

    }else if (nDiscos === 1) { //siempre se coloca primero el mas pequeño en la torre destino
        console.log("Mover disco 1 de " + torreInicial + " a " + torreFinal); 
        return;
    }
    

    //en los pasos impares el disco pequeño se lleva a la torre de su izquierda o si ya esta ahí a la destino
    torresHanoi(nDiscos - 1, torreInicial, torreAux, torreFinal);
    console.log("Mover disco " + nDiscos + " de " + torreInicial +  " a " + torreFinal);
  
    torresHanoi(nDiscos - 1, torreAux, torreFinal, torreInicial);
}

  
torresHanoi(3, "TorreIn", 'TorreFin', 'TorreMed'); 



