// ---------------------------------------- Importar

import {urlAyuda, urlContacto, urlPrivacidad} from "../modules/urls.mjs";
import {fecha} from "../modules/constantes.mjs";
import {footer} from "../modules/dom.mjs";

// ---------------------------------------- Funciones

export function showFooter() {
    
    footer.classList = 'container-fluid page-footer py-2 bg-light';
    footer.innerHTML = `
        <div class="footer-copyright">
          <nav class="row justify-content-center text-center text-dark">
              <div class="col-12 col-md-3"><a href="${urlAyuda}" class="text-decoration-none text-dark">Ayuda</a></div>
              <div class="col-12 col-md-3"><a href="${urlContacto}" class="text-decoration-none text-dark" target="_blank">Contacto</a></div>
              <div class="col-12 col-md-3"><a href="${urlPrivacidad}" class="text-decoration-none text-dark">Privacidad</a></div>
              <div class="col-12 col-md-3">©${fecha.getFullYear()} Copyright</div>
          </nav>
        </div>
    `;

}