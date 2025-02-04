import "./equiposAdmin.js";
import "./pilotosAdmin.js";
import "./circuitosAdmin.js";
import "./vehiculosAdmin.js";

export class adminIndex extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    render(){
        this.innerHTML = /*html*/ `
        <style>
            :host {
                display: block;
                background-color: #1E1E1E;
                color: white;
                font-family: 'Arial', sans-serif;
                min-height: 100vh;
                margin: 0;
                padding: 0;
            }

            .navbar {
                background: linear-gradient(180deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.8) 100%);
                padding: 15px 0;
                position: fixed;
                width: 100%;
                top: 0;
                left: 0;
                right: 0;
                z-index: 100;
            }

            .container-fluid {
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .navbar-brand {
                display: flex;
                align-items: center;
                cursor: pointer;
            }

            .navbar-brand img {
                height: 40px;
                width: auto;
                transition: transform 0.2s ease;
            }

            .navbar-brand img:hover {
                transform: scale(1.05);
            }

            .navbar-collapse {
                display: flex;
                align-items: center;
            }

            .navbar-nav {
                display: flex;
                gap: 30px;
                list-style: none;
                margin: 0;
                padding: 0;
            }

            .nav-link {
                color: white;
                text-decoration: none;
                font-size: 18px;
                font-weight: 500;
                padding: 8px 16px;
                transition: all 0.3s ease;
                position: relative;
                display: inline-block;
            }

            .nav-link:hover,
            .nav-link.active {
                color: #FF1E1E;
            }

            .nav-link::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 2px;
                background-color: #FF1E1E;
                transition: width 0.3s ease;
            }

            .nav-link:hover::after,
            .nav-link.active::after {
                width: 80%;
            }

            .navbar-toggler {
                display: none;
                background: none;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
            }

            .container {
                max-width: 1200px;
                margin: 100px auto 20px;
                padding: 0 20px;
                transition: opacity 0.3s ease;
            }

            .container[style*="display:none"] {
                opacity: 0;
                pointer-events: none;
            }

            /* Responsive Breakpoints */
            @media (max-width: 992px) {
                .navbar {
                    padding: 10px 0;
                }

                .container-fluid {
                    padding: 0 15px;
                }

                .navbar-nav {
                    gap: 20px;
                }

                .nav-link {
                    font-size: 16px;
                }
            }

            @media (max-width: 768px) {
                .navbar-toggler {
                    display: block;
                }

                .navbar-collapse {
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background-color: rgba(0,0,0,0.95);
                    padding: 20px;
                    text-align: center;
                }

                .navbar-nav {
                    flex-direction: column;
                    gap: 15px;
                }

                .navbar-collapse.show {
                    display: block;
                }

                .container {
                    margin-top: 80px;
                    padding: 0 15px;
                }

                .nav-link {
                    font-size: 14px;
                }
            }

            @media (max-width: 576px) {
                .navbar-brand img {
                    height: 35px;
                }

                .container-fluid {
                    padding: 0 10px;
                }
            }
        </style>
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <div class="navbar-brand" id="logo-btn">
                    <img class="img-fluid" src="src/img/f1.png" alt="F1 Logo">
                </div>
                <button class="navbar-toggler" type="button">
                    <span>&#9776;</span>
                </button>
                <div class="navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
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
                    </ul>
                </div>
            </div>
        </nav>
        <div class="container" id="equipos" style="display:block;">
            <equipos-admin></equipos-admin>
        </div>
        <div class="container" id="pilotos" style="display:none;">
            <pilotos-admin></pilotos-admin>
        </div>
        <div class="container" id="circuitos" style="display:none;">
            <circuitos-admin></circuitos-admin>
        </div>
        <div class="container" id="vehiculos" style="display:none;">
            <vehiculos-admin></vehiculos-admin>
        </div>
        `;

        // Navigation logic
        this.setupNavigation();
    }

    setupNavigation() {
        // Logo navigation (back button)
        const logoBtn = this.querySelector('#logo-btn');
        logoBtn?.addEventListener('click', () => {
            // Dispatch a custom event to navigate back
            this.dispatchEvent(new CustomEvent('navigate-back', {
                bubbles: true,
                composed: true
            }));
        });

        // Navigation menu logic
        this.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                // Remove 'active' class from all links
                this.querySelectorAll('.nav-link').forEach(navLink => {
                    navLink.classList.remove('active');
                });

                // Add 'active' class to clicked link
                e.target.classList.add('active');

                // Get section to show
                const section = e.target.dataset.section;

                // Hide/show containers
                ['equipos', 'pilotos', 'circuitos', 'vehiculos'].forEach(containerName => {
                    const container = this.querySelector(`#${containerName}`);
                    container.style.display = containerName === section ? 'block' : 'none';
                });

                // Close mobile menu if open
                const collapse = this.querySelector('.navbar-collapse');
                collapse.classList.remove('show');
            });
        });

        // Mobile menu toggle
        const toggler = this.querySelector('.navbar-toggler');
        const collapse = this.querySelector('.navbar-collapse');
        
        toggler?.addEventListener('click', () => {
            collapse.classList.toggle('show');
        });
    }
}

customElements.define("admin-index", adminIndex);