// ---------------------------------------- Importar

import {showMenu} from "../modules/menu.mjs";
import {showFooter} from "../modules/footer.mjs";
import {cargarProductos} from "../modules/promesas.mjs";
import {urlInicio} from "../modules/urls.mjs";

import {manejarImagesProducto, mostrarColores, mostrarError, mostrarNombreProducto, mostrarDescripcion, manejarCantidades, agregarOQuitarFavoritos, mostrarEstadoFavorito} from "../modules/funciones.mjs";
import {todosLosProductos} from "../modules/arrays.mjs";

// ---------------------------------------- Ver Url

// Obtener parametros en url
const queryString   = window.location.search;
const urlParams     = new URLSearchParams(queryString);
// Obtener parametro productId
const productId     = urlParams.get('id') - 1;
// Si no se puede obtener el id del producto, volvera pagina principal
productId === -1 && (window.location.href = urlInicio);

// ---------------------------------------- DOM

const main = document.getElementsByTagName('main')[0];
const nombreDom = document.getElementById('detalles').children[0];
const coloresDom = document.getElementById('detalles').children[1].children[1];
const descripDom = document.getElementById('detalles').children[2].children[1];
const favoritosDom = document.getElementsByClassName('addFavourite')[0];

// ---------------------------------------- Promesa

cargarProductos()
.then( () => {
    // Si el id no existe, volver a inicio
    productId > todosLosProductos.length && (window.location.href = urlInicio);
    /*
    1- Obtener imagenes preview
    2- Obtener imagen principal
    3- Obtener nombre
    4- Obtener opciones colores
    5- Obtener descripcion
    6- Obtener disponibles
    7- Comprar
    8- Agregar a carrito
    9- Agregar a favorito
    */
    manejarImagesProducto(productId, 1);
    mostrarNombreProducto(productId, nombreDom);
    mostrarColores(productId, coloresDom);
    mostrarDescripcion(productId, descripDom);
    manejarCantidades(productId);
    mostrarEstadoFavorito(productId, favoritosDom);
    favoritosDom.onclick = () => {agregarOQuitarFavoritos(productId, favoritosDom);}
})
.catch( (res) => {
    mostrarError(main, res);
})
.finally( () => {
    showMenu();
    showFooter();
})