// ======================================== RESPONSIVE ========================================

// ---------------------------------------- DOM

const limit_size_screen = window.matchMedia('screen and (max-width: 768px)');

// ---------------------------------------- Funciones

// Verificar si el tamaño de la pantalla es menor a 768
limit_size_screen.matches && window.location.replace('mobile.html');

// ---------------------------------------- Eventos

// Si el tamaño de la pantalla cambia, recargar página
limit_size_screen.onchange = () => {location.reload()};

// ======================================== INDEX ========================================

// ---------------------------------------- Variables

let copiaListaDeProductos;

const listaMarcas           = [];
const listaCategorias       = [];
const listaFiltrosActivos   = [];

// ---------------------------------------- DOM

const buscadorPrincipal     = document.getElementById('buscadorPrincipal');
const buscarPrecioMinimo    = document.getElementById('precioMinimo');
const buscarPrecioMaximo    = document.getElementById('precioMaximo');
const agregarFiltroPrecio   = document.getElementById('agregarFiltroPrecio');
const ordenActual           = document.getElementsByClassName('ordenActual');
const ordenar               = document.getElementById('ordenar');
const abrirOpcionesOrden    = document.getElementById('abrirOpcionesOrden');
const opcionesOrden         = document.getElementById('opcionesOrden');
const orden                 = document.getElementById('orden');
const marcas                = document.getElementById('marcas');
const categorias            = document.getElementById('categorias');
const elegirEnvio           = document.getElementsByClassName('tipoEnvio');
const productos             = document.getElementById('productos');
const filtrosActivos        = document.getElementById('filtrosActivos');

// ---------------------------------------- Funciones

// Copiar lista de productos para filtrar
function copiarListaDeProductos() {
    copiaListaDeProductos = Object.assign(listaProductos);
}

// Buscador principal
buscadorPrincipal.oninput = (e) => {

    // Borrar anterior
    borrarFiltro(null, 'Busqueda');

    // Si el imput no esta vacio agregar filtro
    e.target.value && agregarFiltroActivo(e.target.value, 'Busqueda');
    
    // Correr funciones
    correr();

}

// Buscar en Categorias, Marcas y Nombre
function buscar(busqueda) {
    if (busqueda !== null) {
        busqueda = busqueda.toLowerCase();
        copiaListaDeProductos = copiaListaDeProductos.filter( (el) => el.nombre.toLowerCase().includes(busqueda) || el.marca.toLowerCase().includes(busqueda) || el.categoria.toLowerCase().includes(busqueda));
    }
}

// Buscar precio (minimo o maximo)
function buscarPrecio(tipo) {

    // Borrar filtro anterior
    borrarFiltro(null, tipo);

    let tipoValue;

    // Asignar DOM segun tipo
    tipo === 'Precio Min' ? tipoValue = buscarPrecioMinimo.value : tipoValue = buscarPrecioMaximo.value;

    // Si el imput no esta vacio agregar filtro
    tipoValue && agregarFiltroActivo(tipoValue, tipo);

    // Correr funciones
    correr();

}

buscarPrecioMinimo.oninput = () => { buscarPrecio('Precio Min') }

// Filtrar por precio minimo
function filtrarPorPrecioMinimo(precioMinimo) {
    // Si no es null, filtrar
    precioMinimo && ( copiaListaDeProductos = copiaListaDeProductos.filter( (el) => el.precio > precioMinimo) );
}

buscarPrecioMaximo.oninput = () => { buscarPrecio('Precio Max') }

// Filtrar por precio maximo
function filtrarPorPrecioMaximo(precioMaximo) {
    // Si no es null, filtrar
    precioMaximo && ( copiaListaDeProductos = copiaListaDeProductos.filter( (el) => el.precio < precioMaximo ) );
}


agregarFiltroPrecio.onclick = () => { buscarPrecio('Precio Min'); buscarPrecio('Precio Max'); }

// Filtrar por categoria
function filtrarPorCategoria(categoria) {
    // Si no es null, filtrar
    categoria && ( copiaListaDeProductos = copiaListaDeProductos.filter( (el) => el.categoria.toLowerCase().includes(categoria.toLowerCase()) ) );
}

// Filtrar por marca
function filtrarPorMarca(marca) {
    // Si no es null, filtrar
    marca && ( copiaListaDeProductos = copiaListaDeProductos.filter( (el) => el.marca.toLowerCase().includes(marca.toLowerCase()) ) );
}

