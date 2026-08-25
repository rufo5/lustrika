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


            "Jacinto Vera":250,
            
            "Centro":250,

            "Cordón":250,

            "Palermo":150,

            "Tres Cruces":250,

            "La Blanqueada":200,

            "Aires Puros":250,

            "La Comercial":200,

            "Brazo Oriental":250,
            
            "Parque Batlle":250,

            "Pocitos":300,

            "Punta Carretas":300,

            "Parque Rodó":300,

            "Buceo":280,

            "Malvín":280,

            "Unión":220,

            "Aguada":200,

            "Belvedere":300,

            "Villa Española":280,

            "Cerro":320,

            "La Teja":300,

            "Paso Molino":280,

            "Sayago":250,

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