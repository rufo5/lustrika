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



    // Normalizar nombre recibido

    const zonaNormalizada =
    zona.trim().toLowerCase();



    // Buscar zona ignorando mayúsculas,
    // minúsculas y espacios

    const encontrada =
    Object.entries(CONFIG.envio.zonas)
    .find(([nombre]) =>
        nombre.trim().toLowerCase() === zonaNormalizada
    );



    if(encontrada){

        return encontrada[1];

    }


    return 0;

}