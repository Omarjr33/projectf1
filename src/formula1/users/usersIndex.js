import './buscarCircuitos.js'
import './buscarEquipos.js'
import './buscarPilotos.js'
import './buscarVehiculos.js'
import './juegoElement.js'
import './perfilUsers.js'

export class usersIndex extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    render() {
        const styles = `
            <style>
                :host {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 9999;
                    background-color: #121212;
                    color: #ffffff;
                    font-family: 'Titillium Web', sans-serif;
                }
                
                .fullscreen-container {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow-y: auto;
                }

                .navbar {
                    background-color: rgba(30, 30, 30, 0.95) !important;
                    backdrop-filter: blur(10px);
                    box-shadow: 0 2px 15px rgba(237, 28, 36, 0.2);
                    padding: 0;
                    border-bottom: 2px solid #ED1C24;
                    height: 80px;
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                }

                .container-fluid {
                    max-width: 1400px;
                    margin: 0 auto;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    padding: 0 2rem;
                    gap: 2rem;
                }

                .navbar-brand {
                    height: 80%;
                    display: flex;
                    align-items: center;
                    padding: 0;
                }

                .navbar-brand img {
                    height: 100%;
                    width: auto;
                    object-fit: contain;
                    filter: drop-shadow(0 0 5px rgba(237, 28, 36, 0.5));
                    transition: transform 0.3s ease;
                }

                .nav-menu {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin: 0;
                    padding: 0;
                    list-style: none;
                    height: 100%;
                }

                .nav-item {
                    height: 100%;
                    display: flex;
                    align-items: center;
                }

                .nav-link {
                    color: #ffffff;
                    text-decoration: none;
                    padding: 0.5rem 1rem;
                    border-radius: 4px;
                    transition: all 0.3s ease;
                    font-weight: 500;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    position: relative;
                    background: transparent;
                    border: none;
                }

                .nav-link:hover {
                    color: #ED1C24;
                    background: rgba(237, 28, 36, 0.1);
                }

                .nav-link.active {
                    color: #ffffff;
                    background: #ED1C24;
                    box-shadow: 0 0 15px rgba(237, 28, 36, 0.3);
                }

                .menu-toggle {
                    display: none;
                    flex-direction: column;
                    gap: 6px;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    padding: 0.5rem;
                }

                .menu-toggle span {
                    display: block;
                    width: 25px;
                    height: 2px;
                    background-color: #ED1C24;
                    transition: all 0.3s ease;
                }

                .content-container {
                    max-width: 1400px;
                    margin: 2rem auto;
                    padding: 2rem;
                    background-color: rgba(30, 30, 30, 0.95);
                    backdrop-filter: blur(10px);
                    border-radius: 12px;
                    box-shadow: 0 0 20px rgba(0,0,0,0.3);
                    border: 1px solid rgba(237, 28, 36, 0.2);
                }

                .racing-lines {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    opacity: 0.05;
                    background: 
                        linear-gradient(45deg, transparent 48%, #ED1C24 49%, #ED1C24 51%, transparent 52%),
                        linear-gradient(-45deg, transparent 48%, #ED1C24 49%, #ED1C24 51%, transparent 52%);
                    background-size: 60px 60px;
                    z-index: -1;
                }

                @media (max-width: 991px) {
                    .navbar {
                        height: 70px;
                    }

                    .container-fluid {
                        padding: 0 1.5rem;
                    }

                    .menu-toggle {
                        display: flex;
                        margin-left: auto;
                    }

                    .nav-menu {
                        position: fixed;
                        top: 70px;
                        left: 0;
                        right: 0;
                        background: rgba(30, 30, 30, 0.95);
                        backdrop-filter: blur(10px);
                        flex-direction: column;
                        padding: 1rem;
                        gap: 0.5rem;
                        height: auto;
                        transform: translateY(-100%);
                        opacity: 0;
                        transition: all 0.3s ease;
                        visibility: hidden;
                    }

                    .nav-menu.active {
                        transform: translateY(0);
                        opacity: 1;
                        visibility: visible;
                        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
                    }

                    .nav-item {
                        width: 100%;
                        height: auto;
                    }

                    .nav-link {
                        width: 100%;
                        padding: 1rem;
                        text-align: center;
                        border-radius: 6px;
                    }

                    .menu-toggle.active span:first-child {
                        transform: rotate(45deg) translate(8px, 6px);
                    }

                    .menu-toggle.active span:nth-child(2) {
                        opacity: 0;
                    }

                    .menu-toggle.active span:last-child {
                        transform: rotate(-45deg) translate(7px, -5px);
                    }
                }

                @media (max-width: 576px) {
                    .navbar {
                        height: 60px;
                    }

                    .container-fluid {
                        padding: 0 1rem;
                    }

                    .navbar-brand {
                        height: 70%;
                    }

                    .content-container {
                        margin: 1rem;
                        padding: 1rem;
                    }

                    .nav-menu {
                        top: 60px;
                    }
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                #equipos, #pilotos, #circuitos, #vehiculos {
                    animation: fadeIn 0.5s ease-out;
                }
            </style>
        `;

