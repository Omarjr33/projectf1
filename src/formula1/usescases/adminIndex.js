import "./equiposAdmin.js";
import "./pilotosAdmin.js";
import "./circuitosAdmin.js";
import "./vehiculosAdmin.js";

export class adminIndex extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    render() {
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
                width: 90%;
                right: 10px;
                left: 90px;
                top: 0;
                z-index: 100;
                border-radius: 0 0 25px 25px;
            }

            .container-fluid {
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .navbar-brand img {
                height: 40px;
                width: auto;
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

            /* Responsive design */
            @media (max-width: 768px) {
                .navbar-toggler {
                    display: block;
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                }

                .navbar-collapse {
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background-color: rgba(0,0,0,0.95);
                    padding: 20px;
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
                }
            }
        </style>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#"><img class="img-fluid" src="src/img/f1.png" alt="F1 Logo"></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active navbar" aria-current="page" href="#" data-verocultar='["#equipos", ["#pilotos", "#circuitos", "#vehiculos"]]'>Equipos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link navbar" aria-current="page" href="#" data-verocultar='["#pilotos", ["#equipos", "#circuitos", "#vehiculos"]]'>Pilotos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link navbar" aria-current="page" href="#" data-verocultar='["#circuitos", ["#pilotos", "#equipos", "#vehiculos"]]'>Circuitos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link navbar" aria-current="page" href="#" data-verocultar='["#vehiculos", ["#pilotos", "#circuitos", "#equipos"]]'>Vehículos</a>
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


        this.querySelectorAll(".navbar").forEach((val, id) => {
            val.addEventListener("click", (e) => {
 
                this.querySelectorAll(".nav-link").forEach(link => {
                    link.classList.remove('active');
                });
                
                e.target.classList.add('active');

                let data = JSON.parse(e.target.dataset.verocultar);
                let cardVer = document.querySelector(data[0]);
                cardVer.style.display = 'block';
                data[1].forEach(card => {
                    let cardActual = document.querySelector(card);
                    cardActual.style.display = 'none';
                });
                e.stopImmediatePropagation();
                e.preventDefault();
            });
        });


        const toggler = this.querySelector('.navbar-toggler');
        const collapse = this.querySelector('.navbar-collapse');
        
        toggler?.addEventListener('click', () => {
            collapse.classList.toggle('show');
        });
    }
}

customElements.define("admin-index", adminIndex);