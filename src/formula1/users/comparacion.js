export class CompararVehiculos extends HTMLElement {
    constructor() {
        super();
        // Array para almacenar los IDs de los vehículos seleccionados
        this.selectedCars = [];
        this.attachShadow({ mode: 'open' });
        this.render();
    }
    // Método para renderizar el componente
    render() {
        this.shadowRoot.innerHTML = /*html*/`
        <style>
            .comparison-container {
                padding-top: 4rem;
                background: rgba(30, 30, 30, 0.95);
                border-radius: 12px;
                min-height: 100vh;
                color: white;
                position: relative;
            }
 
            .back-button {
                position: fixed;
                top: 1rem;
                left: 1rem;
                background: linear-gradient(45deg, #ED1C24, #ff4d4d);
                color: white;
                border: none;
                padding: 0.8rem 1.5rem;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.3s ease;
                text-transform: uppercase;
                letter-spacing: 1px;
                font-weight: 600;
                z-index: 100;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
 
            .back-button:hover {
                background: linear-gradient(45deg, #ff2d36, #ff6666);
                box-shadow: 0 0 15px rgba(237, 28, 36, 0.3);
                transform: translateX(-3px);
            }
 
            h2 {
                color: #ffffff;
                font-size: 2.5rem;
                font-weight: 600;
                margin-bottom: 2rem;
                text-transform: uppercase;
                text-align: center;
                text-shadow: 0 0 10px rgba(237, 28, 36, 0.5);
            }
 
            .car-selector {
                margin: 0 auto 2rem;
                text-align: center;
                max-width: 500px;
                position: relative;
            }
 
            select {
                width: 100%;
                padding: 1rem 2rem;
                background: rgba(20, 20, 20, 0.9);
                border: 2px solid rgba(237, 28, 36, 0.3);
                border-radius: 8px;
                color: white;
                font-size: 1rem;
                cursor: pointer;
                transition: all 0.3s ease;
                appearance: none;
            }
 
            select:hover {
                border-color: #ED1C24;
                box-shadow: 0 0 15px rgba(237, 28, 36, 0.3);
            }
 
            .car-selector::after {
                content: '▼';
                position: absolute;
                right: 15px;
                top: 50%;
                transform: translateY(-50%);
                color: #ED1C24;
                pointer-events: none;
            }
 
            .comparison-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 2rem;
                padding: 1rem;
            }
 
            .car-card {
                background: rgba(20, 20, 20, 0.5);
                border-radius: 12px;
                overflow: hidden;
                border: 1px solid rgba(237, 28, 36, 0.2);
                transition: all 0.3s ease;
                opacity: 0;
                animation: fadeIn 0.5s ease forwards;
            }
 
            @keyframes fadeIn {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
 
            .car-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 20px rgba(237, 28, 36, 0.2);
                border-color: #ED1C24;
            }
 
            .car-image {
                width: 100%;
                height: 200px;
                object-fit: cover;
                border-bottom: 2px solid rgba(237, 28, 36, 0.3);
            }
 
            .car-info {
                padding: 1.5rem;
            }
 
            .car-title {
                color: #ED1C24;
                font-size: 1.5rem;
                font-weight: 600;
                margin: 0 0 1rem;
                text-transform: uppercase;
            }
 
            .spec-section {
                margin: 1.5rem 0;
            }
 
            .spec-title {
                color: #ED1C24;
                font-size: 1.2rem;
                margin-bottom: 1rem;
                text-transform: uppercase;
            }
 
            .spec-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 0.8rem;
            }
 
            .spec-item {
                background: rgba(30, 30, 30, 0.5);
                padding: 0.8rem;
                border-radius: 6px;
                border: 1px solid rgba(237, 28, 36, 0.2);
            }
 
            .spec-label {
                color: #cccccc;
                font-size: 0.8rem;
                display: block;
                margin-bottom: 0.3rem;
            }
 
            .spec-value {
                color: white;
                font-size: 1rem;
                font-weight: 500;
            }
 
            .remove-button {
                background: linear-gradient(45deg, #ED1C24, #ff4d4d);
                color: white;
                border: none;
                width: 100%;
                padding: 1rem;
                border-radius: 6px;
                margin-top: 1rem;
                cursor: pointer;
                transition: all 0.3s ease;
                text-transform: uppercase;
                letter-spacing: 1px;
                font-weight: 600;
            }
 
            .remove-button:hover {
                background: linear-gradient(45deg, #ff2d36, #ff6666);
                box-shadow: 0 0 15px rgba(237, 28, 36, 0.3);
            }
 
            @media (max-width: 768px) {
                .comparison-grid {
                    grid-template-columns: 1fr;
                }
 
                h2 {
                    font-size: 2rem;
                }
 
                .car-selector {
                    width: 90%;
                }
            }
        </style>
        <div class="comparison-container">
            <button class="back-button" id="backBtn">← Volver</button>
            <h2>Compara Vehículos</h2>
            <div class="car-selector">
                <select id="carSelect">
                    <option value="">Seleccionar vehículo para comparar</option>
                </select>
            </div>
            <div id="comparisonGrid" class="comparison-grid"></div>
        </div>
        `;
            // Agregar evento para el botón de volver
        this.shadowRoot.querySelector('#backBtn').addEventListener('click', () => {
            const buscarVehiculos = document.createElement('buscar-vehiculos');
            this.replaceWith(buscarVehiculos);
        });
        // Cargar los datos de vehículos
        this.fetchVehicles( );
    }
    // Método para obtener los datos de vehículos del archivo JSON
    async fetchVehicles() {
        try {
            const response = await fetch('../../../db.json');
            const data = await response.json();
            this.vehicles = data.vehiculos;
            this.populateSelect();
        } catch (error) {
            console.error("Error al cargar los datos de vehículos:", error);
        }
    }
     // Método para poblar el select con los vehículos disponibles
    populateSelect() {
        const carSelect = this.shadowRoot.getElementById("carSelect");
        carSelect.innerHTML = '<option value="">Seleccionar vehículo para comparar</option>';
        // Agregar evento de cambio al select
        carSelect.addEventListener("change", (event) => this.displayVehicleInfo(event.target.value));
        // Agregar opciones al select solo para vehículos no seleccionados
        this.vehicles.forEach(vehiculo => {
            if (!this.selectedCars.includes(vehiculo.id)) {
                const option = document.createElement("option");
                option.value = vehiculo.id;
                option.textContent = vehiculo.motor;
                carSelect.appendChild(option);
            }
        });
    }
    // Método para mostrar la información del vehículo seleccionado
    displayVehicleInfo(vehicleId) {
        if (!vehicleId) return;
        
        const selectedVehicle = this.vehicles.find(v => v.id === vehicleId);
        const container = this.shadowRoot.getElementById("comparisonGrid");
        // Si el vehículo existe y no está ya seleccionado
        if (selectedVehicle && !this.selectedCars.includes(vehicleId)) {
            this.selectedCars.push(vehicleId);
            // Crear tarjeta para el vehículo
            const card = document.createElement("div");
            card.classList.add("car-card");
            card.dataset.vehicleId = vehicleId;
            // Generar HTML para la tarjeta del vehículo
            card.innerHTML = /*html*/`
                <img src="${selectedVehicle.imagenVehiculo}" alt="${selectedVehicle.motor}" class="car-image">
                <div class="car-info">
                    <h3 class="car-title">${selectedVehicle.motor}</h3>
                     <!-- Sección de especificaciones generales -->
                    <div class="spec-section">
                        <h4 class="spec-title">Especificaciones</h4>
                        <div class="spec-grid">
                            <div class="spec-item">
                                <span class="spec-label">Velocidad Máxima</span>
                                <span class="spec-value">${selectedVehicle.velocidadMaximaKmh}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">0-100 km/h</span>
                                <span class="spec-value">${selectedVehicle.aceleracion0a100}</span>
                            </div>
                        </div>
                    </div>
            <!-- Sección de consumo de combustible -->
                    <div class="spec-section">
                        <h4 class="spec-title">Consumo de Combustible</h4>
                        <div class="spec-grid">
                            <div class="spec-item">
                                <span class="spec-label">Seco</span>
                                <span class="spec-value">${selectedVehicle.rendimiento.conduccionAgresiva.consumoCombustible.seco}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Lluvia</span>
                                <span class="spec-value">${selectedVehicle.rendimiento.conduccionAgresiva.consumoCombustible.lluvioso}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Extremo</span>
                                <span class="spec-value">${selectedVehicle.rendimiento.conduccionAgresiva.consumoCombustible.extremo}</span>
                            </div>
                        </div>
                    </div>
                    <!-- Sección de desgaste de neumáticos -->
                    <div class="spec-section">
                        <h4 class="spec-title">Desgaste de Neumáticos</h4>
                        <div class="spec-grid">
                            <div class="spec-item">
                                <span class="spec-label">Seco</span>
                                <span class="spec-value">${selectedVehicle.rendimiento.conduccionNormal.desgasteNeumaticos.seco}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Lluvia</span>
                                <span class="spec-value">${selectedVehicle.rendimiento.conduccionNormal.desgasteNeumaticos.lluvioso}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Extremo</span>
                                <span class="spec-value">${selectedVehicle.rendimiento.conduccionNormal.desgasteNeumaticos.extremo}</span>
                            </div>
                        </div>
                    </div>
 
                    <button class="remove-button">Eliminar Comparación</button>
                </div>
            `;
            // Agregar evento para eliminar la comparación
            const removeButton = card.querySelector('.remove-button');
            removeButton.addEventListener('click', () => {
                this.selectedCars = this.selectedCars.filter(id => id !== vehicleId);
                card.remove();
                this.populateSelect(); 
            });
            // Agregar la tarjeta al contenedor y actualizar el select
            container.appendChild(card);
            carSelect.value = "";
            this.populateSelect(); 
        }
    }
 }
 // Registrar el componente web personalizado
 customElements.define("comparar-vehiculos", CompararVehiculos);