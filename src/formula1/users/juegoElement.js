import { postJuegos } from "../../Apis/juegoApis.js";
import Swal from 'sweetalert2';

class Circuit {
    constructor(name, laps, length, weather) {
        this.name = name;
        this.laps = laps;
        this.length = length;
        this.weather = weather;
    }
}

class Car {
    constructor(acceleration, maxSpeed, normalSpeed) {
        this.acceleration = acceleration;
        this.maxSpeed = maxSpeed;
        this.normalSpeed = normalSpeed;
        this.fuelConsumption = {
            seco: 1.9,
            lluvioso: 2.1,
            extremo: 2.4
        };
        this.tireWear = {
            seco: 1.5,
            lluvioso: 0.8,
            extremo: 2.5
        };
    }
}

class Driver {
    constructor(name, number, car) {
        this.name = name;
        this.number = number;
        this.car = car;
        this.lapTimes = [];
        this.totalTime = 0;
    }
}

class SingleDriverRace {
    constructor(circuit, driver) {
        this.circuit = circuit;
        this.driver = driver;
    }

    calculateLapTime() {
        const baseTime = (this.circuit.length / this.driver.car.normalSpeed) * 3600;
        const currentLap = this.driver.lapTimes.length + 1;
        const weatherEffect = {
            seco: 1,
            lluvioso: 1.2,
            extremo: 1.4
        }[this.circuit.weather];
        
        const tireWear = this.driver.car.tireWear[this.circuit.weather] * (currentLap / this.circuit.laps);
        const fuelEffect = this.driver.car.fuelConsumption[this.circuit.weather] * (currentLap / this.circuit.laps);
        const randomFactor = 0.95 + Math.random() * 0.1;

        return baseTime * weatherEffect * (1 + tireWear) * (1 + fuelEffect) * randomFactor;
    }

    simulate() {
        this.driver.lapTimes = [];
        this.driver.totalTime = 0;

        for (let lap = 1; lap <= this.circuit.laps; lap++) {
            const lapTime = this.calculateLapTime();
            this.driver.lapTimes.push(lapTime);
            this.driver.totalTime += lapTime;
        }
    }

