// ---------------------------------------- Importar

import {showMenu} from "../modules/menu.mjs";
import {showFooter} from "../modules/footer.mjs";
import {mostrarProductos, mostrarError} from "../modules/funciones.mjs";
import {cargarProductos} from "../modules/promesas.mjs";
import {ofertas} from "../modules/arrays.mjs";

// ---------------------------------------- DOM

const main = document.getElementsByTagName('main')[0];

// ---------------------------------------- Promesa

cargarProductos()
.then( () => {
    mostrarProductos('ofertas', 'Ofertas', ofertas, ofertas.length, main);
})
.catch( (res) => {
    mostrarError(main, res);
})
.finally( () => {
    showMenu();
    showFooter();
})