// Filtrar por tipo de envio
function filtrarPorTipoDeEnvio(tipoEnvio) {
    // Si no es null, filtrar
    tipoEnvio !== null && ( copiaListaDeProductos = copiaListaDeProductos.filter( (el) => el.envioGratis === tipoEnvio ) );
}

// Borrar clase ordenActual (fondo azul) 
function borrarOrdenAnterior() {
    ordenActual[0].classList.remove('ordenActual');
}

// Lista de opciones de orden con el nombre a mostrar, el identificador, la funcion que tiene que realizar y si es el orden activo
const listaDeOrden = [{nombre: 'Menor precio', id: 'menorPrecio', funcion: ordenarPrecioAscendente, activo: true}, {nombre: 'Mayor precio', id: 'mayorPrecio', funcion: ordenarPrecioDescendente, activo: false}, {nombre: 'Nombre A-Z', id: 'nombreAscendente', funcion: ordenarNombreAZ, activo: false}, {nombre: 'Nombre Z-A', id: 'nombreDescendente', funcion: ordenarNombreZA, activo: false}, {nombre: 'Random', id: 'random', funcion: ordenRandom, activo: false}]

// Mostrar opciones de orden disponibles en DOM
for (const iterator of listaDeOrden) {

    // Creo el li, asigno id y clase
    let contenedor = document.createElement('li');
    contenedor.id = iterator.id;
    contenedor.classList = 'p-2';

    // Si esta activo, agrego clase especial
    iterator.activo && contenedor.classList.add('ordenActual');

    // Mostrar nombre
    contenedor.innerText = iterator.nombre;

    // Asignar onclick
    contenedor.onclick = () => {
        
        // Borra la case ordenActual del orden anterior
        borrarOrdenAnterior();

        // Recorrer ordenes y desactivar activo
        for (const iterator of listaDeOrden) {
            iterator.activo && (iterator.activo = false);
        }

        // Activar solamente actual
        iterator.activo = true;
        
        // Cierra la lista de opciones
        changeDisplay(opcionesOrden);

        // Cambia el nombre del "Ordenar por:"
        orden.innerText = iterator.nombre;

        // Asigna la case ordenActual
        document.getElementById(iterator.id).classList.add('ordenActual');

        // Notificacion
        Toastify({
            text: "Orden aplicado",
            style: {
                background: "#fff",
                color: "#000",
            },
            duration: 2000
        }).showToast();

        correr();

    }

    opcionesOrden.children[0].appendChild(contenedor);

    // Crear una linea separadora
    contenedor = document.createElement('hr');
    contenedor.classList = 'm-0 w-100';
    opcionesOrden.children[0].appendChild(contenedor);

}

// Tipos de orden

function ordenRandom() {copiaListaDeProductos.sort(function() { return Math.random() - 0.5 })};

function ordenarPrecioAscendente() {copiaListaDeProductos.sort((a, b) => a.precio - b.precio)};

function ordenarPrecioDescendente() {copiaListaDeProductos.sort((a, b) => b.precio - a.precio)};

function ordenarNombreAZ() {
    
    // Ordenar por nombre A-Z
    copiaListaDeProductos.sort((a, b) => {
        if (a.nombre > b.nombre) {
            return 1;
        }
        if (a.nombre < b.nombre) {
            return -1;
        }
        // a es igual a b
        return 0;
    });

}

function ordenarNombreZA() {
    
    // Ordenar por nombre Z-A
    copiaListaDeProductos.sort((a, b) => {
        if (a.nombre < b.nombre) {
            return 1;
        }
        if (a.nombre > b.nombre) {
            return -1;
        }
        // a es igual a b
        return 0;
    });

}

function aplicarOrden() {
    for (const iterator of listaDeOrden) {
        iterator.activo && iterator.funcion();
    };
}

function agregarMarcasALista() {

    // Limpiar lista marcas
    listaMarcas.splice(0,listaMarcas.length);

    let copiaListaDeProductosLength = copiaListaDeProductos.length;

    // Agregar todas las marcas encontradas en lista de productos
    for (let i = 0; i < copiaListaDeProductosLength; i++) {
        let objetoMarca = {nombre: copiaListaDeProductos[i].marca, cantidad: 1};
        // Agrego a lista de marcas
        listaMarcas.push(objetoMarca);
    }

}

function ordenarListaMarcasPorNombre() {
    listaMarcas.sort((a, b) => {
        if (a.nombre > b.nombre) {
            return 1;
        }
        if (a.nombre < b.nombre) {
            return -1;
        }
        // a es igual a b
        return 0;
    })
}

