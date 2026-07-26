/*=========================================
  LÚSTRIKA PRO 3.0
  SISTEMA DE ENVÍOS
=========================================*/


function calcularEnvio(total, zona){


    // Envío gratis

    if(total >= CONFIG.envio.envioGratisDesde){

        return 0;

    }


    // Sin zona seleccionada

    if(!zona){

        return 0;

    }


    // Buscar costo de zona

    const costo =
    CONFIG.envio.zonas[zona];


    if(costo){

        return costo;

    }


    return 0;

}