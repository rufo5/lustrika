/*=========================================
  LÚSTRIKA PRO 3.0
  CONFIGURACIÓN GENERAL
==========================================*/


const CONFIG = {


    // ===============================
    // EMPRESA
    // ===============================

    empresa:{


        nombre:"Lústrika",


        slogan:"Insumos que sí limpian",


        whatsapp:"59896352354",


        email:"",


        ciudad:"Montevideo",


        pais:"Uruguay"


    },



    // ===============================
    // MONEDA
    // ===============================

    moneda:"$",



    // ===============================
    // ENVÍOS
    // ===============================

    envio:{


        envioGratisDesde:5000,


        mensajeGratis:
        "🎁 ¡Tu pedido tiene envío GRATIS!",



        zonas:{


            "Jacinto Vera":150,
            
            "Centro":150,

            "Cordón":150,

            "Palermo":150,

            "Tres Cruces":150,

            "La Blanqueada":180,

            "Aires Puros":180,

            "La Comercial":180,

            "Brazo Oriental":180,
            
            "Parque Batlle":180,

            "Pocitos":200,

            "Punta Carretas":220,

            "Parque Rodó":200,

            "Buceo":220,

            "Malvín":250,

            "Unión":220,

            "Aguada":180,

            "Belvedere":250,

            "Villa Española":220,

            "Cerro":280,

            "La Teja":220,

            "Paso Molino":220,

            "Sayago":260,

            "Colón":320,

            "Lezica":350
              
            

        }


    },



    // ===============================
    // COLORES
    // ===============================

    colores:{


        principal:"#0057b8",


        secundario:"#003f87",


        exito:"#25D366",


        fondo:"#f4f7fb",


        blanco:"#ffffff"


    }


};




// ======================================
// TABLA DE ENVÍOS COMPATIBLE
// ======================================


const ZONAS_ENVIO = Object.entries(
    CONFIG.envio.zonas
).map(([nombre,costo])=>{


    return {


        nombre:nombre,


        costo:costo


    };


});