function compararSiHayDuplicadosEnMarcas() {
    // Comparo para ver si hay duplicados, si es asi se elimina de la lista
    for (let i = 0; i < listaMarcas.length - 1; i++) {
        // Si el actual es igual al siguiente
        if (listaMarcas[i].nombre === listaMarcas[i+1].nombre) {

            // Sumar un producto a la cantidad
            listaMarcas[i].cantidad += listaMarcas[i+1].cantidad;

            // Borrar duplicado
            listaMarcas.splice(i+1,1);

            // Volver uno atras porque el siguiente ya no existe
            i--;
        }
        
    }
}

// Ordenaro por marca con mayor cantidad de productos
function ordenarMarcasPorMayorCantidad() {
    listaMarcas.sort((a, b) => {
        if (a.cantidad < b.cantidad) {
            return 1;
        }
        if (a.cantidad > b.cantidad) {
            return -1;
        }
        // a es igual a b
        return 0;
    })
}

function mostrarMarcasDisponibles() {
    
    agregarMarcasALista();

    ordenarListaMarcasPorNombre();

    compararSiHayDuplicadosEnMarcas();

    ordenarMarcasPorMayorCantidad();

    // Limpiar html
    marcas.innerHTML = '';

    // Crear titulo
    let contenedor = document.createElement('h5');
    contenedor.className = 'mb-2 georgia';
    contenedor.innerText = 'Marcas:';
    marcas.appendChild(contenedor);

    // Crear un mostrar todos
    contenedor = document.createElement('p');
    contenedor.className = 'pt-1 pb-0 my-0';

    // Cuento el total de las marcas y lo muestro como opcion
    const totalMarcas = listaMarcas.reduce((acc, el) => acc + el.cantidad, 0);
    contenedor.innerHTML = `<span class="marca">Todas</span><span class="text-secondary" id="totalCategorias"> (${totalMarcas})</span>`;
    // Asignar onclick -> mostrar todas las marcas
    contenedor.onclick = () => {
        
        borrarFiltro(null,'marca');

        correr();

    }
    marcas.appendChild(contenedor);
    
    // Muestro las marcas en html
    for (const iterator of listaMarcas) {

        let contenedor = document.createElement('p');
        contenedor.className = 'pt-1 pb-0 my-0';
        contenedor.innerHTML = `<span class="marca">${iterator.nombre}</span><span class="text-secondary"> (${iterator.cantidad})</span>`;
        
        // Asignar onclick -> filtrar por marca
        contenedor.onclick = () => {

            agregarFiltroActivo(iterator.nombre, 'marca');

            correr();
        
        }

        marcas.appendChild(contenedor);

    }

}

function agregarCategoriasALista() {

    // Limpiar lista marcas
    listaCategorias.splice(0,listaCategorias.length);

    let copiaListaDeProductosLength = copiaListaDeProductos.length;
    
    // Agregar todas las Categorias encontradas en lista de productos
    for (let i = 0; i < copiaListaDeProductosLength; i++) {
        let objetoCategoria = {nombre: copiaListaDeProductos[i].categoria, cantidad: 1}
        // Agrego a lista de Categoria
        listaCategorias.push(objetoCategoria);
    }
}

function ordenarListaCategoriasPorNombre() {
    listaCategorias.sort((a, b) => {
        if (a.nombre > b.nombre) {
            return 1;
        }
        if (a.nombre < b.nombre) {
            return -1;
        }
        // a es igual a b
        return 0;
    })
}

function compararSiHayDuplicadosEnCategorias() {
    // Comparo para ver si hay duplicados, si es asi se elimina de la lista
    for (let i = 0; i < listaCategorias.length - 1; i++) {
        // Si el actual es igual al siguiente
        if (listaCategorias[i].nombre === listaCategorias[i+1].nombre) {

            // Sumar un producto a la cantidad
            listaCategorias[i].cantidad += listaCategorias[i+1].cantidad;

            // Borrar duplicado
            listaCategorias.splice(i+1,1);

            // Volver uno atras porque el siguiente ya no existe
            i--;
        }
    }
}

// Ordenar por marca con mayor cantidad de productos
function ordenarCategoriasPorMayorCantidad() {
    listaCategorias.sort((a, b) => {
        if (a.cantidad < b.cantidad) {
            return 1;
        }
        if (a.cantidad > b.cantidad) {
            return -1;
        }
        // a es igual a b
        return 0;
    })
}

