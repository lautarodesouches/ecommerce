// ---------------------------------------- Importar

import {showMenu} from "../modules/menu.mjs";
import {showFooter} from "../modules/footer.mjs";
import {mostrarError} from "../modules/funciones.mjs";
import {cargarProductos} from "../modules/promesas.mjs";
import {urlInicio} from "../modules/urls.mjs";

// ---------------------------------------- Ver Url

// Obtener parametros en url
const queryString   = window.location.search;
const urlParams     = new URLSearchParams(queryString);
// Obtener parametro productId
const productId     = urlParams.get('id');
// Si no se puede obtener el id del producto, volvera pagina principal
productId === null && (window.location.href = urlInicio);

// ---------------------------------------- DOM

const main = document.getElementsByTagName('main')[0];

// ---------------------------------------- Promesa

cargarProductos()
.then( () => {
    
})
.catch( (res) => {
    mostrarError(main, res);
})
.finally( () => {
    showMenu();
    showFooter();
})