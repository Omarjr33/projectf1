import { patchPilotos } from "../../Apis/pilotosApis.js";

export class BuscarPilotos extends HTMLElement {
    constructor() {
        super();
        this.pilotos = [];
        this.loadPilotos();
    }

    async loadPilotos() {
        try {
            this.pilotos = await patchPilotos(); // Carga los pilotos desde la API
            this.render();
        } catch (error) {
            console.error("Error al cargar los pilotos:", error);
            this.innerHTML = "<p>Error al cargar los pilotos.</p>";
        }
    }

    render() {
        this.innerHTML = `
         <style>
            .search-box {
                width: 100%;
                max-width: 400px;
                margin: auto;
                padding: 10px;
            }
            .row {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .search-bar {
                flex: 1;
                padding: 8px;
                border: 1px solid #ccc;
                border-radius: 5px;
            }
            .buscarbtn {
                border: none;
                background: transparent;
                cursor: pointer;
            }
            .results {
                margin-top: 10px;
                border: 1px solid #ccc;
                border-radius: 5px;
                max-height: 150px;
                overflow-y: auto;
                background: white;
            }
            .result-item {
                padding: 10px;
                cursor: pointer;
                border-bottom: 1px solid #eee;
            }
            .result-item:hover {
                background: #f0f0f0;
            }
            .selected {
                margin-top: 20px;
                padding: 10px;
                border: 1px solid #ccc;
                border-radius: 5px;
                background: #fafafa;
            }
        </style>
        <h2>Buscar Pilotos</h2>
        <div class="search-box">
            <div class="row">
                <input type="text" class="search-bar" placeholder="Buscar Piloto" autocomplete="off">
                <button class="buscarbtn"><img src="images/Search 2.png" alt="Buscar"></button>
            </div>
            <div class="results"></div>
        </div>
        <div class="selected"></div>
        `;
        this.addEventListeners();
    }

    addEventListeners() {
        const searchBar = this.querySelector(".search-bar");
        const resultsDiv = this.querySelector(".results");
        const selectedDiv = this.querySelector(".selected");

        searchBar.addEventListener("input", () => {
            const query = searchBar.value.toLowerCase();
            resultsDiv.innerHTML = "";

            if (query.trim() === "") return;

            const filteredPilots = this.pilotos.filter(piloto =>
                piloto.nombre.toLowerCase().includes(query)
            );

            filteredPilots.forEach(piloto => {
                const div = document.createElement("div");
                div.classList.add("result-item");
                div.textContent = piloto.nombre;
                div.addEventListener("click", () => {
                    selectedDiv.innerHTML = `
                        <h3>Seleccionado:</h3>
                        <p><strong>Nombre:</strong> ${piloto.nombre}</p>
                        <p><strong>Equipo:</strong> ${piloto.equipo}</p>
                    `;
                    resultsDiv.innerHTML = "";
                    searchBar.value = piloto.nombre;
                });
                resultsDiv.appendChild(div);
            });
        });
    }
}

customElements.define("buscar-pilotos", BuscarPilotos);
