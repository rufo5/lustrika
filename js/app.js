/*=========================================
  LÚSTRIKA PRO 3.0
  APP PRINCIPAL
==========================================*/


/*=========================================
  GENERADOR DE CÓDIGO DE PEDIDO
=========================================*/

function generarCodigoPedido(){

    const ahora = new Date();


    const fecha =
    String(ahora.getFullYear()).slice(2) +
    String(ahora.getMonth()+1).padStart(2,"0") +
    String(ahora.getDate()).padStart(2,"0");


    let ultimo =
    localStorage.getItem("numeroPedido") || 0;


    ultimo = Number(ultimo) + 1;


    localStorage.setItem(
        "numeroPedido",
        ultimo
    );


    return (
        "LUS-" +
        fecha +
        "-" +
        String(ultimo).padStart(3,"0")
    );

}

document.addEventListener(
"DOMContentLoaded",
()=>{


    // ===============================
    // CARGAR CATÁLOGO
    // ===============================

    cargarProductos();



    // ===============================
// ABRIR CARRITO
// ===============================

const botonCarrito =
document.getElementById("carrito-btn");


const modal =
document.getElementById("modal-carrito");



if(botonCarrito && modal){


    botonCarrito.addEventListener(
"click",
()=>{

    modal.classList.add("activo");


    if(typeof mostrarCarrito === "function"){

        mostrarCarrito();

    }

});

}





    // ===============================
    // CERRAR CARRITO
    // ===============================

    const cerrar =
    document.getElementById("cerrar-carrito");



    if(cerrar && modal){


        cerrar.addEventListener(
        "click",
        ()=>{

            modal.classList.remove("activo");

        });


    }




    // ===============================
    // WHATSAPP GENERAL
    // ===============================

    const whatsappGeneral =
    document.getElementById("whatsapp-general");



    if(whatsappGeneral){


        whatsappGeneral.addEventListener(
        "click",
        ()=>{


            const mensaje =
            "Hola Lústrika, quiero consultar por productos de limpieza.";



            const url =
            "https://wa.me/" +
            CONFIG.empresa.whatsapp +
            "?text=" +
            encodeURIComponent(mensaje);



            window.open(url,"_blank");


        });


    }




    // ===============================
    // ENVIAR PEDIDO
    // ===============================

    const enviarPedido =
    document.getElementById("enviar-whatsapp");



    if(enviarPedido){


        enviarPedido.addEventListener(
        "click",
        ()=>{
if(!carrito || carrito.length === 0){

    alert("El carrito está vacío. Agregue productos antes de enviar el pedido.");

    return;

}

            const nombre =
            document.getElementById("cliente-nombre")?.value || "";



            const localidad =
            document.getElementById("cliente-localidad")?.value || "";



            const direccion =
            document.getElementById("cliente-direccion")?.value || "";


const puerta =
document.getElementById("cliente-puerta")?.value || "";


const telefono =
document.getElementById("cliente-telefono")?.value.trim() || "";

if(!nombre.trim()){

    alert("Por favor ingrese el nombre del cliente.");

    return;

}


if(!telefono || telefono.length < 8){

    alert("Ingrese un teléfono válido.");

    return;

}


if(!localidad){

    alert("Seleccione una zona de entrega.");

    return;

}


if(!direccion.trim()){

    alert("Ingrese la dirección de entrega.");

    return;

}


if(!puerta.trim()){

    alert("Ingrese el número de puerta.");

    return;

}


const referencia =
document.getElementById("cliente-referencia")?.value.trim() || "";


if(!referencia){

    alert("Ingrese una referencia de entrega.");

    return;

}

if(telefono.length < 8){

    alert("Ingrese un teléfono válido.");

    return;

}


            /*=========================================
  CÓDIGO DE PEDIDO
=========================================*/

const ahora = new Date();

const fecha =
String(ahora.getDate()).padStart(2,"0") + "/" +
String(ahora.getMonth()+1).padStart(2,"0") + "/" +
ahora.getFullYear();


const hora =
String(ahora.getHours()).padStart(2,"0") + ":" +
String(ahora.getMinutes()).padStart(2,"0");


const codigoPedido =
generarCodigoPedido();

let mensaje = "";

mensaje += "*LÚSTRIKA*\n";
mensaje += "Insumos que sí limpian\n\n";

mensaje += "══════════════════════\n";
mensaje += "*NUEVO PEDIDO*\n";
mensaje += "══════════════════════\n\n";

mensaje += "*Pedido:* " + codigoPedido + "\n";
mensaje += "*Fecha:* " + fecha + "\n";
mensaje += "*Hora:* " + hora + "\n\n";

mensaje += "*Cliente:* " + nombre + "\n";
mensaje += "*Teléfono:* " + telefono + "\n\n";

mensaje += "══════════════════════\n";
mensaje += "*DATOS DE ENTREGA*\n";
mensaje += "══════════════════════\n";
mensaje += "Zona: " + localidad + "\n";
mensaje += "Dirección: " + direccion + " " + puerta + "\n\n";

mensaje += "\n══════════════════════\n";
mensaje += "*PRODUCTOS*\n";
mensaje += "══════════════════════\n\n";

if(typeof carrito !== "undefined"){

carrito.forEach(item=>{

    const precio =
    Number(item.precio);

    const subtotalProducto =
    precio * item.cantidad;


    mensaje +=
    "- " +
    item.cantidad +
    " x " +
    item.producto +
    " (" +
    (item.formato || "") +
    ")\n";


    mensaje +=
    "  Precio unitario: $ " +
    precio.toLocaleString("es-UY", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }) +
    "\n";


    mensaje +=
    "  Subtotal: $ " +
    subtotalProducto.toLocaleString("es-UY", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }) +
    "\n\n";

});
}


const subtotal =
calcularTotal();


if(subtotal < CONFIG.envio.envioGratisDesde && !localidad){

    alert("Por favor seleccione una localidad para calcular el envío.");

    return;

}


const envio =
calcularEnvio(subtotal, localidad);



mensaje += "\n══════════════════════\n";
mensaje += "*RESUMEN DE COMPRA*\n";
mensaje += "══════════════════════\n\n";

mensaje +=
"Subtotal: $ " +
subtotal.toLocaleString("es-UY", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
}) +
"\n";


mensaje +=
"Envío: $ " +
envio.toLocaleString("es-UY", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
}) +
"\n";


mensaje +=
"--------------------\n";


mensaje +=
"*TOTAL: $ " +
(subtotal + envio).toLocaleString("es-UY", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
}) +
"*";


