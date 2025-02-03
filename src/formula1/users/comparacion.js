export class CompararVehiculos extends HTMLElement {
    constructor() {
        super();
        this.selectedCars = [];
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            .comparison-container { padding: 10px; }
            .car-info { border: 1px solid #ddd; padding: 10px; margin-top: 10px; }
        </style>
        <div class="comparison-container">
            <div class="car-selector">
                <select id="carSelect" name="carSelect">
                    <option value="">Seleccionar carro</option>
                </select>
            </div>
            <div id="comparisonTableContainer"></div>
        </div>
        `;
        
        this.fetchVehicles();
    }

    fetchVehicles() {
        fetch('../../../db.json')
            .then(response => response.json())
            .then(data => {
                this.vehicles = data.vehiculos;
                this.populateSelect();
            })
            .catch(error => console.error("Error al cargar los datos de vehículos:", error));
    }

    populateSelect() {
        const carSelect = this.shadowRoot.getElementById("carSelect");
        carSelect.addEventListener("change", (event) => this.displayVehicleInfo(event.target.value));

        this.vehicles.forEach(vehiculo => {
            const option = document.createElement("option");
            option.value = vehiculo.id;
            option.textContent = vehiculo.motor;
            carSelect.appendChild(option);
        });
    }

    displayVehicleInfo(vehicleId) {
        const selectedVehicle = this.vehicles.find(v => v.id === vehicleId);
        const container = this.shadowRoot.getElementById("comparisonTableContainer");

        if (selectedVehicle && !this.selectedCars.includes(vehicleId)) {
            this.selectedCars.push(vehicleId);

            const infoDiv = document.createElement("div");
            infoDiv.classList.add("car-info");
            infoDiv.innerHTML = `
                <h3>Información del Vehículo</h3>
                <p><strong>Motor:</strong> ${selectedVehicle.motor}</p>
                <p><strong>Equipo</strong> ${selectedVehicle.equipoPiloto}</p>
                <p><strong>Modelo:</strong> ${selectedVehicle.modelo}</p>
            `;
            container.appendChild(infoDiv);
        }
    }
}

customElements.define("comparar-vehiculos", CompararVehiculos);
