// ======================================== LOGIN ========================================

// ---------------------------------------- Variables

const usuarios = JSON.parse(localStorage.getItem('usuariosDB')) || [];

let email       = '';
let password    = '';
let recordarme  = false;
let usuario     = {};

// ---------------------------------------- DOM

const main              = document.getElementById('main');
const form              = document.getElementsByTagName('form');
const inputEmail        = document.getElementById('email');
const inputPassword     = document.getElementById('password');
const checkboxRemember  = document.getElementById('rememberMe');

// ---------------------------------------- Funciones

// Si ya hay un usuario logeado
usuarioLog && mensajeDeExito();

// Verificar que los campos se encuentren llenos
function erroresFalsy() {

    email       || errorEmail();
    password    || errorPassword();

}

// Si hay error poner borde rojo, vaciar campo
const errorEmail        = () => { inputEmail.classList.add('border-danger');}
const errorPassword     = () => { inputPassword.classList.add('border-danger'); inputPassword.value = ''; form[1].children[1].children[2].classList.remove('d-none')}

// Si se cambia el valor del input remover borde rojo, remover advertencia
inputEmail.onchange     = () => { inputEmail.classList.remove('border-danger'); form[1].children[0].children[2].classList.add('d-none')}
inputPassword.onchange  = () => { inputPassword.classList.remove('border-danger'); form[1].children[1].children[2].classList.add('d-none')}


function guardarUsuario() {
    // Transformar objeto en JSON
    let usuarioP = JSON.stringify(usuario);
    // Segun preferencia, almacenar en local o session
    recordarme ? localStorage.setItem('usuario', usuarioP) : sessionStorage.setItem('usuario', usuarioP);
    // Mostrar mensaje de exito
    mensajeDeExito();
}

function mensajeDeExito() {

    // Limpiar
    main.innerHTML = '';

    // Crear mensaje
    let contenedor = document.createElement('div')
    contenedor.classList = 'text-center';
    contenedor.innerHTML = `
    <h5 class="my-4">Bienvenido!</h5>  
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="green" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
    </svg>
    <div class="row mt-5">
        <div class="col-12 col-md-6 py-2 py-md-0">
            <a href="">
                <button class="btn btn-secondary w-75" id="cerrarSesion">Cerrar sesión</button>
            </a>
        </div>
        <div class="col-12 col-md-6 py-2 py-md-0">
            <a href="../">
                <button class="btn btn-primary w-75">Inicio</button>
            </a>
        </div>
    </div>
    `;

    // Agregar a main
    main.appendChild(contenedor);

    // Cerrar sesion
    const cerrarSesion = document.getElementById('cerrarSesion');
    cerrarSesion.onclick = () => { localStorage.removeItem('usuario') || sessionStorage.removeItem('usuario') };

    // Mostrar usuario u opcion de ingresar/registrarse
    mostrarUsuario();

}

function restaurarVariables() {
    email       = '';
    password    = '';
}

// Forma de registro
if (!usuarioLog) {
    form[1].onsubmit = (e) => {

        // Prevenir recargar pagina
        e.preventDefault();
    
        // Asignar valores
        email       = inputEmail.value;
        password    = inputPassword.value;
        recordarme  = checkboxRemember.checked;
    
        // Buscar errores falsy
        erroresFalsy();
    
        // Filtrar usuarios por email
        let auxiliar = usuarios.filter( (el) => el.email === email) 
        usuario = {...auxiliar[0]};
    
        // Ver que email este registrado
        if (usuario !== undefined) {
    
            // Si las contraseñas son iguales
            usuario.password === password ? guardarUsuario() : errorPassword();
    
        }else{
            errorEmail();
            form[1].children[0].children[2].classList.remove('d-none');
        }
    
        restaurarVariables();
    
        mostrarUsuario();
    
    }
}

// ----------------------------------------

// Crear usuario demo
usuarios.push(new Usuario('Demo', 'demo@demo.com', 'demo'));