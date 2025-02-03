import "./loginUsers.js";
import "./registroUsers.js";
export class usersAccess extends HTMLElement {
    constructor() {
        super();
        this.render();
    }
    render() {
        this.innerHTML = `
        <style>
            body {
                background-color: #111111;
                margin: 0;
                font-family: 'Arial', sans-serif;
            }
            
            .navbar {
                background-color: #1c1c1c;
                padding: 15px 0;
                box-shadow: 0 2px 15px rgba(255, 0, 0, 0.2);
                border-bottom: 3px solidrgb(95, 5, 5);
            }

            .container-fluid {
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 20px;
            }

            .navbar-nav {
                display: flex;
                justify-content: center;
                gap: 20px;
                list-style: none;
                margin: 0;
                padding: 0;
            }

            .nav-link {
                color: #ffffff;
                text-decoration: none;
                padding: 10px 20px;
                border-radius: 5px;
                transition: all 0.3s ease;
                text-transform: uppercase;
                font-weight: bold;
                position: relative;
                overflow: hidden;
            }

            .nav-link:before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(180, 29, 29, 0.2), transparent);
                transition: 0.5s;
            }

            .nav-link:hover:before {
                left: 100%;
            }

            .nav-link.active {
                background-color:rgb(100, 22, 22);
                box-shadow: 0 0 20px rgba(156, 9, 9, 0.5);
            }

            .container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 20px;
            }
        </style>
        <nav class="navbar">
            <div class="container-fluid">
                <div class="navbar-collapse">
                    <ul class="navbar-nav">
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
        this.addEventListeners();
    }

    addEventListeners() {
        this.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.querySelectorAll('.nav-link').forEach(navLink => {
                    navLink.classList.remove('active');
                });
                e.target.classList.add('active');
                const section = e.target.dataset.section;
                ['registro', 'ingreso'].forEach(containerName => {
                    const container = this.querySelector(`#${containerName}`);
                    container.style.display = containerName === section ? 'block' : 'none';
                });
            });
        });
    
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