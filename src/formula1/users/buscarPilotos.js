import { getPilotos } from "../../Apis/pilotosApis.js";

export class buscarPilotos extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
        this.pilotos = [];
    }

    connectedCallback() {
        this.getData();
    }

    getData() {
        getPilotos()
            .then((pilotos) => {
                this.pilotos = pilotos;
                this.renderGallery(); 
            })
            .catch((error) => {
                console.error('Error en la solicitud GET:', error.message);
            });
    }

    render() {
        this.shadowRoot.innerHTML = /*html*/`
        <div class="container">
            <h2 class="mb-4">Galería Pilotos F1</h2>
            <input type="text" class="search-bar" id="search" placeholder="Buscar pilotos...">
            <div class="row" id="gallery"></div>
        </div>
        `;

        const searchBar = this.shadowRoot.getElementById("search");
        searchBar.addEventListener("input", (e) => {
            this.renderGallery(e.target.value);
        });
    }

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
                <div id="card__listar" class="card">
                    <img src="${item.imagenPiloto}" alt="${item.nombrePiloto} Logo">
                    <div class="card__content">
                        <h1 class="card__title">${item.nombrePiloto}</h1>
                        <p class="card__pais"> ${item.rolPiloto}</p>
                        <p class="card__motor">⚡ ${item.equipoPiloto}</p>
                    </div>
                </div>
            `;
            galleryContainer.appendChild(divItems);
        });
    }
}

customElements.define("buscar-pilotos", buscarPilotos);
