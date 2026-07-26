/*=========================================
  LÚSTRIKA PRO 3.0
  MOTOR DEL CARRITO
==========================================*/

let carrito = [];

/*==============================
 AGREGAR PRODUCTO
==============================*/

function agregarAlCarrito(codigo){

    const producto = buscarProducto(codigo);

    if(!producto) return;

    const existente = carrito.find(item => item.codigo === codigo);

    if(existente){

        existente.cantidad++;

    }else{

        carrito.push({

            ...producto,
            cantidad:1

        });

    }

    actualizarCarrito();

}

/*==============================
 QUITAR PRODUCTO
==============================*/

function quitarProducto(codigo){

    carrito = carrito.filter(item=>item.codigo!==codigo);

    actualizarCarrito();

}

/*==============================
 SUMAR CANTIDAD
==============================*/

function aumentarCantidad(codigo){

    const item = carrito.find(i=>i.codigo===codigo);

    if(item){

        item.cantidad++;

        actualizarCarrito();

    }

}

/*==============================
 RESTAR CANTIDAD
==============================*/

function disminuirCantidad(codigo){

    const item = carrito.find(i=>i.codigo===codigo);

    if(!item) return;

    item.cantidad--;

    if(item.cantidad<=0){

        quitarProducto(codigo);

        return;

    }

    actualizarCarrito();

}

/*==============================
 TOTAL
==============================*/

function calcularTotal(){

    return carrito.reduce((total,item)=>{

        return total + (Number(item.precio) * item.cantidad);

    },0);

}

/*==============================
 CONTADOR
==============================*/

function cantidadProductos(){

    return carrito.reduce((t,item)=>{

        return t + item.cantidad;

    },0);

}

/*==============================
 ACTUALIZAR
==============================*/

function actualizarCarrito(){

    actualizarContador();

    mostrarCarrito();

}

/*==============================
 CONTADOR VISUAL
==============================*/

function actualizarContador(){

    const contador=document.getElementById("contador-carrito");

    if(contador){

        contador.textContent=cantidadProductos();

    }

}

/*==============================
 MOSTRAR
==============================*/

function mostrarCarrito(){

    const lista=document.getElementById("lista-carrito");

    if(!lista) return;


    lista.innerHTML="";


    carrito.forEach(item=>{


        const fila=document.createElement("div");


        fila.className="item-carrito";


        fila.innerHTML=`


            <div>

                
<strong>${item.producto}</strong><br>

<span>
Código: ${item.codigo}
</span><br>

<span>
Formato: ${item.formato || ""}
</span><br>

Cantidad: ${item.cantidad} × $${Number(item.precio).toFixed(2)}
            </div>


            <div>


                <button onclick="disminuirCantidad('${item.codigo}')">
                    −
                </button>


                <button onclick="aumentarCantidad('${item.codigo}')">
                    +
                </button>


                <button onclick="quitarProducto('${item.codigo}')">

                    🗑

                </button>


            </div>


        `;


        lista.appendChild(fila);


    });



    // Actualizar subtotal

    const subtotal =
    document.getElementById("subtotal-carrito");


    if(subtotal){

        subtotal.textContent =
        calcularTotal().toFixed(2);

    }



    // Actualizar envío si existe la función

    if(typeof actualizarEnvio === "function"){

        actualizarEnvio();

    }


}

/*==============================
 ACTUALIZAR ENVÍO
==============================*/

function actualizarEnvio(){

    const localidad =
    document.getElementById("cliente-localidad")?.value || "";


    const subtotal =
    calcularTotal();



    let envio = 0;


    if(typeof calcularEnvio === "function"){

        envio = calcularEnvio(subtotal, localidad);

    }



    const campoEnvio =
    document.getElementById("envio-carrito");


    if(campoEnvio){

        campoEnvio.textContent =
        envio.toFixed(2);

    }



    const campoTotal =
    document.getElementById("total-carrito");


    if(campoTotal){

        campoTotal.textContent =
        (subtotal + envio).toFixed(2);

    }



    const mensaje =
    document.getElementById("mensaje-envio");



    if(mensaje){


        if(subtotal >= CONFIG.envio.envioGratisDesde){


            mensaje.textContent =
            "🎉 Tu pedido tiene envío gratis";


        }else if(localidad){


            mensaje.textContent =
            "⚠️ Envío calculado según tu localidad";


        }else{


            mensaje.textContent =
            "Seleccione una localidad para calcular el envío";


        }

    }


}

/*==============================
 CAMBIO DE LOCALIDAD
==============================*/

document.addEventListener(
"change",
function(e){


    if(e.target.id === "cliente-localidad"){


        actualizarEnvio();


    }


});