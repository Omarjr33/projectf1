import { patchUsuarios, postUsuarios } from "../../Apis/usuariosApis.js";
import Swal from 'sweetalert2';

export class JuegoElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
        this.crearConfiguracion();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                --primary-bg: #1a1a1a;
                --secondary-bg: #2d2d2d;
                --input-bg: #333333;
                --text-primary: #ffffff;
                --text-secondary: #cccccc;
                --accent-color: #751010;
                --border-color: #404040;
                --hover-color: #8b1717;
                --error-color: #ef4444;
                --success-color: #10b981;
                display: block;
                min-height: 100vh;
                background: var(--primary-bg);
                color: var(--text-primary);
                font-family: 'Segoe UI', system-ui, sans-serif;
                padding: 2rem;
            }

            .game-container {
                max-width: 1200px;
                margin: 0 auto;
            }

            h1 {
                font-size: 2.5rem;
                text-align: center;
                margin-bottom: 2rem;
                color: var(--text-primary);
                text-transform: uppercase;
                letter-spacing: 2px;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            }

            .game-section {
                background: var(--secondary-bg);
                border-radius: 15px;
                padding: 2rem;
                margin-bottom: 2rem;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
                border: 1px solid var(--border-color);
                transition: transform 0.3s ease;
            }

            .game-section:hover {
                transform: translateY(-5px);
            }

            h2 {
                color: #ffffff;
                font-size: 1.8rem;
                margin-bottom: 1.5rem;
                border-bottom: 2px solid var(--border-color);
                padding-bottom: 0.5rem;
            }

            .form-group {
                margin-bottom: 1.5rem;
            }

            label {
                display: block;
                color: var(--text-secondary);
                margin-bottom: 0.5rem;
                font-size: 0.9rem;
                font-weight: 500;
            }

            select, input {
                width: 100%;
                padding: 0.75rem;
                background: var(--input-bg);
                border: 1px solid var(--border-color);
                border-radius: 8px;
                color: var(--text-primary);
                font-size: 1rem;
                transition: all 0.3s ease;
            }

            select:focus, input:focus {
                outline: none;
                border-color: var(--accent-color);
                box-shadow: 0 0 0 2px rgba(117, 16, 16, 0.2);
            }

            .info-card {
                background: var(--input-bg);
                border-radius: 8px;
                padding: 1.5rem;
                margin-top: 1rem;
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1.5rem;
                animation: fadeIn 0.3s ease;
            }

            .stat-group {
                background: var(--secondary-bg);
                padding: 1rem;
                border-radius: 8px;
                text-align: center;
                transition: transform 0.3s ease;
            }

            .stat-group:hover {
                transform: translateY(-2px);
            }

            .stat-label {
                color: var(--text-secondary);
                font-size: 0.8rem;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 0.5rem;
            }

            .stat-value {
                color: var(--text-primary);
                font-size: 1.5rem;
                font-weight: bold;
            }

            .configuration-controls {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1.5rem;
                margin-top: 2rem;
            }

            .control-group {
                background: var(--input-bg);
                padding: 1.5rem;
                border-radius: 8px;
            }

            .btn-submit {
                background: var(--accent-color);
                color: var(--text-primary);
                border: none;
                padding: 1rem 2rem;
                border-radius: 8px;
                font-size: 1.1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                display: block;
                width: 100%;
                max-width: 300px;
                margin: 2rem auto 0;
                text-transform: uppercase;
                letter-spacing: 1px;
            }

            .btn-submit:hover {
                background: var(--hover-color);
                transform: translateY(-2px);
            }

            .loading-indicator {
                text-align: center;
                padding: 2rem;
                color: var(--text-secondary);
                font-size: 1.2rem;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1rem;
            }

            .loading-indicator::after {
                content: '';
                width: 20px;
                height: 20px;
                border: 3px solid var(--accent-color);
                border-top-color: transparent;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }

            @keyframes spin {
                to { transform: rotate(360deg); }
            }

            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }

            .weather-selector {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 1rem;
                margin-top: 1rem;
            }

            .weather-option {
                background: var(--secondary-bg);
                padding: 1rem;
                border-radius: 8px;
                text-align: center;
                cursor: pointer;
                transition: all 0.3s ease;
                border: 2px solid transparent;
            }

            .weather-option:hover {
                border-color: var(--accent-color);
            }

            .weather-option.active {
                background: var(--accent-color);
                transform: scale(1.05);
            }

            .weather-icon {
                font-size: 2rem;
                margin-bottom: 0.5rem;
            }

            .performance-meter {
                height: 8px;
                background: var(--border-color);
                border-radius: 4px;
                margin-top: 0.5rem;
                overflow: hidden;
            }

            .performance-value {
                height: 100%;
                background: var(--accent-color);
                transition: width 0.3s ease;
            }

            .performance-stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 1rem;
                margin-top: 1rem;
            }

            .condition-group {
                background: var(--secondary-bg);
                padding: 1.5rem;
                border-radius: 8px;
                text-align: center;
            }

            .condition-group h3 {
                color: var(--text-secondary);
                font-size: 0.9rem;
                margin-bottom: 1rem;
            }

            .condition-value {
                font-size: 2rem;
                color: var(--text-primary);
                margin-bottom: 0.5rem;
            }

            @media (max-width: 768px) {
                :host {
                    padding: 1rem;
                }

                .game-section {
                    padding: 1.5rem;
                }

                .configuration-controls {
                    grid-template-columns: 1fr;
                }

                .weather-selector {
                    grid-template-columns: 1fr;
                }

                .info-card {
                    grid-template-columns: 1fr;
                }
            }

            /* Estilos para SweetAlert2 personalizado */
            .swal2-popup {
                background: var(--secondary-bg) !important;
                color: var(--text-primary) !important;
                border-radius: 15px !important;
            }

            .swal2-title {
                color: var(--text-primary) !important;
            }

            .swal2-html-container {
                color: var(--text-secondary) !important;
            }

            .swal2-confirm {
                background: var(--accent-color) !important;
            }

            .swal2-confirm:hover {
                background: var(--hover-color) !important;
            }
        </style>

        <div class="game-container">
            <h1>🏎️ Simulador de Carrera</h1>
            
            <form id="formCrearConfig">
                <div class="game-section">
                    <h2>Selección de Circuito</h2>
                    <div class="form-group">
                        <label for="circuitoSelect">Elige tu Circuito</label>
                        <select id="circuitoSelect" name="circuitoSelect" required>
                            <option value="">Seleccionar Circuito</option>
                        </select>
                    </div>
                    <div class="circuitosInfo"></div>
                </div>

                <div class="game-section">
                    <h2>Selección de Vehículo</h2>
                    <div class="form-group">
                        <label for="vehiculoSelect">Elige tu Vehículo</label>
                        <select id="vehiculoSelect" name="vehiculoSelect" required>
                            <option value="">Seleccionar Vehículo</option>
                        </select>
                    </div>
                    <div class="vehiculosInfo"></div>
                </div>

                <button id="btnJugar" type="submit" class="btn-submit">
                    Iniciar Simulación 🚥
                </button>
            </form>
            <div id="loadingIndicator" class="loading-indicator" style="display:none;">
                Cargando datos del simulador...
            </div>
        </div>
        `;

        this.addEventListeners();
        this.fetchData();
    }

    addEventListeners() {
        this.shadowRoot.querySelector('#btnJugar').addEventListener("click", (event) => this.crearConfiguracion(event));
    }

    async fetchData() {
        try {
            const loadingIndicator = this.shadowRoot.querySelector('#loadingIndicator');
            loadingIndicator.style.display = 'block';

            const response = await fetch('../../../db.json');
            const data = await response.json();

            loadingIndicator.style.display = 'none';

            this.populateCircuitoSelect(data.circuitos);
            this.populateVehiculoSelect(data.vehiculos);

            this.setupCircuitoListener(data.circuitos);
            this.setupVehiculoListener(data.vehiculos);

        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error de Carga',
                text: 'No se pudieron cargar los datos. Por favor, intenta nuevamente.',
                background: '#2d2d2d',
                color: '#ffffff'
            });
        }
    }

    populateCircuitoSelect(circuitos) {
        const circuitoSelect = this.shadowRoot.querySelector("#circuitoSelect");
        circuitos.forEach(circuito => {
            const option = document.createElement("option");
            option.value = circuito.id;
            option.textContent = circuito.nombreCircuito;
            circuitoSelect.appendChild(option);
        });
    }

    populateVehiculoSelect(vehiculos) {
        const vehiculoSelect = this.shadowRoot.querySelector("#vehiculoSelect");
        vehiculos.forEach(vehiculo => {
            const option = document.createElement("option");
            option.value = vehiculo.id;
            option.textContent = vehiculo.motor;
            vehiculoSelect.appendChild(option);
        });
    }

    setupCircuitoListener(circuitos) {
        const circuitoSelect = this.shadowRoot.querySelector("#circuitoSelect");
        const circuitosInfoDiv = this.shadowRoot.querySelector(".circuitosInfo");

        circuitoSelect.addEventListener("change", (e) => {
            const circuitoId = e.target.value;
            if (circuitoId) {
                const circuito = circuitos.find(c => c.id === circuitoId);
                this.displayCircuitoInfo(circuito, circuitosInfoDiv);
            } else {
                circuitosInfoDiv.innerHTML = '';
            }
        });
    }

    setupVehiculoListener(vehiculos) {
        const vehiculoSelect = this.shadowRoot.querySelector("#vehiculoSelect");
        const vehiculosInfoDiv = this.shadowRoot.querySelector(".vehiculosInfo");

        vehiculoSelect.addEventListener("change", (e) => {
            const vehiculoId = e.target.value;
            if (vehiculoId) {
                const vehiculo = vehiculos.find(v => v.id === vehiculoId);
                this.displayVehiculoInfo(vehiculo, vehiculosInfoDiv);
            } else {
                vehiculosInfoDiv.innerHTML = '';
            }
        });
    }

    displayCircuitoInfo(circuito, container) {
        if (circuito) {
            container.innerHTML = `
                <div class="info-card">
                    <div class="stat-group">
                        <div class="stat-label">Longitud</div>
                        <div class="stat-value">${circuito.longitud} km</div>
                        <input type="hidden" id="longitud" name="longitud" value="${circuito.longitud}">
                    </div>
                    <div class="stat-group">
                        <div class="stat-label">Vueltas</div>
                        <div class="stat-value">${circuito.vueltas}</div>
                        <input type="hidden" id="vueltas" name="vueltas" value="${circuito.vueltas}">
                    </div>
                    <div class="stat-group">
                        <div class="stat-label">Distancia Total</div><div class="stat-value">${(circuito.longitud * circuito.vueltas).toFixed(2)} km</div>
                    </div>
                </div>
            `;
        }
    }

    displayVehiculoInfo(vehiculo, container) {
        if (vehiculo) {
            container.innerHTML = `
                <label for="motor">Motor</label>
                <input type="text" id="motor" name="motor" value="${vehiculo.motor}">
                <label for="piloto">Piloto</label>
                <input type="text" id="piloto" name="piloto" value="${vehiculo.nombrePiloto}">
                <label for="velocidadMaxima">Velocidad Máxima</label>
                <input type="text" id="velocidadMaximaKmh" name="velocidadMaximaKmh" value="${vehiculo.velocidadMaximaKmh}" disabled>
                <label for="aceleracion">Aceleración</label>
                <input type="number" id="aceleracion" name="aceleracion" value="${vehiculo.aceleracion0a100}">
                <div class="form-group">
                    <label for="vehiculosRendimiento" class="form-label">Rendimiento Vehiculo</label>
                    <select id="vehiculoRendimiento">
                        <option selected>Seleccionar Rendimiento</option>
                        <option value="conduccionNormal">Conducción Normal</option>
                        <option value="conduccionAgresiva">Conducción Agresiva</option>
                        <option value="ahorroCombustible">Ahorro de Combustible</option>
                    </select>
                </div>
                <div class="vehiculosRendimiento"></div>
            `;

            const gestion = this.shadowRoot.getElementById("vehiculoRendimiento");
            const rendimientoDiv = this.shadowRoot.querySelector(".vehiculosRendimiento");

            gestion.addEventListener("change", () => {
                const selectedRendimiento = gestion.value;
                this.displayRendimientoInfo(vehiculo, selectedRendimiento, rendimientoDiv);
            });
        }
    }

    displayRendimientoInfo(vehiculo, rendimiento, container) {
        let velocidad;
        if (!rendimiento || !vehiculo.rendimiento[rendimiento]) {
            container.innerHTML = '';
            return;
        }

        if (rendimiento === "conduccionNormal") {
            velocidad = vehiculo.rendimiento[rendimiento].velocidadNormal;
        } else if (rendimiento === "conduccionAgresiva") {
            velocidad = vehiculo.rendimiento[rendimiento].velocidadAgresiva;
        } else if (rendimiento === "ahorroCombustible") {
            velocidad = vehiculo.rendimiento[rendimiento].velocidadPromedio;
        }

        container.innerHTML = `
            <div class="info-card">
                <div class="stat-group">
                    <div class="stat-label">Velocidad Media</div>
                    <div class="stat-value">${velocidad} km/h</div>
                    <input type="hidden" id="velocidad" name="velocidad" value="${velocidad}">
                </div>
            </div>

            <div class="control-group">
                <label>Condiciones Climáticas</label>
                <div class="weather-selector">
                    <div class="weather-option" data-clima="seco">
                        <div class="weather-icon">☀️</div>
                        <div>Seco</div>
                    </div>
                    <div class="weather-option" data-clima="lluvioso">
                        <div class="weather-icon">🌧️</div>
                        <div>Lluvioso</div>
                    </div>
                    <div class="weather-option" data-clima="extremo">
                        <div class="weather-icon">⛈️</div>
                        <div>Extremo</div>
                    </div>
                </div>
            </div>
            <div class="consumoCombustible"></div>
        `;

        const weatherOptions = container.querySelectorAll('.weather-option');
        const consumoDiv = container.querySelector(".consumoCombustible");

        weatherOptions.forEach(option => {
            option.addEventListener('click', () => {
                weatherOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                const clima = option.dataset.clima;
                this.displayConsumoCombustible(vehiculo, rendimiento, clima, consumoDiv);
            });
        });
    }

    displayConsumoCombustible(vehiculo, rendimiento, clima, container) {
        if (!clima || !vehiculo.rendimiento[rendimiento].consumoCombustible[clima]) {
            container.innerHTML = '';
            return;
        }

        const consumo = vehiculo.rendimiento[rendimiento].consumoCombustible[clima];
        const desgaste = vehiculo.rendimiento[rendimiento].desgasteNeumaticos[clima];

        container.innerHTML = `
            <div class="performance-stats">
                <div class="condition-group">
                    <h3>Consumo de Combustible</h3>
                    <div class="condition-value">${consumo} L/100km</div>
                    <input type="hidden" id="consumo" name="consumo" value="${consumo}">
                    <div class="performance-meter">
                        <div class="performance-value" style="width: ${(consumo/20) * 100}%"></div>
                    </div>
                </div>
                <div class="condition-group">
                    <h3>Desgaste de Neumáticos</h3>
                    <div class="condition-value">${desgaste}%</div>
                    <input type="hidden" id="desgaste" name="desgaste" value="${desgaste}">
                    <div class="performance-meter">
                        <div class="performance-value" style="width: ${desgaste}%"></div>
                    </div>
                </div>
            </div>
        `;
    }

    addEventListeners() {
        this.shadowRoot.querySelector('#formCrearConfig').addEventListener('submit', (e) => {
            e.preventDefault();
            this.crearConfiguracion(e);
        });
    }

    async crearConfiguracion(event) {
        event.preventDefault();
    
        const formCrearConfig = this.shadowRoot.querySelector('#formCrearConfig');
        const formData = new FormData(formCrearConfig);
        
        const datos = {
            circuitoSelect: formData.get('circuitoSelect'),
            vehiculoSelect: formData.get('vehiculoSelect'),
            vueltas: formData.get('vueltas'),
            longitud: formData.get('longitud'),
            aceleracion: formData.get('aceleracion'),
            velocidadMaximaKmh: formData.get('velocidadMaximaKmh'),
            velocidad: formData.get('velocidad'),
            consumo: formData.get('consumo'),
            desgaste: formData.get('desgaste'),
            nombrePiloto: formData.get('piloto'),
            motor: formData.get('motor'),
        };

        if (!this.validarDatos(datos)) {
            return;
        }
    
        const usuario = {
            configuracion: {
                circuito: datos.circuitoSelect,
                vehiculo: datos.vehiculoSelect,
                vueltas: datos.vueltas,
                longitud: datos.longitud,
                aceleracion: datos.aceleracion,
                velocidadMaximaKmh: datos.velocidadMaximaKmh,
                velocidad: datos.velocidad,
                consumo: datos.consumo,
                desgaste: datos.desgaste,
                piloto: datos.nombrePiloto,
                motor: datos.motor,
            }
        };
        
        try {
            const response = await patchUsuarios(usuario, window.idUser);
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            
            await Swal.fire({
                icon: 'success',
                title: '¡Configuración Lista!',
                text: '¡Prepárate para la carrera!',
                confirmButtonText: '¡Vamos!',
                background: '#2d2d2d',
                color: '#ffffff',
                confirmButtonColor: '#751010'
            });
    
            formCrearConfig.reset();
            this.limpiarSelecciones();
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo guardar la configuración',
                background: '#2d2d2d',
                color: '#ffffff'
            });
        }
    }    
}

customElements.define("juego-element", JuegoElement);