    getResults() {
        const formatTime = (seconds) => {
            const mins = Math.floor(seconds / 60);
            const secs = (seconds % 60).toFixed(3);
            return `${mins}:${secs.padStart(6, '0')}`;
        };

        return {
            driverName: this.driver.name,
            number: this.driver.number,
            totalTime: formatTime(this.driver.totalTime),
            lapTimes: this.driver.lapTimes.map((time, index) => ({
                lap: index + 1,
                time: formatTime(time)
            }))
        };
    }
}

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
            <div id="juegoSimulacion"></div>
        </div>
        `;

        this.addEventListeners();
        this.fetchData();
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
                <div class="info-card">
                    <div class="stat-group">
                        <div class="stat-label">Motor</div>
                        <div class="stat-value">${vehiculo.motor}</div>
                        <input type="hidden" id="motor" name="motor" value="${vehiculo.motor}">
                    </div>
                    <div class="stat-group">
                        <div class="stat-label">Piloto</div>
                        <div class="stat-value">${vehiculo.nombrePiloto}</div>
                        <input type="hidden" id="piloto" name="piloto" value="${vehiculo.nombrePiloto}">
                    </div>
                    <div class="stat-group">
                        <div class="stat-label">Velocidad Máxima</div>
                        <div class="stat-value">${vehiculo.velocidadMaximaKmh} km/h</div>
                        <input type="hidden" id="velocidadMaximaKmh" name="velocidadMaximaKmh" value="${vehiculo.velocidadMaximaKmh}">
                    </div>
                    <div class="stat-group">
                        <div class="stat-label">Aceleración 0-100</div>
                        <div class="stat-value">${vehiculo.aceleracion0a100}s</div>
                        <input type="hidden" id="aceleracion" name="aceleracion" value="${vehiculo.aceleracion0a100}">
                    </div>
                </div>

                <div class="configuration-controls">
                    <div class="control-group">
                        <label for="vehiculoRendimiento">Estilo de Conducción</label>
                        <select id="vehiculoRendimiento" class="styled-select">
                            <option value="">Seleccionar Estilo</option>
                            <option value="conduccionNormal">🚗 Normal</option>
                            <option value="conduccionAgresiva">🏎️ Agresivo</option>
                            <option value="ahorroCombustible">🌱 Eco</option>
                        </select>
                    </div>
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

    postJuegos = async (datos, idUser) => {
        try {
            const response = await fetch(`/juegos/${idUser}`, {  // Aquí usamos el idUser correctamente
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Otros encabezados que puedas necesitar
                },
                body: JSON.stringify(datos), // Asegúrate de que `datos` esté bien formateado
            });
    
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
    
            return await response.json();  // Retorna la respuesta en formato JSON
        } catch (error) {
            console.error('Error en la solicitud POST:', error.message);
            return { error: error.message };  // Retorna el error de forma controlada
        }
    };    

    async crearConfiguracion(e) {
        e.preventDefault();
        
        try {
            const formCrearConfig = this.shadowRoot.querySelector('#formCrearConfig');
            const formData = new FormData(formCrearConfig);
            
            // Create countdown container
            const countdownContainer = document.createElement('div');
            countdownContainer.classList.add('race-countdown');
            countdownContainer.innerHTML = `
                <style>
                    .race-countdown {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.9);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        z-index: 1000;
                        font-family: 'monserrat', ;
                    }

                    .countdown-number {
                        font-size: 20vw;
                        color: #ff0000;
                        opacity: 0;
                        animation: countdownAnimation 1s forwards;
                        text-shadow: 0 0 50px rgba(255, 0, 0, 0.5);
                    }

                    .countdown-text {
                        position: absolute;
                        bottom: 20%;
                        font-size: 4vw;
                        color: white;
                        opacity: 0;
                        animation: fadeInText 1s 3s forwards;
                    }

                    @keyframes countdownAnimation {
                        0% { 
                            opacity: 0; 
                            transform: scale(5); 
                        }
                        50% { 
                            opacity: 1; 
                            transform: scale(1.2);
                        }
                        100% { 
                            opacity: 1; 
                            transform: scale(1);
                        }
                    }

                    @keyframes fadeInText {
                        from { 
                            opacity: 0; 
                            transform: translateY(50px);
                        }
                        to { 
                            opacity: 1; 
                            transform: translateY(0);
                        }
                    }

                    .race-start-sound {
                        position: absolute;
                        top: -9999px;
                        left: -9999px;
                    }
                </style>
                <audio class="race-start-sound">
                    <source src="src/audio/f1-start.mp3" type="audio/mpeg">
                </audio>
                <div class="countdown-number">3</div>
                <div class="countdown-text">Simulacion terminada</div>
            `;
            
            // Add countdown to body
            document.body.appendChild(countdownContainer);
            
            // Play start sound
            const startSound = countdownContainer.querySelector('.race-start-sound');
            startSound.play();

            // Countdown animation
            const countdownElement = countdownContainer.querySelector('.countdown-number');
            const countdownSequence = ['3', '2', '1', 'GO!'];
            
            for (let i = 1; i < countdownSequence.length; i++) {
                await new Promise(resolve => {
                    setTimeout(() => {
                        countdownElement.textContent = countdownSequence[i];
                        countdownElement.style.animation = 'none';
                        void countdownElement.offsetWidth; // Trigger reflow
                        countdownElement.style.animation = 'countdownAnimation 1s forwards';
                        resolve();
                    }, 1000);
                });
            }

            // Remove countdown after GO!
            await new Promise(resolve => {
                setTimeout(() => {
                    document.body.removeChild(countdownContainer);
                    resolve();
                }, 1000);
            });
            
            // Recopilar datos del formulario
            const datos = {
                circuitoSelect: formData.get('circuitoSelect'),
                vehiculoSelect: formData.get('vehiculoSelect'),
                vueltas: parseInt(formData.get('vueltas')),
                longitud: parseFloat(formData.get('longitud')),
                aceleracion: parseFloat(formData.get('aceleracion')),
                velocidadMaximaKmh: parseFloat(formData.get('velocidadMaximaKmh')),
                velocidad: parseFloat(formData.get('velocidad')),
                consumo: parseFloat(formData.get('consumo')),
                desgaste: parseFloat(formData.get('desgaste')),
                nombrePiloto: formData.get('piloto'),
                motor: formData.get('motor'),
            };
            
            // Validación de datos
            if (!this.validarDatos(datos)) {
                throw new Error('Datos inválidos');
            }
            
            // Configuración del clima
            const weatherOption = this.shadowRoot.querySelector('.weather-option.active');
            const clima = weatherOption ? weatherOption.dataset.clima : 'seco';
            
            // Crear instancias para la simulación
            const circuit = new Circuit(
                datos.circuitoSelect,
                datos.vueltas,
                datos.longitud,
                clima
            );
            
            const car = new Car(
                datos.aceleracion,
                datos.velocidadMaximaKmh,
                datos.velocidad
            );
            
            const driver = new Driver(datos.nombrePiloto, 1, car);
            const race = new SingleDriverRace(circuit, driver);

            // Simular la carrera
            race.simulate();
            const results = race.getResults();
            const juegoSimulacion = this.shadowRoot.querySelector('#juegoSimulacion');
            // Mostrar resultados
            juegoSimulacion.innerHTML = `
                <style>
  @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }

        @keyframes slideIn {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
        }

        @keyframes glow {
            0% { box-shadow: 0 0 5px #ff0000; }
            50% { box-shadow: 0 0 20px #ff0000; }
            100% { box-shadow: 0 0 5px #ff0000; }
        }

        @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }

        @keyframes bounceIn {
            0% { transform: scale(0.3); opacity: 0; }
            50% { transform: scale(1.05); }
            70% { transform: scale(0.9); }
            100% { transform: scale(1); opacity: 1; }
        }

        @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
        }

        .circuit-section {
            margin-top: 40px;
            background: rgba(34, 34, 34, 0.5);
            border-radius: 15px;
            padding: 20px;
            animation: fadeIn 1s ease-out;
        }

        .circuit-grid {
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 20px;
        }

        .circuit-image-container {
            position: relative;
            overflow: hidden;
            border-radius: 10px;
            aspect-ratio: 16/9;
        }

        .circuit-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
        }

        .circuit-image-container:hover .circuit-image {
            transform: scale(1.1);
        }

        .circuit-data {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
        }

        .circuit-stat {
            background: rgba(0, 0, 0, 0.3);
            padding: 15px;
            border-radius: 8px;
            transition: all 0.3s ease;
            animation: fadeIn 0.5s ease-out;
        }

        .circuit-stat:hover {
            background: rgba(255, 215, 0, 0.1);
            transform: translateY(-5px);
        }

        .stat-value {
            font-size: 24px;
            font-weight: bold;
            color: #ffffff;
            margin-top: 5px;
        }

        .circuit-name {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 20px;
            color: #ff0000;
            grid-column: 1 / -1;
            animation: slideInRight 1s ease-out;
        }

        .animated-border {
            position: relative;
        }

        .animated-border::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            border: 2px solid transparent;
            border-radius: 8px;
            animation: borderGlow 2s infinite;
        }

        @keyframes borderGlow {
            0% { border-color: transparent; }
            50% { border-color: #ff0000; }
            100% { border-color: transparent; }
        }

        .loading-indicator {
            width: 50px;
            height: 50px;
            border: 3px solid #333;
            border-top: 3px solid #ff0000;
            border-radius: 50%;
            animation: rotate 1s linear infinite;
            margin: 20px auto;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Inter', sans-serif;
        }

        body {
            background-color: #1a1a1a;
            color: white;
            padding: 20px;
            line-height: 1.2;
        }

        .dashboard {
            max-width: 1200px;
            margin: 100px auto;
            animation: fadeIn 1s ease-out;
        }

        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 20px;
            align-items: center;
            justify-content: space-around;
            
        }

        .label {
            color: #666;
            font-size: 12px;
            margin-bottom: 5px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .position {
            font-size: 70px;
            font-weight: 800;
            line-height: 1;
            animation: pulse 2s infinite;
        }

        .gap {
            color: #ff0000;
            font-weight: 600;
            animation: fadeIn 1s ease-out;
        }

        .lap-times {
            margin-top: 30px;
        }

        .speed {
            margin-top: 30px;
        }

        .speed-value {
            font-size: 72px;
            font-weight: 800;
            line-height: 1;
            animation: fadeIn 1.5s ease-out;
        }

        .speed-unit {
            color: #666;
            font-size: 14px;
        }

        .car-view {
            position: relative;
            background: linear-gradient(180deg, #222 0%, #1a1a1a 100%);
            height: 400px;
            border-radius: 10px;
            overflow: hidden;
            transition: all 0.3s ease;
            cursor: pointer;
        }

        .car-image-container {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.5s ease;
        }

        .car-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
        }

        .driver-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%);
            opacity: 0;
            transition: opacity 0.3s ease;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 20px;
            color: white;
            z-index: 10;
        }

        .car-view:hover .driver-overlay {
            opacity: 1;
        }

        .car-view:hover .car-image {
            transform: scale(1.1);
        }

        .team-logo {
            width: 80px;
            height: auto;
            margin-bottom: 10px;
        }

        .driver-overlay-name {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 5px;
            color: #ffffff;
        }

        .driver-overlay-team {
            font-size: 16px;
            opacity: 0.8;
        }

        .driver-image {
            position: absolute;
            top: 20px;
            right: 20px;
            width: 60%;
            border-radius: 50%;
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.3s ease;
        }

        .car-view:hover .driver-image {
            opacity: 1;
            transform: translateY(0);
        }

        .controls {
            position: absolute;
            bottom: 20px;
            width: 100%;
            padding: 0 20px;
        }

        .bar {
            background: rgba(51, 51, 51, 0.5);
            height: 8px;
            border-radius: 4px;
            margin: 10px 0;
            overflow: hidden;
        }

        .bar-fill {
            height: 100%;
            border-radius: 4px;
            transition: width 0.3s ease-out;
        }

        .brakes .bar-fill {
            background: #ff0000;
            animation: slideIn 1s ease-out;
        }

        .throttle .bar-fill {
            background: white;
            animation: slideIn 1.2s ease-out;
        }

        .driver-info {
            text-align: right;
            animation: fadeIn 1s ease-out;
        }

        .driver-name {
            color: #ff0000;
            font-size: 24px;
            font-weight: 800;
            letter-spacing: -0.5px;
        }

        .driver-number {
            color: #ff0000;
            font-size: 32px;
            font-weight: 800;
            animation: pulse 2s infinite;
        }

        .coords {
            margin-top: 30px;
            animation: fadeIn 1.5s ease-out;
        }

        .safety-car {
            margin-top: 30px;
        }

        .safety-message {
            color: #ffffff;
            font-weight: 600;
            animation: glow 2s infinite;
        }

        .battery-fuel .bar {
            margin: 20px 0;
        }

        .battery .bar-fill {
            background: #ff0000;
            animation: slideIn 1.4s ease-out;
        }

        .fuel .bar-fill {
            background: white;
            animation: slideIn 1.6s ease-out;
        }

        .pit-window {
            background: #ff0000;
            color: black;
            padding: 5px 15px;
            display: inline-block;
            margin-top: 10px;
            border-radius: 4px;
            font-weight: 600;
            animation: pulse 2s infinite;
        }

        .tire-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-top: 15px;
        }

        .tire {
            text-align: center;
            animation: fadeIn 2s ease-out;
        }

        .tire-pressure {
            font-size: 12px;
            margin-bottom: 5px;
            color: #999;
        }

        .tire-life {
            background: rgba(51, 51, 51, 0.5);
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            font-weight: 600;
            transition: all 0.3s ease;
        }

        .tire-life:hover {
            transform: scale(1.1);
            background: rgba(255, 0, 0, 0.2);
        }

        .laps-circle {
            width: 120px;
            height: 120px;
            border: 4px solid #333;
            border-radius: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 20px auto 0;
            transition: all 0.3s ease;
            animation: fadeIn 2s ease-out;
        }

        .laps-circle:hover {
            border-color: #ff0000;
            transform: scale(1.1);
        }

        .laps-number {
            font-size: 36px;
            font-weight: 800;
        }

        .laps-label {
            color: #666;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .highlight {
            position: relative;
            overflow: hidden;
        }

        .highlight::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(
                45deg,
                transparent,
                rgba(255, 0, 0, 0.1),
                transparent
            );
            transform: rotate(45deg);
            animation: shine 3s infinite;
        }

        @keyframes shine {
            0% { transform: translateX(-100%) rotate(45deg); }
            100% { transform: translateX(100%) rotate(45deg); }
        }
