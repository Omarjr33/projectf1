import { getCircuitos } from "../../Apis/circuitosApis.js";
import { getPilotos } from "../../Apis/pilotosApis.js";

export class BuscarCircuitos extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
        // Arrays para almacenar datos de circuitos y pilotos
        this.circuitos = [];
        this.pilotos = [];
    }

    connectedCallback() {
        this.getData();
    }

    getData() {
        Promise.all([getCircuitos(), getPilotos()])
            .then(([circuitos, pilotos]) => {
                this.pilotos = pilotos;
                this.circuitos = circuitos;
                this.renderGallery();
            })
            .catch((error) => {
                console.error('Error en la solicitud GET:', error.message);
            });
    }

    render() {
        this.shadowRoot.innerHTML = /*html*/`
        <style>
            :host {
                display: block;
                color: #ffffff;
            }

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
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
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
                background: linear-gradient(to bottom, rgba(30, 30, 30, 0.95), rgba(20, 20, 20, 0.98));
            }

            .card__title {
                color: #ffffff;
                font-size: 1.5rem;
                font-weight: 600;
                margin: 0 0 1rem;
                text-transform: uppercase;
                letter-spacing: 1px;
            }

            .card__info {
                color: #cccccc;
                margin: 0.5rem 0;
                display: flex;
                align-items: center;
                gap: 0.5rem;
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

            .modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(10px);
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
                max-width: 900px;
                width: 90%;
                margin: auto;
                position: relative;
                border: 2px solid #ED1C24;
                box-shadow: 0 0 30px rgba(237, 28, 36, 0.3);
                overflow: hidden;
            }

            .modal__header {
                position: relative;
                height: 300px;
                overflow: hidden;
            }

            .modal__header-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .modal__header-overlay {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                padding: 2rem;
                background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
            }

            .modal__title {
                color: #ffffff;
                font-size: 2rem;
                margin: 0;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            }

            .modal__info {
                padding: 2rem;
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 2rem;
            }

            .info-section {
                background: rgba(20, 20, 20, 0.5);
                padding: 1.5rem;
                border-radius: 8px;
                border: 1px solid rgba(237, 28, 36, 0.2);
            }

            .info-section h3 {
                color: #ED1C24;
                margin: 0 0 1rem;
                font-size: 1.2rem;
                text-transform: uppercase;
                letter-spacing: 1px;
            }

            .ganadores-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 1rem;
                margin-top: 1rem;
            }

            .ganador-card {
                background: rgba(30, 30, 30, 0.5);
                padding: 0.8rem;
                border-radius: 6px;
                border: 1px solid rgba(237, 28, 36, 0.2);
            }

            .modal__close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: rgba(0, 0, 0, 0.5);
                border: none;
                color: #ffffff;
                font-size: 1.5rem;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10;
            }

            @media (max-width: 768px) {
                .modal__info {
                    grid-template-columns: 1fr;
                }

                .modal__header {
                    height: 200px;
                }

                .card {
                    height: 380px;
                }
            }
        </style>
        <div class="container">
            <h2>Circuitos F1</h2>
            <input type="text" class="search-bar" id="search" placeholder="Buscar por circuito, país o vueltas...">
            <div class="row" id="gallery"></div>
        </div>
        <div class="modal" id="circuitoModal">
            <div class="modal__content">
                <button class="modal__close">×</button>
                <div id="modalContent"></div>
            </div>
        </div>
        `;
        // Configuración del evento de búsqueda
        const searchBar = this.shadowRoot.getElementById("search");
        searchBar.addEventListener("input", (e) => {
            this.renderGallery(e.target.value);
        });
        // Configuración de eventos para cerrar el modal
        const modal = this.shadowRoot.getElementById("circuitoModal");
        const closeButton = this.shadowRoot.querySelector(".modal__close");
        closeButton.addEventListener("click", () => {
            modal.classList.remove("active");
        });
        // Cierra el modal al hacer clic fuera de su contenido
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("active");
            }
        });
    }
    // Muestra el modal con la información detallada del circuito
    showModal(circuito) {
        const modal = this.shadowRoot.getElementById("circuitoModal");
        const modalContent = this.shadowRoot.getElementById("modalContent");

        modalContent.innerHTML = /*html*/`
            <div class="modal__header">
                <img src="${circuito.imagenCircuito}" alt="${circuito.nombreCircuito}" class="modal__header-image">
                <div class="modal__header-overlay">
                    <h2 class="modal__title">${circuito.nombreCircuito}</h2>
                </div>
            </div>
            <div class="modal__info">
                <div class="info-section">
                    <h3>Información del Circuito</h3>
                    <p class="card__info">🌍 País: ${circuito.paisCircuito}</p>
                    <p class="card__info">📏 Longitud: ${circuito.longitud}</p>
                    <p class="card__info">🔄 Vueltas: ${circuito.vueltas}</p>
                </div>
                <div class="info-section">
                    <h3>Record de Vuelta</h3>
                    <p class="card__info">⏱️ Tiempo: ${circuito.record_vuelta.tiempo}</p>
                    <p class="card__info">👤 Piloto: ${circuito.record_vuelta.piloto}</p>
                    <p class="card__info">📅 Año: ${circuito.record_vuelta.año}</p>
                </div>
                <div class="info-section" style="grid-column: 1 / -1;">
                    <h3>Ganadores Recientes</h3>
                    <div class="ganadores-grid">
                        ${this.renderGanadoresModal(circuito.ganadores)}
                    </div>
                </div>
            </div>
        `;

        modal.classList.add("active");
    }
    // Renderiza la lista de ganadores en el modal
    renderGanadoresModal(ganadores) {
        return ganadores.map(ganador => `
            <div class="ganador-card">
                <p class="card__info">🏆 ${ganador.temporada}</p>
                <p class="card__info">👤 ${ganador.piloto}</p>
            </div>
        `).join('');
    }
    // Renderiza la galería de circuitos con filtrado opcional
    renderGallery(filter = "") {
        // Filtra los circuitos según el término de búsqueda
        const filteredItems = this.circuitos.filter(item =>
            item.nombreCircuito.toLowerCase().includes(filter.toLowerCase()) ||
            item.paisCircuito.toLowerCase().includes(filter.toLowerCase()) ||
            item.vueltas.toLowerCase().includes(filter.toLowerCase())
        );

        const galleryContainer = this.shadowRoot.getElementById("gallery");
        galleryContainer.innerHTML = "";
        // Crea y agrega las tarjetas de circuitos filtradas
        filteredItems.forEach(item => {
            const divItems = document.createElement('div');
            divItems.classList.add('col');

            divItems.innerHTML = /*html*/ `
                <div class="card">
                    <div class="card__image-container">
                        <img src="${item.imagenCircuito}" alt="${item.nombreCircuito}">
                    </div>
                    <div class="card__content">
                        <div>
                            <h1 class="card__title">${item.nombreCircuito}</h1>
                            <p class="card__info">🌍 ${item.paisCircuito}</p>
                            <p class="card__info">📏 ${item.longitud}</p>
                            <p class="card__info">🔄 ${item.vueltas} vueltas</p>
                        </div>
                        <button class="card__button">Ver Detalles</button>
                    </div>
                </div>
            `;
            // Agrega el evento click para mostrar el modal
            const card = divItems.querySelector('.card');
            card.addEventListener('click', () => this.showModal(item));
            // Agrega la tarjeta al contenedor de la galería
            galleryContainer.appendChild(divItems);
        });
    }
}

customElements.define("buscar-circuitos", BuscarCircuitos);