function mostrarCategoriasDisponibles() {

    agregarCategoriasALista();

    ordenarListaCategoriasPorNombre();

    compararSiHayDuplicadosEnCategorias();

    ordenarCategoriasPorMayorCantidad();

    // Limpiar html
    categorias.innerHTML = '';

    // Crear titulo
    let contenedor = document.createElement('h5');
    contenedor.className = 'mb-2 georgia';
    contenedor.innerText = 'Categorias:';
    categorias.appendChild(contenedor);

    // Crear un mostrar todos
    contenedor = document.createElement('p');
    contenedor.className = 'pt-1 pb-0 my-0';

    // Cuento el total de las categoria y lo muestro como opcion
    const totalCategorias = listaCategorias.reduce((acc, el) => acc + el.cantidad, 0);
    contenedor.innerHTML = `<span>Todas</span><span class="text-secondary" id="totalCategorias"> (${totalCategorias})</span>`;
    // Asignar onclick -> mostrar todas las categoria
    contenedor.onclick = () => {
        
        borrarFiltro(null,'categoria');

        correr();

    }
    categorias.appendChild(contenedor);
    
    // Muestro las categoria en html
    for (const iterator of listaCategorias) {

        contenedor = document.createElement('p');
        contenedor.className = 'pt-1 pb-0 my-0';
        contenedor.innerHTML = `<span class="categoria">${iterator.nombre}</span><span class="text-secondary"> (${iterator.cantidad})</span>`;

        // Asignar onclick -> filtrar por categoria
        contenedor.onclick = () => {

            agregarFiltroActivo(iterator.nombre, 'categoria');

            correr();
        
        }

        categorias.appendChild(contenedor);

    }

}

// Filtrar por envio
for (let i = 0; i < elegirEnvio.length; i++) {
    elegirEnvio[i].onclick = () => {

        // Borrar filtro anterior
        borrarFiltro(null,'envio');

        // Si es diferente a 'Todos', tomar el texto (que va a ser envio gratis o envio pago)
        elegirEnvio[i].outerText !== 'Todos' && agregarFiltroActivo(elegirEnvio[i].outerText, 'envio') ;
        
        // Correr funciones
        correr();

    }
}

// Mostrar productos en el DOM
function mostrarProductos() {

    // Limpiar
    productos.innerHTML = '';
    
    let copiaListaDeProductosLength = copiaListaDeProductos.length;

    if (copiaListaDeProductosLength) {
    
        for (let i = 0; i < copiaListaDeProductosLength; i++) {

            let contenedor = document.createElement('article');
            contenedor.className = 'col-12 col-md-4 p-3';
            contenedor.id = copiaListaDeProductos[i].id;
    
            // Si tiene envio gratis, sumar a contenedor
            let envioGratis
            if (copiaListaDeProductos[i].envioGratis === true) {
                envioGratis = '<p id="envioGratis" class="m-2 text-success"><b>Envio Gratis!</b></p>';
            }else{
                envioGratis = '';
            }
    
            // 
            contenedor.innerHTML = `
            <div class="bg-white rounded border mh-430 zoom producto arial">
                <a href="${copiaListaDeProductos[i].destino}?productId=${copiaListaDeProductos[i].id}" class="text-decoration-none text-dark">
                    <div class="row align-items-center h-250 text-center w-100 m-0 justify-content-center">
                        <img src="${copiaListaDeProductos[i].imagen}-1.png" class="w-auto mh-100">
                    </div>
                    <hr class="w-100 shr">
                    <div class="p-3 text-center" id="datos">
                        <h5 id="precio">${formatearNumero(copiaListaDeProductos[i].precio)}</h5>
                        <p id="nombre" class="m-1">${copiaListaDeProductos[i].nombre}</p>
                        ${envioGratis}
                    </div>
                </a>
            </div>
            `;
    
            // Agregar contenedor a productos
            productos.appendChild(contenedor);
    
        }
    
    }else{

        // Mostrar no se encontraron productos
        let contenedor = document.createElement('div');
        contenedor.className = 'col-12 p-3 text-center mt-5';
        contenedor.innerHTML = '<h5>No se encontraron productos con los filtros seleccionados</h5>'
        productos.appendChild(contenedor);

    }

}

// Mostrar opciones para ordenar
abrirOpcionesOrden.onclick = () => {changeDisplay(opcionesOrden); };

// Si se da click por fuera del elemento ordenar, cerrar
ordenar.onblur = () => {opcionesOrden.classList.remove('d-block'), opcionesOrden.classList.add('d-none')};

