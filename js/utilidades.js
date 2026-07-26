/*=========================================
  LÚSTRIKA PRO 3.0
  UTILIDADES
==========================================*/


/*==============================
 FORMATO MONEDA
==============================*/

function formatoMoneda(valor){

    return CONFIG.moneda + " " + Number(valor).toFixed(2);

}



/*==============================
 ENVÍO GRATIS
==============================*/

function envioGratis(total){

    return total >= CONFIG.envio.envioGratisDesde;

}



/*==============================
 COSTO ENVÍO
==============================*/

function calcularEnvio(total, localidad){


    // Si supera el mínimo, envío gratis

    if(envioGratis(total)){

        return 0;

    }



    const zona =
    ZONAS_ENVIO.find(z =>
        z.nombre === localidad
    );



    if(!zona){

        return 0;

    }



    return Number(zona.costo);


}



/*==============================
 TOTAL FINAL
==============================*/

function totalFinal(total, localidad){

    return total + calcularEnvio(total, localidad);

}



/*==============================
 FECHA
==============================*/

function fechaActual(){

    return new Date().toLocaleDateString("es-UY");

}



/*==============================
 HORA
==============================*/

function horaActual(){

    return new Date().toLocaleTimeString("es-UY");

}



/*==============================
 MENSAJE ENVÍO
==============================*/

function mensajeEnvio(total, localidad){


    if(envioGratis(total)){


        return CONFIG.envio.mensajeGratis;


    }



    if(localidad){


        return "🚚 Costo de envío: " +
        formatoMoneda(
            calcularEnvio(total, localidad)
        );


    }



    return "Seleccione localidad para calcular envío";


}



/*==============================
 MENSAJE WHATSAPP
==============================*/

function generarMensajeWhatsApp(cliente, localidad){


    let mensaje = "";


    mensaje +=
    "🛒 *Pedido Lústrika Pro*%0A%0A";


    mensaje +=
    "Cliente: " +
    cliente +
    "%0A";


    mensaje +=
    "Localidad: " +
    localidad +
    "%0A%0A";



    carrito.forEach(item=>{


        mensaje +=
        item.producto +
        " x" +
        item.cantidad +
        "%0A";


    });



    const subtotal =
    calcularTotal();



    const envio =
    calcularEnvio(subtotal, localidad);



    mensaje +=
    "%0ASubtotal: " +
    formatoMoneda(subtotal);



    mensaje +=
    "%0AEnvío: " +
    formatoMoneda(envio);



    mensaje +=
    "%0ATotal: " +
    formatoMoneda(subtotal + envio);



    return mensaje;


}