mensaje += "\n\n";
mensaje += "━━━━━━━━━━━━━━━━━━━━\n\n";

mensaje += "*PASOS PARA COMPLETAR TU COMPRA:*\n";
mensaje += "1. Enviaremos tu pedido para confirmar stock.\n";
mensaje += "2. Una vez confirmado, realiza la transferencia por el monto total.\n";
mensaje += "3. Envía el comprobante por este medio.\n";
mensaje += "_Nota: El pedido se procesará y coordinará una vez verificado el pago._\n\n";
mensaje += "\n══════════════════════\n";
mensaje += "*DATOS PARA LA TRANSFERENCIA*\n";
mensaje += "══════════════════════\n\n";
mensaje += "• Cuenta: Prex\n";
mensaje += "• Número de Cuenta: 1112997\n";
mensaje += "• Titular: Rufo Hernandez\n\n";
mensaje += "\n══════════════════════\n";
mensaje += "*PLAZOS DE ENTREGA (MONTEVIDEO)*\n";
mensaje += "══════════════════════\n\n";
mensaje += "• Entrega en un plazo máximo de *3 días hábiles* post pago.\n";
mensaje += "• Horario de reparto: A convenir por Whatsapp.\n";
mensaje += "• El transportista solo entrega mercadería (no gestiona cobros).\n\n";

mensaje += "¡Muchas gracias por elegir a *Lústrika*!";
const url =
"https://wa.me/" +
CONFIG.empresa.whatsapp +
"?text=" +
encodeURIComponent(mensaje);


window.open(url,"_blank");
            



           


        });


    }


});