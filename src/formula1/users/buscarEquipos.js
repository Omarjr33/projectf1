import { getEquipos } from "../../Apis/equiposApis.js";
import {getPilotos } from "../../Apis/pilotosApis.js";

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
        <div class="container">
            <h2 class="mb-4">Galería Equipos F1</h2>
            <input type="text" class="search-bar" id="search" placeholder="Buscar equipos...">
            <div class="row" id="gallery"></div>
        </div>
        `;

        const searchBar = this.shadowRoot.getElementById("search");
        searchBar.addEventListener("input", (e) => {
            this.renderGallery(e.target.value);
        });
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

            //Cambiar el ID del piloto por el Nombre
            const nombresPilotos = item.pilotos.map(pilotoID => {
                const piloto = this.pilotos.find(piloto => piloto.id === pilotoID);
                return piloto ? piloto.nombrePiloto : "Piloto";
            }).join(', ');

            divItems.innerHTML = /*html*/ `
                <div id="card__listar" class="card">
                    <img src="${item.imagenEquipo}" alt="${item.nombreEquipo} Logo">
                    <div class="card__content">
                        <h1 class="card__title">${item.nombreEquipo}</h1>
                        <p class="card__pais">🌍 ${item.paisEquipo}</p>
                        <p class="card__motor">⚡ ${item.motorEquipo}</p>
                        <p class="card__motor">⚡ ${nombresPilotos}</p>
                    </div>
                </div>
            `;
            galleryContainer.appendChild(divItems);
        });
    }
}

customElements.define("buscar-equipos", BuscarEquipos);
