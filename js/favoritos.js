// ---------------------------------------- Importar

import {showMenu} from "../modules/menu.mjs";
import {showFooter} from "../modules/footer.mjs";
import {mostrarProductos, mostrarError, noHayFavoritos} from "../modules/funciones.mjs";
import {cargarProductos} from "../modules/promesas.mjs";
import {favoritos} from "../modules/arrays.mjs";
import {main} from "../modules/dom.mjs";

// ---------------------------------------- Promesa

cargarProductos()
.then( () => {
    favoritos.length > 0 ? mostrarProductos('favoritos', 'Favoritos', favoritos, favoritos.length, main) : noHayFavoritos(main);
})
.finally( () => {
    showMenu();
    showFooter();
})