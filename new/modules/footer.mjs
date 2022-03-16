// ---------------------------------------- Importar

import {urlAyuda, urlContacto, urlPrivacidad} from "../modules/urls.mjs";

// ---------------------------------------- DOM

const footer = document.getElementsByTagName('footer')[0];

// ---------------------------------------- Variables

const year = new Date().getFullYear();

// ---------------------------------------- Funciones

export function showFooter() {
    
    footer.classList = 'container-fluid page-footer py-2 bg-light';
    footer.innerHTML = `
        <div class="footer-copyright">
          <nav class="row justify-content-center text-center text-dark">
              <div class="col-12 col-md-3"><a href="${urlAyuda}" class="text-decoration-none text-dark">Ayuda</a></div>
              <div class="col-12 col-md-3"><a href="${urlContacto}" class="text-decoration-none text-dark" target="_blank">Contacto</a></div>
              <div class="col-12 col-md-3"><a href="${urlPrivacidad}" class="text-decoration-none text-dark">Privacidad</a></div>
              <div class="col-12 col-md-3">©${year} Copyright</div>
          </nav>
        </div>
    `;

}