/*=========================================
  LÚSTRIKA PRO 3.0
  APP PRINCIPAL
==========================================*/


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


            const nombre =
            document.getElementById("cliente-nombre")?.value || "";



            const localidad =
            document.getElementById("cliente-localidad")?.value || "";



            const direccion =
            document.getElementById("cliente-direccion")?.value || "";



            const puerta =
            document.getElementById("cliente-puerta")?.value || "";



            const telefono =
            document.getElementById("cliente-telefono")?.value || "";




            let mensaje =
            "🛒 *Pedido Lústrika*%0A%0A";



            mensaje +=
            "Cliente: " +
            nombre +
            "%0A";



            mensaje +=
            "Teléfono: " +
            telefono +
            "%0A";



            mensaje +=
            "Localidad: " +
            localidad +
            "%0A";



            mensaje +=
            "Dirección: " +
            direccion +
            " " +
            puerta +
            "%0A%0A";




            if(typeof carrito !== "undefined"){



                carrito.forEach(item=>{


                    mensaje +=
                    item.producto +
                    " x" +
                    item.cantidad +
                    "%0A";


                });


            }



            const subtotal =
            calcularTotal();



            const envio =
            calcularEnvio(subtotal, localidad);



            mensaje +=
            "%0ASubtotal: $" +
            subtotal.toFixed(2);



            mensaje +=
            "%0AEnvío: $" +
            envio.toFixed(2);



            mensaje +=
            "%0ATotal: $" +
            (subtotal + envio).toFixed(2);




            const url =
            "https://wa.me/" +
            CONFIG.empresa.whatsapp +
            "?text=" +
            encodeURIComponent(
                mensaje
            );



            window.open(url,"_blank");


        });


    }


});