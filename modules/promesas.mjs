// ---------------------------------------- Importar

import {todosLosProductos, productosRecomendados, productosDestacados, ofertas} from "../modules/arrays.mjs";
import {urlPagar, urlInicio, urlProductosJSON} from "../modules/urls.mjs";

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

export const procesarPago  = async (dom, expirationMonth, expirationYear) => {
    const resultado = new Promise( (myResolve, myReject) => {

        setTimeout(() => {

            let date = new Date();
            let exp = new Date(expirationYear, expirationMonth);
        
            if (exp.valueOf() > date.valueOf()) {
        
                myResolve(
                    dom.innerHTML = `
                        <h5>Pago aceptado</h5>
                        <h5>Gracias por tu compra!</h5>
                        <a href="${urlInicio}">
                            <button class="btn btn-primary mt-4">Volver al inicio</button>
                        </a>
                    `
                )
            
            } else {
            
                myReject(
                    dom.innerHTML = `
                        <h5 class="text-danger">Pago rechazado</h5>
                        <a href="${urlPagar}">
                            <button class="btn btn-primary mt-4">Volver a intentar</button>
                        </a>
                    `
                )
            
            }
        
        }, 4000);

    })

    return resultado

}