// ---------------------------------------- Importar

import {showMenu} from "../modules/menu.mjs";
import {showFooter} from "../modules/footer.mjs";
import {mostrarProductos, mostrarError, noHayFavoritos} from "../modules/funciones.mjs";
import {cargarProductos} from "../modules/promesas.mjs";
import {favoritos} from "../modules/arrays.mjs";

// ---------------------------------------- DOM

const main = document.getElementsByTagName('main')[0];

// ---------------------------------------- Promesa

cargarProductos()
.then( () => {
    favoritos.length > 0 ? mostrarProductos('favoritos', 'Favoritos', favoritos, favoritos.length, main) : noHayFavoritos(main);
})
.catch( (res) => {
    mostrarError(main, res);
})
.finally( () => {
    showMenu();
    showFooter();
})