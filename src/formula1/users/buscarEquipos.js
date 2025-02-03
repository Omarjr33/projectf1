import { getEquipos } from "../../Apis/equiposApis.js";
import { getPilotos } from "../../Apis/pilotosApis.js";

export class BuscarEquipos extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
        this.equipos = [];
        this.pilotos = [];
    }

    connectedCallback() {
        this.getData();
    }

    getData() {
        Promise.all([getEquipos(), getPilotos()])
            .then(([equipos, pilotos]) => {
                this.pilotos = pilotos;
                this.equipos = equipos;
                this.renderGallery();
            })
            .catch((error) => {
                console.error('Error en la solicitud GET:', error.message);
            });
    }

    render() {
        this.shadowRoot.innerHTML = /*html*/`
        <style>
            .container {
                padding: 2rem 0;
            }

            h2 {
                color: #ffffff;
                font-size: 2.5rem;
                font-weight: 600;
                margin-bottom: 2rem;
                text-transform: uppercase;
                letter-spacing: 2px;
                text-align: center;
                text-shadow: 0 0 10px rgba(237, 28, 36, 0.5);
            }

            .search-bar {
                width: 100%;
                max-width: 500px;
                margin: 0 auto 2rem;
                display: block;
                padding: 1rem 1.5rem;
                border: 2px solid rgba(237, 28, 36, 0.3);
                border-radius: 8px;
                background: rgba(30, 30, 30, 0.95);
                color: #ffffff;
                font-size: 1rem;
                transition: all 0.3s ease;
            }

            .search-bar:focus {
                outline: none;
                border-color: #ED1C24;
                box-shadow: 0 0 15px rgba(237, 28, 36, 0.3);
            }

            .row {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                gap: 2rem;
                padding: 1rem;
            }

            .card {
                background: rgba(30, 30, 30, 0.95);
                border-radius: 12px;
                overflow: hidden;
                transition: all 0.3s ease;
                border: 1px solid rgba(237, 28, 36, 0.2);
                height: 400px;
                cursor: pointer;
            }

            .card:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 20px rgba(237, 28, 36, 0.2);
                border-color: #ED1C24;
            }

            .card__image-container {
                height: 200px;
                overflow: hidden;
                border-bottom: 2px solid rgba(237, 28, 36, 0.3);
            }

            .card img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: all 0.3s ease;
            }

            .card:hover img {
                transform: scale(1.05);
            }

            .card__content {
                padding: 1.5rem;
                height: calc(100% - 200px);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }

            .card__title {
                color: #ffffff;
                font-size: 1.5rem;
                font-weight: 600;
                margin: 0;
                text-transform: uppercase;
                letter-spacing: 1px;
            }

            .card__info {
                color: #cccccc;
                font-size: 0.9rem;
                margin: 0.5rem 0;
            }

            .card__button {
                background: #ED1C24;
                color: #ffffff;
                border: none;
                padding: 0.8rem;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.3s ease;
                text-transform: uppercase;
                letter-spacing: 1px;
                font-weight: 600;
                margin-top: auto;
            }

            .card__button:hover {
                background: #ff2d36;
                box-shadow: 0 0 15px rgba(237, 28, 36, 0.3);
            }

            /* Modal Styles */
            .modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(5px);
                z-index: 1000;
                overflow-y: auto;
                padding: 2rem 1rem;
            }

            .modal.active {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .modal__content {
                background: rgba(30, 30, 30, 0.95);
                border-radius: 12px;
                max-width: 800px;
                width: 90%;
                margin: auto;
                padding: 2rem;
                position: relative;
                border: 2px solid #ED1C24;
                box-shadow: 0 0 30px rgba(237, 28, 36, 0.3);
            }

            .modal__close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: none;
                border: none;
                color: #ffffff;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0.5rem;
                line-height: 1;
            }

            .modal__header {
                display: flex;
                align-items: center;
                gap: 2rem;
                margin-bottom: 2rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid rgba(237, 28, 36, 0.3);
            }

            .modal__logo {
                width: 150px;
                height: 150px;
                object-fit: contain;
            }

            .modal__title {
                color: #ffffff;
                font-size: 2rem;
                margin: 0;
            }

            .modal__info {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 2rem;
            }

            .modal__section {
                margin-bottom: 1.5rem;
            }

            .modal__section-title {
                color: #ED1C24;
                font-size: 1.2rem;
                margin-bottom: 1rem;
                text-transform: uppercase;
                letter-spacing: 1px;
            }

            .modal__text {
                color: #ffffff;
                margin: 0.5rem 0;
                font-size: 1rem;
            }

            .pilotos-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 1.5rem;
                margin-top: 1rem;
            }

            .piloto-card {
                background: rgba(20, 20, 20, 0.5);
                border-radius: 8px;
                overflow: hidden;
                border: 1px solid rgba(237, 28, 36, 0.2);
                transition: all 0.3s ease;
                aspect-ratio: 3/4;
                display: flex;
                flex-direction: column;
            }

            .piloto-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 5px 15px rgba(237, 28, 36, 0.3);
                border-color: #ED1C24;
            }

            .piloto-card__image-container {
                width: 100%;
                height: 85%;
                overflow: hidden;
                position: relative;
                background: linear-gradient(to bottom, rgba(20, 20, 20, 0.2), rgba(20, 20, 20, 0.4));
            }

            .piloto-card img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: top center;
                transition: all 0.3s ease;
            }

            .piloto-card:hover img {
                transform: scale(1.05);
            }

            .piloto-card__info {
                padding: 1rem;
                text-align: center;
            }

            .piloto-card__name {
                color: #ffffff;
                margin: 0;
                font-size: 1.1rem;
                font-weight: 600;
            }

            @media (max-width: 768px) {
                .modal__info {
                    grid-template-columns: 1fr;
                }

                .modal__header {
                    flex-direction: column;
                    text-align: center;
                    gap: 1rem;
                }

                .pilotos-grid {
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                }
            }
        </style>
        <div class="container">
            <h2>Galería Equipos F1</h2>
            <input type="text" class="search-bar" id="search" placeholder="Buscar por equipo, país o motor...">
            <div class="row" id="gallery"></div>
        </div>
        <div class="modal" id="teamModal">
            <div class="modal__content">
                <button class="modal__close">×</button>
                <div id="modalContent"></div>
            </div>
        </div>
        `;

        const searchBar = this.shadowRoot.getElementById("search");
        searchBar.addEventListener("input", (e) => {
            this.renderGallery(e.target.value);
        });

        const modal = this.shadowRoot.getElementById("teamModal");
        const closeButton = this.shadowRoot.querySelector(".modal__close");
        closeButton.addEventListener("click", () => {
            modal.classList.remove("active");
        });

        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("active");
            }
        });
    }

    showModal(equipo, pilotos) {
        const modal = this.shadowRoot.getElementById("teamModal");
        const modalContent = this.shadowRoot.getElementById("modalContent");
        
        const pilotosEquipo = equipo.pilotos.map(pilotoID => {
            return this.pilotos.find(piloto => piloto.id === pilotoID);
        }).filter(piloto => piloto);

        modalContent.innerHTML = /*html*/`
            <div class="modal__header">
                <img src="${equipo.imagenEquipo}" alt="${equipo.nombreEquipo}" class="modal__logo">
                <h2 class="modal__title">${equipo.nombreEquipo}</h2>
            </div>
            <div class="modal__info">
                <div class="modal__section">
                    <h3 class="modal__section-title">Información del Equipo</h3>
                    <p class="modal__text">🌍 País: ${equipo.paisEquipo}</p>
                    <p class="modal__text">⚡ Motor: ${equipo.motorEquipo}</p>
                    <p class="modal__text">🏆 Campeonatos: ${equipo.campeonatos || 'N/A'}</p>
                </div>
                <div class="modal__section">
                    <h3 class="modal__section-title">Pilotos</h3>
                    <div class="pilotos-grid">
                        ${pilotosEquipo.map(piloto => `
                            <div class="piloto-card">
                                <div class="piloto-card__image-container">
                                    <img src="${piloto.imagenPiloto}" alt="${piloto.nombrePiloto}">
                                </div>
                                <div class="piloto-card__info">
                                    <h4 class="piloto-card__name">${piloto.nombrePiloto}</h4>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        modal.classList.add("active");
    }

    renderGallery(filter = "") {
        const filteredItems = this.equipos.filter(item =>
            item.nombreEquipo.toLowerCase().includes(filter.toLowerCase()) ||
            item.paisEquipo.toLowerCase().includes(filter.toLowerCase()) ||
            item.motorEquipo.toLowerCase().includes(filter.toLowerCase())
        );

        const galleryContainer = this.shadowRoot.getElementById("gallery");
        galleryContainer.innerHTML = "";

        filteredItems.forEach(item => {
            const divItems = document.createElement('div');
            divItems.classList.add('col');

            divItems.innerHTML = /*html*/ `
                <div class="card">
                    <div class="card__image-container">
                        <img src="${item.imagenEquipo}" alt="${item.nombreEquipo} Logo">
                    </div>
                    <div class="card__content">
                        <div>
                            <h1 class="card__title">${item.nombreEquipo}</h1>
                            <p class="card__info">🌍 ${item.paisEquipo}</p>
                            <p class="card__info">⚡ ${item.motorEquipo}</p>
                        </div>
                        <button class="card__button">Ver Detalles</button>
                    </div>
                </div>
            `;

            const card = divItems.querySelector('.card');
            card.addEventListener('click', () => this.showModal(item, this.pilotos));

            galleryContainer.appendChild(divItems);
        });
    }
}

customElements.define("buscar-equipos", BuscarEquipos);