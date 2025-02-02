import "./loginUsers.js";
import "./registroUsers.js";

export class usersAccess extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    render(){
        this.innerHTML = `
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <div class="navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" href="#" data-section="registro">Registro</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" data-section="ingreso">Ingreso</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="container" id="registro" style="display:block;">
            <registro-user></registro-user>
        </div>
        <div class="container" id="ingreso" style="display:none;">
            <login-user></login-user>
        </div>
        `;

        // Agregar event listeners a los enlaces de navegación
        this.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                // Remover clase 'active' de todos los enlaces
                this.querySelectorAll('.nav-link').forEach(navLink => {
                    navLink.classList.remove('active');
                });

                // Añadir clase 'active' al enlace clickeado
                e.target.classList.add('active');

                // Obtener la sección a mostrar
                const section = e.target.dataset.section;

                // Ocultar todos los contenedores
                ['registro', 'ingreso'].forEach(containerName => {
                    const container = this.querySelector(`#${containerName}`);
                    container.style.display = containerName === section ? 'block' : 'none';
                });

                // Cerrar el menú móvil si está abierto
                const collapse = this.querySelector('.navbar-collapse');
                collapse.classList.remove('show');
            });
        });

        // Agregar toggle para menú móvil
        const toggler = this.querySelector('.navbar-toggler');
        const collapse = this.querySelector('.navbar-collapse');
        
        toggler?.addEventListener('click', () => {
            collapse.classList.toggle('show');
        });
    }
}
customElements.define("users-access", usersAccess);