function agregarFiltroActivo(valor, tipo) {
    
    // Si no se encuentra un filtro con un tipo igual, agregar
    !listaFiltrosActivos.find((el) => el.tipo === tipo) && listaFiltrosActivos.push({valor: valor, tipo: tipo});

    // Si el tipo de filtro es diferente a busqueda, mostrar notificacion
    (tipo !== 'Busqueda' && tipo != 'Precio Max' && tipo != 'Precio Min') && (
        Toastify({
            text: "Filtro agregado",
            style: {
                background: "#fff",
                color: "#000",
            },
            duration: 2000  
        }).showToast()
    )
    
}

function aplicarFiltros() {

    // Por cada filtro activo, filtrar
    for (const iterator of listaFiltrosActivos) {

        iterator.tipo === 'Busqueda' && buscar(iterator.valor);

        iterator.tipo === 'Precio Min' && filtrarPorPrecioMinimo(iterator.valor);

        iterator.tipo === 'Precio Max' && filtrarPorPrecioMaximo(iterator.valor);

        iterator.tipo === 'categoria' && filtrarPorCategoria(iterator.valor);

        iterator.tipo === 'marca' && filtrarPorMarca(iterator.valor);

        // filtra por tipo de envio, necesito enviar un true para envio gratis o false para pago
        iterator.tipo === 'envio' && filtrarPorTipoDeEnvio(iterator.valor === 'Envio Gratis');

    }

}

// Borrar filtro
function borrarFiltro(valor, tipo) {

    // Si se recibe algun valor
    if (valor !== null) {

        // Eliminar valor del filtro
        listaFiltrosActivos.splice(listaFiltrosActivos.findIndex(element => element.valor === valor), 1);

    // Si no hay valor
    }else{

        // Buscar tipo de filtro en la lista
        let indexTipo = listaFiltrosActivos.findIndex(element => element.tipo === tipo);

        // Si existe, eliminalo
        indexTipo !== -1 && listaFiltrosActivos.splice(indexTipo, 1);

    }

    // Si el tipo de filtro es diferente a busqueda o precio, mostrar notificacion
    (tipo !== 'Busqueda' && tipo != 'Precio Max' && tipo != 'Precio Min') && (
        Toastify({
            text: `Filtro eliminado`,
            style: {
                background: "#fff",
                color: "#000",
            },  
            duration: 2000
        }).showToast()
    )

}

// Mostrar filtros activos
function mostrarFiltrosActivos() {

    // Limpiar
    filtrosActivos.innerHTML = '';
    
    // Si hay al menos un filtro mostrar
    if ( listaFiltrosActivos.length != 0) {
     
        // Titulo
        let contenedor = document.createElement('h5');
        contenedor.innerText = 'Filtros activos:';
        filtrosActivos.appendChild(contenedor);
        
        // Div contenedor de filtros
        contenedor = document.createElement('div');
        contenedor.className = 'row';
        contenedor.id = 'listaFiltrosActivos';
        filtrosActivos.appendChild(contenedor);
        
        // Por cada filtro mostrar
        for (const iterator of listaFiltrosActivos) {
        
            let contenedor2 = document.createElement('div');
            contenedor2.classList = 'col-auto bg-primary rounded px-4 py-1 m-2 position-relative';

            // Si es precio minimo o maximo mostrar tipo
            if ( iterator.tipo == 'Precio Min' || iterator.tipo == 'Precio Max' ) {
                contenedor2.innerHTML = `<a class="text-decoration-none text-white">${iterator.tipo} - ${formatearNumero(iterator.valor)}<span class="cross">x</span></a>`;
            }else{
                contenedor2.innerHTML = `<a class="text-decoration-none text-white">${iterator.valor}<span class="cross">x</span></a>`;
            }
            
            // Al hacer click en filtro
            contenedor2.onclick = () => {
            
                // Borrar filtro
                borrarFiltro(null, iterator.tipo);
                // Correr funciones
                correr();
            
            }
        
            contenedor.appendChild(contenedor2);
        
        }

    }

}

function correr() {

    // Restaurar lista de productos
    copiarListaDeProductos();

    // Aplicar filtros
    aplicarFiltros();

    // Aplicar orden
    aplicarOrden();

    // Mostrar categorias disponibles
    mostrarCategoriasDisponibles();

    // Mostrar marcas disponibles
    mostrarMarcasDisponibles();

    // Mostrar filtros activos
    mostrarFiltrosActivos();

    // Mostrar items en carr;ito
    itemsEnCarrito();

    // Mostrar resultados
    mostrarProductos();

}

// ---------------------------------------- Llamar funciones

correr();