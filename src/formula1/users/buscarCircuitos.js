import { getCircuitos } from "../../Apis/circuitosApis.js";
import { getPilotos } from "../../Apis/pilotosApis.js";

export class BuscarCircuitos extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
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
        <div class="container">
            <h2 class="mb-4">Galería Circuitos F1</h2>
            <input type="text" class="search-bar" id="search" placeholder="Buscar circuitos...">
            <div class="row" id="gallery"></div>
        </div>
        `;

        const searchBar = this.shadowRoot.getElementById("search");
        searchBar.addEventListener("input", (e) => {
            this.renderGallery(e.target.value);
        });
    }

    renderGallery(filter = "") {
        const filteredItems = this.circuitos.filter(item =>
            item.nombreCircuito.toLowerCase().includes(filter.toLowerCase()) ||
            item.paisCircuito.toLowerCase().includes(filter.toLowerCase()) ||
            item.vueltas.toLowerCase().includes(filter.toLowerCase())
        );

        const galleryContainer = this.shadowRoot.getElementById("gallery");
        galleryContainer.innerHTML = "";

        filteredItems.forEach(item => {
            const divItems = document.createElement('div');
            divItems.classList.add('col');

            divItems.innerHTML = /*html*/ `
                <div id="card__listar" class="card">
                    <img src="${item.imagenCircuito}" alt="${item.nombreCircuito} Logo">
                    <div class="card__content">
                        <h1 class="card__title">${item.nombreCircuito}</h1>
                        <p class="card__pais">🌍 ${item.paisCircuito}</p>
                        <p class="card__motor">⚡ ${item.longitud}</p>
                        <p class="card__pais">🌍 ${item.vueltas}</p>
                        <h1>Record Vuelta</h1>
                        <p class="card__motor">⚡ ${item.record_vuelta.tiempo}</p>
                        <p class="card__pais">🌍 ${item.record_vuelta.piloto}</p>
                        <p class="card__motor">⚡ ${item.record_vuelta.año}</p>
                        <h1>Ganadores</h1>
                        ${this.renderGanadores(item.ganadores)}
                    </div>
                </div>
            `;
            galleryContainer.appendChild(divItems);
        });
    }

    renderGanadores(ganadores) {
        return ganadores.map(ganador => {
            return `<p class="card__ganador-temporada">⚡ ${ganador.temporada}: ${ganador.piloto}</p>`;
        }).join('');
    }
}

customElements.define("buscar-circuitos", BuscarCircuitos);
