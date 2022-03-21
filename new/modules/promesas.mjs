// ---------------------------------------- Importar

import {todosLosProductos, productosRecomendados, productosDestacados, ofertas} from "../modules/arrays.mjs";
import {urlProductosJSON} from "../modules/urls.mjs";

// ---------------------------------------- Exportar
export const cargarProductos = async () => {

    const resultado = await fetch(urlProductosJSON);
    const respuesta = await resultado.json();
    respuesta.forEach(producto => {

        todosLosProductos.push(producto);

        (producto.categoria === 'Consolas') && productosRecomendados.push(producto);

        (producto.categoria === 'Celulares') && productosDestacados.push(producto);

        (producto.categoria === 'Notebooks') && ofertas.push(producto);

    });

}

export const procesarPago = new Promise( (myResolve, myReject) => {

    setTimeout(() => {
        
        let random = Math.random() * 11;
        
        if (random < 9) {
        
            myResolve('Pago aceptado ');
            
        } else {
            
            myReject('Pago rechazado');
            
        }
        
    }, 1000);

});