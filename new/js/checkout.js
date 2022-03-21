// ---------------------------------------- Importar

import {showMenu} from "../modules/menu.mjs";
import {showFooter} from "../modules/footer.mjs";
import {procesarPago} from "../modules/promesas.mjs";

// ---------------------------------------- DOM

const main = document.getElementsByTagName('main')[0];
const container = document.getElementsByTagName('main')[0].children[0];

main.onclick = () => {
    container.innerHTML = `
        <h5>Cargando</h5>
    `;
}

// ---------------------------------------- Promesa

procesarPago.then( (value) => {
container.innerHTML = `
    <h5>${value}</h5>
`;
})
.catch( (error) => {
container.innerHTML = `
    <h5>${error}</h5>
`;
})

showMenu();
showFooter();
