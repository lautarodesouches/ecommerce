// ---------------------------------------- Importar

import {urlInicio, urlIniciarSesion, urlRegistrarse, urlCategorias, urlOfertas, urlFavoritos, urlCarrito, urlCarpetaImg, urlBuscador} from "../modules/urls.mjs";

// ---------------------------------------- DOM

const menu = document.getElementsByTagName('header')[0];

// ---------------------------------------- Variables

let chevronUp = false;

// ---------------------------------------- Funciones

export function showMenu() {

    menu.classList = 'bg-primary py-2 text-white container-fluid text-center';
    menu.innerHTML = `
        <section id="menu-top">
            <nav class="row align-items-center justify-content-center">
                <div class="col-2 col-md-1">
                    <a href="${urlInicio}" class="text-decoration-none text-white">
                        <img src="${urlCarpetaImg}logo.png" alt="Logo" class="logo">
                    </a>
                </div>
                <div class="col-7 col-md-5">
                    <form action="${urlBuscador}" method="get" id="buscadorPrincipal">
                        <input class="form-control shadow" type="text" placeholder="Buscar" name="search" aria-label="Search">
                    </form>
                </div>
                <div class="col-3 col-md-5">
                    <div class="row">
                        <div class="col-4 d-none d-md-block">
                            <a href="${urlIniciarSesion}" class="nav-link text-white">
                                Ingresar
                            </a>
                        </div>
                        <div class="col-4 d-none d-md-block">
                            <a href="${urlRegistrarse}" class="nav-link text-white">
                                Registrarme
                            </a>
                        </div>
                        <div class="col-12 col-md-4">
                            <a href="${urlCarrito}" class="text-decoration-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" class="bi bi-cart3 mt-md-2" viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                </svg>
                                <span id="cantidadItemsEnCarrito"></span>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </section>
        <section class="mt-3" id="menu-bottom">
            <div class="d-md-none" id="mostrarMenu">
            </div>
            <nav class="row d-none d-md-flex mt-2 rounded align-items-center justify-content-center" id="contenidoMenu">
                <div class="col-12 col-md-2">
                    <a href="${urlInicio}" class="text-decoration-none text-white">
                        Inicio
                    </a>
                </div>
                <div class="col-12 col-md-2">
                    <a href="${urlCategorias}" class="text-decoration-none text-white">
                        Categorias
                    </a>
                </div>
                <div class="col-12 col-md-2">
                    <a href="${urlOfertas}" class="text-decoration-none text-white">
                        Ofertas
                    </a>
                </div>
                <div class="col-12 col-md-2">
                    <a href="${urlFavoritos}" class="text-decoration-none text-white">
                        Favoritos
                    </a>
                </div>
                <div class="col-12 col-md-2 d-md-none mt-2">
                    <a href="${urlIniciarSesion}" class="text-decoration-none text-white">
                        Ingresar
                    </a>
                </div>
                <div class="col-12 col-md-2 d-md-none">
                    <a href="${urlRegistrarse}" class="text-decoration-none text-white">
                        Registrarme
                    </a>
                </div>
            </nav>
        </section>
    `;

    // ---------------------------------------- DOM

    const botonMostrarMenu  = document.getElementById('mostrarMenu');
    const contenidoMenu     = document.getElementById('contenidoMenu');
    const buscadorPrincipal = document.getElementById('buscadorPrincipal');
    
    // ---------------------------------------- Funciones

    function showSVGMenu(boolean) {

        // Almacenar valor en variable
        chevronUp = boolean;
    
        if (boolean) {
            botonMostrarMenu.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-chevron-double-down" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                <path fill-rule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
            </svg>
            `;
        } else {
            botonMostrarMenu.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-chevron-double-up" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708l6-6z"/>
              <path fill-rule="evenodd" d="M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
            </svg>
            `;
        }
    
    }

    function mostrarMenu() {
        showSVGMenu(!chevronUp);
        contenidoMenu.classList.toggle('d-none');
    }

    // ---------------------------------------- Eventos

    botonMostrarMenu.onclick = () => {mostrarMenu()};
    buscadorPrincipal.onsubmit = (e) => {
        // Prevenir recarga
        e.preventDefault(),
        // Almacenar consulta
        sessionStorage.setItem('busqueda',buscadorPrincipal[0].value), 
        // Redirigir
        window.location.href = urlBuscador;
    }

    // ---------------------------------------- LLamar funciones

    showSVGMenu(!chevronUp);

}