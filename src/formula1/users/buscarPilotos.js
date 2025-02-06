import { getPilotos } from "../../Apis/pilotosApis.js";

export class buscarPilotos extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
        this.pilotos = []; // Inicializa un arreglo vacío para los pilotos
    }

    connectedCallback() {
        this.getData(); // Llama a getData para cargar los datos de los pilotos
    }
    // Método para obtener los datos de los pilotos desde la API
    getData() {
        getPilotos() // Llama a la función getPilotos que devuelve una promesa
            .then((pilotos) => {
                this.pilotos = pilotos; // Asigna los pilotos recibidos a la propiedad 'pilotos'
                this.renderGallery(); // Renderiza la galería de pilotos
            })
            .catch((error) => {
                console.error('Error en la solicitud GET:', error.message);
            });
    }

    render() {
        this.shadowRoot.innerHTML = /*html*/`
        <style>
            :host {
                --card-height: 400px;
                --card-width: 280px;
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
                grid-template-columns: repeat(auto-fill, minmax(var(--card-width), 1fr));
                gap: 3rem;
                padding: 1rem;
                justify-items: center;
            }

            .elemento__cartao {
                width: var(--card-width);
                height: var(--card-height);
                position: relative;
                display: flex;
                justify-content: center;
                align-items: flex-end;
                padding: 0;
                perspective: 2500px;
                margin: 0;
                cursor: pointer;
            }

            .caixa__foto {
                transition: all 0.5s;
                position: absolute;
                width: 100%;
                height: 100%;
                z-index: 1;
                overflow: hidden;
                border-radius: 10px;
            }

            .elemento__foto__cobertura {
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: top;
            }

            .elemento__cartao:hover .caixa__foto {
                transform: perspective(900px) translateY(-5%) rotateX(25deg) translateZ(0);
                box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.75);
            }

            .caixa__foto::before,
            .caixa__foto::after {
                content: "";
                opacity: 0;
                width: 100%;
                height: 80px;
                transition: all 0.5s;
                position: absolute;
                left: 0;
            }

            .caixa__foto::before {
                top: 0;
                height: 100%;
                background-image: linear-gradient(
                    to top,
                    transparent 46%,
                    rgba(12, 13, 19, 0.5) 68%,
                    rgba(12, 13, 19) 97%
                );
            }

            .caixa__foto::after {
                bottom: 0;
                opacity: 1;
                background-image: linear-gradient(
                    to bottom,
                    transparent 46%,
                    rgba(12, 13, 19, 0.5) 68%,
                    rgba(12, 13, 19) 97%
                );
            }

            .elemento__cartao:hover .caixa__foto::before,
            .elemento__cartao:hover .caixa__foto::after {
                opacity: 1;
            }

            .elemento__cartao:hover .caixa__foto::after {
                height: 120px;
            }

            .elemento__titulo {
                width: 100%;
                color: white;
                text-align: center;
                font-size: 1.2rem;
                font-weight: bold;
                transition: transform 0.5s;
                position: absolute;
                bottom: 20px;
                z-index: 2;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                margin: 0;
            }

            .elemento__info {
                width: 100%;
                color: #cccccc;
                text-align: center;
                font-size: 0.9rem;
                transition: transform 0.5s;
                position: absolute;
                bottom: 5px;
                z-index: 2;
                margin: 0;
            }

            .elemento__cartao:hover .elemento__titulo {
                transform: translate3d(0%, -50px, 100px);
            }

            .elemento__cartao:hover .elemento__info {
                transform: translate3d(0%, -30px, 100px);
            }

            .elemento__personagem {
                width: 120%;
                height: 100%;
                opacity: 0;
                transition: all 0.5s;
                position: absolute;
                z-index: 3;
                bottom: 0;
                left: -10%;
                object-fit: cover;
                object-position: center;
            }

            .elemento__cartao:hover .elemento__personagem {
                opacity: 1;
                transform: translate3d(0%, -30%, 100px);
            }

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
                margin: 2rem auto;
                position: relative;
                border: 2px solid #ED1C24;
                box-shadow: 0 0 30px rgba(237, 28, 36, 0.3);
                overflow: hidden;
            }

            .modal__image-container {
                height: 400px;
                overflow: hidden;
                position: relative;
            }

            .modal__image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: top center;
            }

            .modal__details {
                padding: 2rem;
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
                transition: all 0.3s ease;
                z-index: 10;
            }

            .modal__close:hover {
                background: #ED1C24;
            }

            .stats-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 1.5rem;
                margin-top: 1.5rem;
            }

            .stat-item {
                background: rgba(20, 20, 20, 0.5);
                padding: 1rem;
                border-radius: 8px;
                border: 1px solid rgba(237, 28, 36, 0.2);
            }

            .stat-item h4 {
                color: #ED1C24;
                margin: 0 0 0.5rem;
                font-size: 1rem;
                text-transform: uppercase;
            }

            .stat-item p {
                color: #ffffff;
                margin: 0;
                font-size: 1.2rem;
            }

            @media (max-width: 768px) {
                .stats-grid {
                    grid-template-columns: 1fr;
                }

                .modal__image-container {
                    height: 300px;
                }

                :host {
                    --card-width: 240px;
                    --card-height: 340px;
                }
            }

            @media (max-width: 480px) {
                :host {
                    --card-width: 220px;
                    --card-height: 320px;
                }

                h2 {
                    font-size: 2rem;
                }
            }
        </style>
        <div class="container">
            <h2>Pilotos F1</h2>
            <input type="text" class="search-bar" id="search" placeholder="Buscar por piloto, rol o equipo...">
            <div class="row" id="gallery"></div>
        </div>
        <div class="modal" id="pilotoModal">
            <div class="modal__content">
                <button class="modal__close">×</button>
                <div id="modalContent"></div>
            </div>
        </div>
        `;
        // Configura la barra de búsqueda para filtrar los pilotos en la galería
        const searchBar = this.shadowRoot.getElementById("search");
        searchBar.addEventListener("input", (e) => {
            this.renderGallery(e.target.value);
        });
        // Configura el botón de cierre del modal
        const modal = this.shadowRoot.getElementById("pilotoModal");
        const closeButton = this.shadowRoot.querySelector(".modal__close");
        closeButton.addEventListener("click", () => {
            modal.classList.remove("active");
        });
        // Configura el evento de cierre del modal si el usuario hace clic fuera de él
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("active");
            }
        });
    }
    // Método para mostrar el modal con los detalles del piloto
    showModal(piloto) {
        const modal = this.shadowRoot.getElementById("pilotoModal");
        const modalContent = this.shadowRoot.getElementById("modalContent");

        modalContent.innerHTML = /*html*/`
            <div class="modal__image-container">
                <img src="${piloto.imagenPiloto}" alt="${piloto.nombrePiloto}" class="modal__image">
            </div>
            <div class="modal__details">
                <h2 class="modal__title">${piloto.nombrePiloto}</h2>
                <div class="stats-grid">
                    <div class="stat-item">
                        <h4>Rol</h4>
                        <p>${piloto.rolPiloto}</p>
                    </div>
                    <div class="stat-item">
                        <h4>Equipo</h4>
                        <p>${piloto.equipoPiloto}</p>
                    </div>
                    ${piloto.experiencia ? `
                        <div class="stat-item">
                            <h4>Experiencia</h4>
                            <p>${piloto.experiencia}</p>
                        </div>
                    ` : ''}
                    ${piloto.victorias ? `
                        <div class="stat-item">
                            <h4>Victorias</h4>
                            <p>${piloto.victorias}</p>
                        </div>
                    ` : ''}
                    ${piloto.podios ? `
                        <div class="stat-item">
                            <h4>Podios</h4>
                            <p>${piloto.podios}</p>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
        //Mostrar Modal
        modal.classList.add("active");
    }
    // Método para renderizar la galería de pilotos con un filtro
    renderGallery(filter = "") {
        const filteredItems = this.pilotos.filter(item =>
            item.nombrePiloto.toLowerCase().includes(filter.toLowerCase()) ||
            item.rolPiloto.toLowerCase().includes(filter.toLowerCase()) ||
            item.equipoPiloto.toLowerCase().includes(filter.toLowerCase())
        );

        const galleryContainer = this.shadowRoot.getElementById("gallery");
        galleryContainer.innerHTML = "";

        filteredItems.forEach(item => {
            const divItems = document.createElement('div');
            divItems.classList.add('col');

            divItems.innerHTML = /*html*/ `
                <div class="elemento__cartao" data-id="${item.id}">
                    <div class="caixa__foto">
                        <img src="${item.imagenPiloto}" class="elemento__foto__cobertura" alt="${item.nombrePiloto}"/>
                    </div>
                    <h3 class="elemento__titulo">${item.nombrePiloto}</h3>
                    <p class="elemento__info">${item.equipoPiloto}</p>
                    <img src="${item.imagenPiloto}" class="elemento__personagem" alt="${item.nombrePiloto}"/>
                </div>
            `;
            // Añade un evento de clic a cada tarjeta para mostrar los detalles en el modal
            const card = divItems.querySelector('.elemento__cartao');
            card.addEventListener('click', () => this.showModal(item));

            galleryContainer.appendChild(divItems);
        });
    }
}

customElements.define("buscar-pilotos", buscarPilotos);