</style>

<div id="juegoSimulacion">
  <div class="dashboard">
    <div class="grid">
      <div>
        <div class="label">POSICION</div>
        <div class="position">1</div>
        <div class="lap-times">
          <div>
            <div class="label">Aceleración</div>
            <div>${datos.aceleracion}</div>
          </div>
          <div>
            <div class="label">Velocidad Máxima</div>
            <div>${datos.velocidadMaximaKmh}</div>
          </div>
        </div>
        <div class="speed">
          <div class="label">Desgaste Neumáticos</div>
          <div class="speed-value">${datos.desgaste}</div>
        </div>
      </div>
      <div class="car-view highlight">
        <div class="car-image-container">
          <img src="src/img/img2.png" class="car-image" alt="F1 Car">
        </div>
        <div class="driver-overlay">
          <img src="src/img/liam-lawson.b09c773d.png" class="driver-image" alt="${results.driverName}">
          <img src="src/img/f1.png" class="team-logo" alt="${results.team}">
          <div class="driver-overlay-name">${results.driverName}</div>
          <div class="driver-overlay-team">${results.team}</div>
        </div>
      </div>
      <div>
        <div class="driver-info">
          <div class="label">PILOTO</div>
          <div class="driver-name">${results.driverName.toUpperCase()}</div>
          <div class="driver-number">${circuit.laps}</div>
        </div>
        <div class="safety-car">
          <div class="label">Consumo Combustible</div>
          <div class="safety-message">${datos.consumo}</div>
        </div>
      </div>
    </div>
    <div class="grid bottom-grid">
      <div>
        <div class="label">VUELTAS COMPLETADAS</div>
        <div class="laps-circle">
          <div class="laps-number">${circuit.laps}</div>
          <div class="laps-label">VUELTAS</div>
        </div>
      </div>
      <div>
        <div class="label">TIEMPO TOTAL</div>
        <div class="laps-circle">
          <div class="laps-number">${results.totalTime}</div>
        </div>
      </div>
    </div>
    <div class="circuit-section">
      <div class="circuit-grid">
        <div class="circuit-image-container animated-border">
          <img src="src/img/circuito1.png" alt="${circuit.name} Layout" class="circuit-image">
        </div>
        <div class="circuit-data">
          <div class="circuit-name">${circuit.name}</div>
          <div class="circuit-stat">
            <div class="label">LONGITUD</div>
            <div class="stat-value">${circuit.length} km</div>
          </div>
          <div class="circuit-stat">
            <div class="label">VUELTAS</div>
            <div class="stat-value">${circuit.laps}</div>
          </div>
          <div class="circuit-stat"> 
            <div class="label">DISTANCIA TOTAL</div>
            <div class="stat-value">${circuit.length * circuit.laps} km</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
            `;
    
            const usuario = {
                idUser: idUser,
                configuracion: [
                    { ...datos }
                ],
                resultados: [
                    { ...results }
                ]
            };
    
            // Verificar que idUser esté disponible antes de enviarlo
            if (!window.idUser) {
                throw new Error("ID de usuario no disponible");
            }
    
            // Enviar la configuración y resultados del usuario
            const response = await postJuegos(usuario, window.idUser);
    
            // Verificar si la respuesta fue exitosa
            if (response && response.error) {
                throw new Error(response.error);  // Lanzar error si existe un error en la respuesta
            }
            
            // Limpiar formulario después de éxito
            formCrearConfig.reset();
            this.limpiarSelecciones();
            
            // Mostrar mensaje de éxito
            await Swal.fire({
                icon: 'success',
                title: '¡Carrera Terminada!',
                text: 'Se ha guardado tu historial de jugadas',
                background: '#2d2d2d',
                color: '#ffffff',
                confirmButtonColor: '#751010'
            });

            
        } catch (error) {
            console.error('Error:', error);
            
            // Mostrar mensaje de error
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo guardar la configuración: ' + error.message,
                background: '#2d2d2d',
                color: '#ffffff',
                confirmButtonColor: '#751010'
            });
        }
    }
    

    validarDatos(datos) {
        if (!datos.circuitoSelect || !datos.vehiculoSelect) {
            Swal.fire({
                icon: 'warning',
                title: 'Configuración Incompleta',
                text: 'Por favor, selecciona un circuito y un vehículo',
                background: '#2d2d2d',
                color: '#ffffff'
            });
            return false;
        }

        if (!datos.velocidad || !datos.consumo || !datos.desgaste) {
            Swal.fire({
                icon: 'warning',
                title: 'Configuración Incompleta',
                text: 'Por favor, selecciona el estilo de conducción y las condiciones climáticas',
                background: '#2d2d2d',
                color: '#ffffff'
            });
            return false;
        }

        return true;
    }

    limpiarSelecciones() {
        this.shadowRoot.querySelector('.circuitosInfo').innerHTML = '';
        this.shadowRoot.querySelector('.vehiculosInfo').innerHTML = '';
    }
}

customElements.define("juego-element", JuegoElement);