        this.innerHTML = `
            ${styles}
            <div class="racing-lines"></div>
            <div class="fullscreen-container">
                <nav class="navbar">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#">
                            <img src="src/img/f1.png" alt="F1 Logo">
                        </a>
                        <button class="menu-toggle">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                        <ul class="nav-menu">
                            <li class="nav-item">
                                <a class="nav-link active" href="#" data-section="equipos">Equipos</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#" data-section="pilotos">Pilotos</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#" data-section="circuitos">Circuitos</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#" data-section="vehiculos">Vehículos</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#" data-section="juego">Juego</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#" data-section="perfil">👤</a>
                            </li>
                        </ul>   
                    </div>                     
                </nav>

                <div class="content-container">
                    <div id="equipos" style="display:block;">
                        <buscar-equipos></buscar-equipos>
                    </div>
                    <div id="pilotos" style="display:none;">
                        <buscar-pilotos></buscar-pilotos>
                    </div>
                    <div id="circuitos" style="display:none;">
                        <buscar-circuitos></buscar-circuitos>
                    </div>
                    <div id="vehiculos" style="display:none;">
                        <buscar-vehiculos></buscar-vehiculos>
                    </div>
                    <div id="juego" style="display:none;">
                        <juego-element></juego-element>
                    </div>
                     <div id="perfil" style="display:none;">
                        <perfil-users></perfil-users>
                    </div>
                </div>
            </div>
        `;

        // Event listeners
        const menuToggle = this.querySelector('.menu-toggle');
        const navMenu = this.querySelector('.nav-menu');

        menuToggle?.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        this.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                // Remover clase active de todos los enlaces
                this.querySelectorAll('.nav-link').forEach(navLink => {
                    navLink.classList.remove('active');
                });

                // Añadir clase active al enlace clickeado
                e.target.classList.add('active');

                // Obtener la sección a mostrar
                const section = e.target.dataset.section;

                // Cambiar secciones con animación
                ['equipos', 'pilotos', 'circuitos', 'vehiculos', 'juego','perfil'].forEach(containerName => {
                    const container = this.querySelector(`#${containerName}`);
                    if (containerName === section) {
                        container.style.display = 'block';
                        setTimeout(() => {
                            container.style.opacity = '1';
                        }, 50);
                    } else {
                        container.style.opacity = '0';
                        setTimeout(() => {
                            container.style.display = 'none';
                        }, 300);
                    }
                });

                // Cerrar menú móvil si está abierto
                if (window.innerWidth <= 991) {
                    menuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });

        // Cerrar menú al hacer click fuera
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 991 && 
                !menuToggle.contains(e.target) && 
                !navMenu.contains(e.target) && 
                navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

customElements.define('users-index', usersIndex);