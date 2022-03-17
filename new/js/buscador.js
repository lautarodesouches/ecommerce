// ---------------------------------------- Importar

import {showMenu} from "../modules/menu.mjs";
import {showFooter} from "../modules/footer.mjs";
import {copiarArray, mostrarError, mostrarProductos, mostrarCategoria, mostrarMarca} from "../modules/funciones.mjs";
import {cargarProductos} from "../modules/promesas.mjs";
import {todosLosProductos, copiaTodosLosProductos} from "../modules/arrays.mjs";

// ---------------------------------------- DOM

const main = document.getElementsByTagName('main')[0];
const resultadosDOM = document.getElementById('resultados');

// ---------------------------------------- Promesa

cargarProductos()
.then( () => {
    copiarArray(todosLosProductos, copiaTodosLosProductos);
    mostrarCategoria(copiaTodosLosProductos);
    mostrarMarca(copiaTodosLosProductos);
    mostrarProductos('resultados','Resultados', copiaTodosLosProductos, copiaTodosLosProductos.length, resultadosDOM);
})
.catch( (res) => {
    mostrarError(main, res);
})
.finally( () => {
    showMenu();
    showFooter();
})