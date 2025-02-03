import { getVehiculos } from "../../Apis/vehiculosApis.js";
import {getPilotos } from "../../Apis/pilotosApis.js";

export class BuscarVehiculos extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
        this.vehiculos = [];
        this.pilotos = [];
    }

    connectedCallback() {
        this.getData();
    }

    getData() {
        Promise.all([getVehiculos(), getPilotos()])
            .then(([vehiculos, pilotos]) => {
                this.pilotos = pilotos;
                this.vehiculos = vehiculos;
                this.renderGallery(); 
            })
            .catch((error) => {
                console.error('Error en la solicitud GET:', error.message);
            });
    }

    render() {
        this.shadowRoot.innerHTML = /*html*/`
        <div class="container">
            <h2 class="mb-4">Galería Vehiculos F1</h2>
            <input type="text" class="search-bar" id="search" placeholder="Buscar vehiculos...">
            <div class="row" id="gallery"></div>
        </div>
        `;

        const searchBar = this.shadowRoot.getElementById("search");
        searchBar.addEventListener("input", (e) => {
            this.renderGallery(e.target.value);
        });
    }

    renderGallery(filter = "") {
        const filteredItems = this.vehiculos.filter(item =>
            item.motor.toLowerCase().includes(filter.toLowerCase()) ||
            item.modelo.toLowerCase().includes(filter.toLowerCase()) ||
            item.velocidadMaximaKmh.toLowerCase().includes(filter.toLowerCase())
        );

        const galleryContainer = this.shadowRoot.getElementById("gallery");
        galleryContainer.innerHTML = "";

        filteredItems.forEach(item => {
            const divItems = document.createElement('div');
            divItems.classList.add('col');

            divItems.innerHTML = /*html*/ `
                <div id="card__listar" class="card">
                    <img src="${item.imagenVehiculo}" alt="${item.motor} Logo">
                    <div class="card__content">
                        <h1 class="card__title">${item.motor}</h1>
                        <p class="card__pais">🌍 ${item.modelo}</p>
                        <p class="card__motor">⚡ ${item.equipoPiloto}</p>
                        <p class="card__motor">⚡ ${item.nombrePiloto}</p>
                        <p class="card__pais">🌍 ${item.velocidadMaximaKmh}</p>
                        <p class="card__motor">⚡ ${item.aceleracion0a100}</p>
                        <h2>Rendimiento</h2>
                        <h2>Conducción Normal</h2>
                        <p class="card__motor">⚡ ${item.rendimiento.conduccionNormal.velocidadNormal}</p>
                        <h2>Consumo de Combustible</h2>
                        <p class="card__motor">⚡ ${item.rendimiento.conduccionNormal.consumoCombustible.seco}</p>
                        <p class="card__motor">⚡ ${item.rendimiento.conduccionNormal.consumoCombustible.lluvioso}</p>
                        <p class="card__motor">⚡ ${item.rendimiento.conduccionNormal.consumoCombustible.extremo}</p>
                        <h2>Desgaste de Neumaticos</h2>
                        <p class="card__motor">⚡ ${item.rendimiento.conduccionNormal.desgasteNeumaticos.seco}</p>
                        <p class="card__motor">⚡ ${item.rendimiento.conduccionNormal.desgasteNeumaticos.lluvioso}</p>
                        <p class="card__motor">⚡ ${item.rendimiento.conduccionNormal.desgasteNeumaticos.extremo}</p>
                        <h2>Conducción Agresiva</h2>
                        <p class="card__motor">⚡ ${item.rendimiento.conduccionAgresiva.velocidadAgresiva}</p>
                        <h2>Consumo de Combustible</h2>
                        <p class="card__motor">⚡ ${item.rendimiento.conduccionAgresiva.consumoCombustible.seco}</p>
                        <p class="card__motor">⚡ ${item.rendimiento.conduccionAgresiva.consumoCombustible.lluvioso}</p>
                        <p class="card__motor">⚡ ${item.rendimiento.conduccionAgresiva.consumoCombustible.extremo}</p>
                        <h2>Desgaste de Neumaticos</h2>
                        <p class="card__motor">⚡ ${item.rendimiento.conduccionAgresiva.desgasteNeumaticos.seco}</p>
                        <p class="card__motor">⚡ ${item.rendimiento.conduccionAgresiva.desgasteNeumaticos.lluvioso}</p>
                        <p class="card__motor">⚡ ${item.rendimiento.conduccionAgresiva.desgasteNeumaticos.extremo}</p>
                        <h2>Ahorro de Combustible</h2>
                        <p class="card__motor">⚡ ${item.rendimiento.ahorroCombustible.velocidadPromedio}</p>
                        <h2>Consumo de Combustible</h2>
                        <p class="card__motor">⚡ ${item.rendimiento.ahorroCombustible.consumoCombustible.seco}</p>
                        <p class="card__motor">⚡ ${item.rendimiento.ahorroCombustible.consumoCombustible.lluvioso}</p>
                        <p class="card__motor">⚡ ${item.rendimiento.ahorroCombustible.consumoCombustible.extremo}</p>
                        <h2>Desgaste de Neumaticos</h2>
                        <p class="card__motor">⚡ ${item.rendimiento.ahorroCombustible.desgasteNeumaticos.seco}</p>
                        <p class="card__motor">⚡ ${item.rendimiento.ahorroCombustible.desgasteNeumaticos.lluvioso}</p>
                        <p class="card__motor">⚡ ${item.rendimiento.ahorroCombustible.desgasteNeumaticos.extremo}</p>
                    </div>
                </div>
            `;
            galleryContainer.appendChild(divItems);
        });
    }
}

customElements.define("buscar-vehiculos", BuscarVehiculos);
