/*=========================================
  LÚSTRIKA PRO 3.0
  MOTOR DEL CATÁLOGO
==========================================*/

let productos = [];


/*=========================================
  CARGAR PRODUCTOS DESDE CSV
==========================================*/

async function cargarProductos(){

    try{

        const respuesta = await fetch("datos/productos.csv");

        if(!respuesta.ok){

            throw new Error("No se encontró productos.csv");

        }


        const texto = await respuesta.text();


        productos = convertirCSV(texto);


        mostrarCatalogo(productos);


    }catch(error){

        console.error(
            "Error cargando catálogo:",
            error
        );

    }

}



/*=========================================
  CONVERTIR CSV
==========================================*/

function convertirCSV(csv){

    const lineas = csv
        .trim()
        .split(/\r?\n/);


    const encabezados = lineas[0]
        .replace(/^\uFEFF/, "")
        .split(";")
        .map(campo => campo.trim().toLowerCase());



    return lineas.slice(1).map(linea => {


        const valores = linea.split(";");


        let producto = {};


        encabezados.forEach((campo,index)=>{

            producto[campo] = valores[index]
            ? valores[index].trim()
            : "";

        });



        return {

            codigo: producto["codigo"],

            categoria: producto["categoria"],

            producto: producto["producto"],

            descripcion: producto["descripcion"] || "",

            formato: producto["formato"],

            marca: producto["marca"],


            precio:Number(
                (producto["precio venta"] || "0")
                .replace(",", ".")
            ),


            imagen: producto["imagen"]

        };


    });


}



/*=========================================
  MOSTRAR CATÁLOGO
==========================================*/

function mostrarCatalogo(lista){


    const contenedor =
    document.getElementById("catalogo");



    if(!contenedor){

        console.error(
            "No existe el contenedor #catalogo"
        );

        return;

    }



    contenedor.innerHTML="";



    lista.forEach(producto=>{


        const tarjeta =
        document.createElement("div");



        tarjeta.className =
        "card-producto";



        tarjeta.innerHTML = `


        <img
        src="imagenes/${producto.imagen}"
        alt="${producto.producto}"
        >



        <h3>
        ${producto.producto}
        </h3>



        <p class="marca">
        ${producto.marca || ""}
        </p>



        <p class="descripcion">
        ${producto.descripcion || ""}
        </p>



        <p class="formato">
        ${producto.formato}
        </p>



        <div class="precio">

        ${formatoMoneda(producto.precio)}

        </div>



        <button
        onclick="agregarAlCarrito('${producto.codigo}')">

        🛒 Agregar al carrito

        </button>



        `;



        contenedor.appendChild(tarjeta);



    });


}



/*=========================================
  BUSCAR PRODUCTO
==========================================*/

function buscarProducto(codigo){


    return productos.find(

        producto =>
        producto.codigo === codigo

    );


}