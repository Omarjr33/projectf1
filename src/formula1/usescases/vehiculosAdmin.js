import { deleteVehiculos, getVehiculos, patchVehiculos, postVehiculos } from "../../Apis/vehiculosApis.js";
import Swal from 'sweetalert2';

export class VehiculosAdmin extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentStep = 1;
        this.render();
        this.setupEventListeners();
        this.addEventListeners();
    }

    setupEventListeners() {
        this.shadowRoot.addEventListener('click', (e) => {
            if (e.target.matches('.next-step')) {
                this.nextStep();
            }
            if (e.target.matches('.prev-step')) {
                this.prevStep();
            }
        });
    }

    nextStep() {
        if (this.currentStep < 5) {
            const currentSection = this.shadowRoot.querySelector(`[data-step="${this.currentStep}"]`);
            const nextSection = this.shadowRoot.querySelector(`[data-step="${this.currentStep + 1}"]`);
            
            currentSection.style.display = 'none';
            nextSection.style.display = 'block';
            
            this.currentStep++;
            this.updateProgressBar();
        }
    }

    prevStep() {
        if (this.currentStep > 1) {
            const currentSection = this.shadowRoot.querySelector(`[data-step="${this.currentStep}"]`);
            const prevSection = this.shadowRoot.querySelector(`[data-step="${this.currentStep - 1}"]`);
            
            currentSection.style.display = 'none';
            prevSection.style.display = 'block';
            
            this.currentStep--;
            this.updateProgressBar();
        }
    }

    updateProgressBar() {
        const progress = this.shadowRoot.querySelector('.progress-bar');
        const percentage = ((this.currentStep - 1) / 4) * 100;
        progress.style.width = `${percentage}%`;
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                --primary-bg: #1e1e1e;
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
                font-family: 'Inter', system-ui, -apple-system, sans-serif;
            }

            /* Card Grid Layout */
            #vehiculosCards {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 2rem;
                padding: 2rem 0;
            }

            /* Vehicle Card Styles */
            #card__listar {
                background: var(--secondary-bg);
                border-radius: 15px;
                overflow: hidden;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
                border: 1px solid var(--border-color);
            }

            #card__listar:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
            }

            #card__listar img {
                width: 100%;
                height: 200px;
                object-fit: cover;
                border-bottom: 1px solid var(--border-color);
            }

            .card__content {
                padding: 1.5rem;
            }

            .card__title {
                font-size: 1.5rem;
                color: var(--text-primary);
                margin-bottom: 0.5rem;
            }

            .card__pais, .card__motor {
                color: var(--text-secondary);
                margin: 0.5rem 0;
                font-size: 1rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .card__actions {
                display: flex;
                gap: 1rem;
                padding: 1rem 1.5rem;
                background: rgba(0, 0, 0, 0.1);
            }

            /* Button Styles */
            .btnEditarForm, .btnEliminar, .btn-submit, .step-btn {
                padding: 0.75rem 1.5rem;
                border: none;
                border-radius: 8px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 0.9rem;
                text-align: center;
                min-width: 120px;
            }

            .btn-submit, .step-btn.next-step {
                background: var(--accent-color);
                color: white;
            }

            .step-btn.prev-step {
                background: var(--secondary-bg);
                border: 1px solid var(--border-color);
                color: var(--text-primary);
            }

            .btnEditarForm {
                background: var(--accent-color);
                color: white;
            }

            .btnEliminar {
                background: #dc2626;
                color: white;
            }

            .btnEditarForm:hover, .btn-submit:hover, .step-btn.next-step:hover {
                background: var(--hover-color);
                transform: translateY(-2px);
            }

            .step-btn.prev-step:hover {
                background: var(--input-bg);
                transform: translateY(-2px);
            }

            .btnEliminar:hover {
                background: #b91c1c;
                transform: translateY(-2px);
            }

            /* Form Styles */
            form {
                background: var(--secondary-bg);
                padding: 2.5rem;
                border-radius: 15px;
                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
                margin: 2rem auto;
                max-width: 800px;
                position: relative;
                overflow: hidden;
            }

            .form-group {
                margin-bottom: 1.5rem;
            }

            .form-label {
                display: block;
                margin-bottom: 0.5rem;
                color: var(--text-secondary);
                font-weight: 500;
                font-size: 0.9rem;
            }

            .form-control, .form-select {
                width: 100%;
                padding: 0.75rem 1rem;
                border: 1px solid var(--border-color);
                border-radius: 8px;
                background: var(--input-bg);
                color: var(--text-primary);
                transition: all 0.3s ease;
                font-size: 1rem;
            }

            .form-control:focus, .form-select:focus {
                border-color: var(--accent-color);
                outline: none;
                box-shadow: 0 0 0 3px rgba(117, 16, 16, 0.2);
            }

            .form-select {
                appearance: none;
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ffffff'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
                background-repeat: no-repeat;
                background-position: right 1rem center;
                background-size: 1em;
                padding-right: 2.5rem;
            }

            /* Progress Bar */
            .progress-bar-container {
                background: var(--input-bg);
                height: 6px;
                border-radius: 3px;
                margin: 2rem 0;
                overflow: hidden;
            }

            .progress-bar {
                background: linear-gradient(90deg, var(--accent-color), var(--hover-color));
                height: 100%;
                transition: width 0.3s ease;
            }

            /* Step Navigation */
            .step-navigation {
                display: flex;
                justify-content: space-between;
                margin-top: 2rem;
                padding-top: 1.5rem;
                border-top: 1px solid var(--border-color);
                gap: 1rem;
            }

            /* Headings */
            h2, h3 {
                color: var(--text-primary);
                margin-bottom: 1.5rem;
            }

            h2 {
                font-size: 1.8rem;
                font-weight: 600;
                text-align: center;
                letter-spacing: -0.025em;
            }

            h3 {
                font-size: 1.4rem;
                padding-bottom: 1rem;
                border-bottom: 2px solid var(--border-color);
            }

            /* Section Groups */
            .section-group {
                background: rgba(0, 0, 0, 0.1);
                border-radius: 8px;
                padding: 1.5rem;
                margin-bottom: 1.5rem;
            }

            .section-group h4 {
                color: var(--text-secondary);
                margin-bottom: 1rem;
                font-size: 1.1rem;
                font-weight: 500;
            }

            /* Status Message */
            .status-message {
                padding: 1rem;
                border-radius: 8px;
                margin-top: 1rem;
                text-align: center;
                display: none;
                animation: slideIn 0.3s ease;
            }

            .status-message.success {
                background: var(--success-color);
                color: white;
            }

            .status-message.error {
                background: var(--error-color);
                color: white;
            }

            /* Vehicles Container */
            .vehicles-container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 2rem;
            }

            /* List Header */
            .list-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 2rem;
                background: var(--secondary-bg);
                padding: 1.5rem;
                border-radius: 12px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }

            #btnListarVehiculos {
                background: var(--accent-color);
                color: white;
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                font-size: 1.5rem;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            #btnListarVehiculos:hover {
                background: var(--hover-color);
                transform: translateY(-2px);
            }

            /* Form sections */
            .step-section {
                display: none;
                animation: fadeIn 0.5s ease;
            }

            .step-section[data-step="1"] {
                display: block;
            }

            /* Animations */
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @keyframes slideIn {
                from {
                    transform: translateY(-100%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }

            /* Responsive Design */
            @media (max-width: 768px) {
                .vehicles-container {
                    padding: 1rem;
                }

                form {
                    padding: 1.5rem;
                    margin: 1rem;
                }

                #vehiculosCards {
                    grid-template-columns: 1fr;
                    gap: 1rem;
                    padding: 1rem;
                }

                .card__actions {
                    flex-direction: column;
                }

                .step-navigation {
                    flex-direction: column;
                }

                .btnEditarForm, .btnEliminar, .btn-submit, .step-btn {
                    width: 100%;
                }

                .list-header {
                    flex-direction: column;
                    gap: 1rem;
                    text-align: center;
                }
            }
        </style>

        <div class="vehicles-container">
            <form id="formCrearVehiculo">
                <div class="steps-container">
                    <h2>Registro de Vehículo</h2>
                    <div class="progress-bar-container">
                        <div class="progress-bar"></div>
                    </div>
                </div>

                <!-- Step 1: Información Básica -->
                <div class="step-section" data-step="1">
                    <h3>Información Básica</h3>
                    <div class="form-group">
                        <label class="form-label" for="imagenVehiculo">Imagen (URL)</label>
                        <input type="url" class="form-control" id="imagenVehiculo" name="imagenVehiculo" placeholder="URL de la imagen">
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="motor">Motor</label>
                        <input type="text" class="form-control" name="motor" id="motor" placeholder="Especificaciones del motor">
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="modelo">Modelo</label>
                        <input type="text" class="form-control" id="modelo" name="modelo" placeholder="Modelo del vehículo">
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="equipoPiloto">Equipo</label>
                        <select class="form-select" id="equipoPilotoVeh" name="equipoPiloto">
                            <option value="">Seleccionar Equipo</option>
                        </select>
                    </div>
                    <div class="step-navigation">
                        <button type="button" class="step-btn next-step">Siguiente</button>
                    </div>
                </div>

                <!-- Step 2: Información Adicional -->
                <div class="step-section" data-step="2">
                    <h3>Información Adicional</h3>
                    <div class="form-group">
                        <label class="form-label" for="nombrePiloto">Piloto</label>
                        <select class="form-select" id="nombrePilotoVeh" name="nombrePiloto">
                            <option value="">Seleccionar Piloto</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="velocidad_maxima_kmh">Velocidad Máxima (km/h)</label>
                        <input type="number" class="form-control" id="velocidad_maxima_kmh" name="velocidad_maxima_kmh">
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="aceleracion_0_100">Aceleración (0-100 km/h)</label>
                        <input type="number" class="form-control" id="aceleracion_0_100" name="aceleracion_0_100" step="0.1">
                    </div>
                    <div class="step-navigation">
                        <button type="button" class="step-btn prev-step">Anterior</button>
                        <button type="button" class="step-btn next-step">Siguiente</button>
                    </div>
                </div>

                <!-- Step 3: Conducción Normal -->
                <div class="step-section" data-step="3">
                    <h3>Conducción Normal</h3>
                    <div class="form-group">
                        <label class="form-label" for="velocidad_normal">Velocidad Promedio (km/h)</label>
                        <input type="number" class="form-control" id="velocidad_normal" name="velocidad_normal">
                    </div>
                    
                    <div class="section-group">
                        <h4>Consumo de Combustible</h4>
                        <div class="form-group">
                            <label class="form-label" for="seco_normal">Condición Seca (L/100km)</label>
                            <input type="number" class="form-control" id="seco_normal" name="seco_normal" step="0.1">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="lluvioso_normal">Condición Lluviosa (L/100km)</label>
                            <input type="number" class="form-control" id="lluvioso_normal" name="lluvioso_normal" step="0.1">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="extremo_normal">Condición Extrema (L/100km)</label>
                            <input type="number" class="form-control" id="extremo_normal" name="extremo_normal" step="0.1">
                        </div>
                    </div>
                    
                    <div class="section-group">
                        <h4>Desgaste de Neumáticos (%)</h4>
                        <div class="form-group">
                            <label class="form-label" for="seco_neumaticos">Condición Seca</label>
                            <input type="number" class="form-control" id="seco_neumaticos" name="seco_neumaticos" step="0.1">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="lluvioso_neumaticos">Condición Lluviosa</label>
                            <input type="number" class="form-control" id="lluvioso_neumaticos" name="lluvioso_neumaticos" step="0.1">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="extremo_neumaticos">Condición Extrema</label>
                            <input type="number" class="form-control" id="extremo_neumaticos" name="extremo_neumaticos" step="0.1">
                        </div>
                    </div>

                    <div class="step-navigation">
                        <button type="button" class="step-btn prev-step">Anterior</button>
                        <button type="button" class="step-btn next-step">Siguiente</button>
                    </div>
                </div>

                <!-- Step 4: Conducción Agresiva -->
                <div class="step-section" data-step="4">
                    <h3>Conducción Agresiva</h3>
                    <div class="form-group">
                        <label class="form-label" for="velocidad_agresiva">Velocidad Promedio (km/h)</label>
                        <input type="number" class="form-control" id="velocidad_agresiva" name="velocidad_agresiva">
                    </div>

                    <div class="section-group">
                        <h4>Consumo de Combustible</h4>
                        <div class="form-group">
                            <label class="form-label" for="seco_agresiva">Condición Seca (L/100km)</label>
                            <input type="number" class="form-control" id="seco_agresiva" name="seco_agresiva" step="0.1">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="lluvioso_agresiva">Condición Lluviosa (L/100km)</label>
                            <input type="number" class="form-control" id="lluvioso_agresiva" name="lluvioso_agresiva" step="0.1">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="extremo_agresiva">Condición Extrema (L/100km)</label>
                            <input type="number" class="form-control" id="extremo_agresiva" name="extremo_agresiva" step="0.1">
                        </div>
                    </div>

                    <div class="section-group">
                        <h4>Desgaste de Neumáticos (%)</h4>
                        <div class="form-group">
                            <label class="form-label" for="seco_agreneu">Condición Seca</label>
                            <input type="number" class="form-control" id="seco_agreneu" name="seco_agreneu" step="0.1">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="lluvioso_agreneu">Condición Lluviosa</label>
                            <input type="number" class="form-control" id="lluvioso_agreneu" name="lluvioso_agreneu" step="0.1">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="extremo_agreneu">Condición Extrema</label>
                            <input type="number" class="form-control" id="extremo_agreneu" name="extremo_agreneu" step="0.1">
                        </div>
                    </div>

                    <div class="step-navigation">
                        <button type="button" class="step-btn prev-step">Anterior</button>
                        <button type="button" class="step-btn next-step">Siguiente</button>
                    </div>
                </div>

                <!-- Step 5: Ahorro de Combustible -->
                <div class="step-section" data-step="5">
                    <h3>Ahorro de Combustible</h3>
                    <div class="form-group">
                        <label class="form-label" for="velocidad_combustible">Velocidad Promedio (km/h)</label>
                        <input type="number" class="form-control" id="velocidad_combustible" name="velocidad_combustible">
                    </div>

                    <div class="section-group">
                        <h4>Consumo de Combustible</h4>
                        <div class="form-group">
                            <label class="form-label" for="seco_ahorro">Condición Seca (L/100km)</label>
                            <input type="number" class="form-control" id="seco_ahorro" name="seco_ahorro" step="0.1">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="lluvioso_ahorro">Condición Lluviosa (L/100km)</label>
                            <input type="number" class="form-control" id="lluvioso_ahorro" name="lluvioso_ahorro" step="0.1">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="extremo_ahorro">Condición Extrema (L/100km)</label>
                            <input type="number" class="form-control" id="extremo_ahorro" name="extremo_ahorro" step="0.1">
                        </div>
                    </div>

                    <div class="section-group">
                        <h4>Desgaste de Neumáticos (%)</h4>
                        <div class="form-group">
                            <label class="form-label" for="seco_ahorro_neu">Condición Seca</label>
                            <input type="number" class="form-control" id="seco_ahorro_neu" name="seco_ahorro_neu" step="0.1">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="lluvioso_ahorro_neu">Condición Lluviosa</label>
                            <input type="number" class="form-control" id="lluvioso_ahorro_neu" name="lluvioso_ahorro_neu" step="0.1">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="extremo_ahorro_neu">Condición Extrema</label>
                            <input type="number" class="form-control" id="extremo_ahorro_neu" name="extremo_ahorro_neu" step="0.1">
                        </div>
                    </div>

                    <div class="step-navigation">
                        <button type="button" class="step-btn prev-step">Anterior</button>
                        <button type="button" id="btnRegistrarVehiculo" class="btn-submit">Guardar Vehículo</button>
                    </div>
                </div>
                <div id="statusMessage" class="status-message"></div>
            </form>

            <div class="list-header">
                <h2>Vehículos Registrados</h2>
                <button id="btnListarVehiculos" type="button">↓</button>
            </div>
            <div id="vehiculosCards"></div>
        </div>
        `;

        this.loadTeamsAndPilots();
    }

    loadTeamsAndPilots() {
        fetch('../../../db.json')
            .then(response => response.json())
            .then(data => {
                const equipoPiloto = this.shadowRoot.querySelector("#equipoPilotoVeh");
                const nombrePiloto = this.shadowRoot.querySelector("#nombrePilotoVeh");
                
                // Load teams
                data.equipos.forEach(equipo => {
                    const option = document.createElement("option");
                    option.value = equipo.id;
                    option.textContent = equipo.nombreEquipo;
                    equipoPiloto.appendChild(option);
                });

                // Load pilots
                data.pilotos.forEach(piloto => {
                    const option = document.createElement("option");
                    option.value = piloto.id;
                    option.textContent = piloto.nombrePiloto;
                    nombrePiloto.appendChild(option);
                });
            })
            .catch(error => {
                console.error("Error loading data:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudieron cargar los datos',
                });
            });
    }

    addEventListeners() {
        this.shadowRoot.querySelector('#btnRegistrarVehiculo').addEventListener("click", () => this.crearVehiculos());
        this.shadowRoot.querySelector('#btnListarVehiculos').addEventListener("click", () => this.mostrarVehiculos());
    }

    crearVehiculos = () => {
        const formCrearVehiculo = this.shadowRoot.querySelector('#formCrearVehiculo');
        const statusMessage = this.shadowRoot.querySelector('#statusMessage');
    
        const formData = new FormData(formCrearVehiculo);
        const datos = Object.fromEntries(formData.entries());
    
        const vehiculo = {
            imagenVehiculo: datos.imagenVehiculo,
            motor: datos.motor,
            modelo: datos.modelo,
            equipoPiloto: datos.equipoPiloto,
            nombrePiloto: datos.nombrePiloto,
            velocidadMaximaKmh: datos.velocidad_maxima_kmh,
            aceleracion0a100: datos.aceleracion_0_100,
            rendimiento: {
                conduccionNormal: {
                    velocidadNormal: datos.velocidad_normal,
                    consumoCombustible: {
                        seco: datos.seco_normal,
                        lluvioso: datos.lluvioso_normal,
                        extremo: datos.extremo_normal
                    },
                    desgasteNeumaticos: {
                        seco: datos.seco_neumaticos,
                        lluvioso: datos.lluvioso_neumaticos,
                        extremo: datos.extremo_neumaticos
                    }
                },
                conduccionAgresiva: {
                    velocidadAgresiva: datos.velocidad_agresiva,
                    consumoCombustible: {
                        seco: datos.seco_agresiva,
                        lluvioso: datos.lluvioso_agresiva,
                        extremo: datos.extremo_agresiva
                    },
                    desgasteNeumaticos: {
                        seco: datos.seco_agreneu,
                        lluvioso: datos.lluvioso_agreneu,
                        extremo: datos.extremo_agreneu
                    }
                },
                ahorroCombustible: {
                    velocidadPromedio: datos.velocidad_combustible,
                    consumoCombustible: {
                        seco: datos.seco_ahorro,
                        lluvioso: datos.lluvioso_ahorro,
                        extremo: datos.extremo_ahorro
                    },
                    desgasteNeumaticos: {
                        seco: datos.seco_ahorro_neu,
                        lluvioso: datos.lluvioso_ahorro_neu,
                        extremo: datos.extremo_ahorro_neu
                    }
                }
            }
        };

        postVehiculos(vehiculo)
            .then(response => response.json())
            .then(responseData => {
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'El vehículo ha sido registrado correctamente',
                    timer: 2000,
                    showConfirmButton: false
                });
                formCrearVehiculo.reset();
                this.currentStep = 1;
                this.updateProgressBar();
                const allSections = this.shadowRoot.querySelectorAll('.step-section');
                allSections.forEach(section => section.style.display = 'none');
                this.shadowRoot.querySelector('[data-step="1"]').style.display = 'block';
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo registrar el vehículo'
                });
            });
    };

    mostrarVehiculos = () => {
        getVehiculos()
        .then((vehiculos) => {
            const vehiculosCards = this.shadowRoot.querySelector('#vehiculosCards');
            vehiculosCards.innerHTML = '';
            
            vehiculos.forEach((vehiculo) => {
                const divItems = document.createElement('div');
                divItems.classList.add('col');
                divItems.innerHTML = `
                <div id="card__listar" class="card">
                    <img src="${vehiculo.imagenVehiculo}" alt="${vehiculo.modelo}" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
                    <div class="card__content">
                        <h3 class="card__title">${vehiculo.motor}</h3>
                        <p class="card__pais">🏎️ ${vehiculo.modelo}</p>
                        <p class="card__motor">⚡ ${vehiculo.velocidadMaximaKmh} km/h</p>
                    </div>
                    <div class="card__actions">
                        <button class="btnEditarForm" data-id="${vehiculo.id}">Editar</button>
                        <button class="btnEliminar" data-id="${vehiculo.id}">Eliminar</button>
                    </div>
                </div>
                `;
                vehiculosCards.appendChild(divItems);
            });

            this.setupCardEventListeners();
        })
        .catch((error) => {
            console.error('Error en la solicitud GET:', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudieron cargar los vehículos'
            });
        });
    }

    setupCardEventListeners() {
        this.shadowRoot.querySelectorAll('.btnEliminar').forEach(btn => {
            btn.addEventListener('click', (e) => this.eliminarVehiculo(e));
        });

        this.shadowRoot.querySelectorAll('.btnEditarForm').forEach(btn => {
            btn.addEventListener('click', (e) => this.mostrarFormularioEdit(e.target.dataset.id));
        });
    }

    eliminarVehiculo = async (e) => {
        const id = e.target.dataset.id;
        
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#751010',
            cancelButtonColor: '#6B7280',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await deleteVehiculos(id);
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado',
                    text: 'El vehículo ha sido eliminado',
                    timer: 1500,
                    showConfirmButton: false
                });
                this.mostrarVehiculos();
            } catch (error) {
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo eliminar el vehículo'
                });
            }
        }
    }

    mostrarFormularioEdit = (id) => {
        getVehiculos()
        .then((vehiculos) => {
            const vehiculo = vehiculos.find(v => v.id === id);
            if (!vehiculo) throw new Error('Vehículo no encontrado');

            Swal.fire({
                title: 'Editar Vehículo',
                html: `
                    <form id="formEditarVehiculo" class="edit-form">
                        <div class="swal2-form-group">
                            <label class="swal2-label">URL de Imagen</label>
                            <input type="url" class="swal2-input" id="imagenEdit" value="${vehiculo.imagenVehiculo || ''}">
                        </div>
                        <div class="swal2-form-group">
                            <label class="swal2-label">Motor</label>
                            <input type="text" class="swal2-input" id="motorEdit" value="${vehiculo.motor || ''}">
                        </div>
                        <div class="swal2-form-group">
                            <label class="swal2-label">Modelo</label>
                            <input type="text" class="swal2-input" id="modeloEdit" value="${vehiculo.modelo || ''}">
                        </div>
                        <div class="swal2-form-group">
                            <label class="swal2-label">Equipo</label>
                            <input type="text" class="swal2-input" id="equipoEdit" value="${vehiculo.equipoPiloto || ''}">
                        </div>
                        <div class="swal2-form-group">
                            <label class="swal2-label">Piloto</label>
                            <input type="text" class="swal2-input" id="pilotoEdit" value="${vehiculo.nombrePiloto || ''}">
                        </div>
                        <div class="swal2-form-group">
                            <label class="swal2-label">Velocidad Máxima (km/h)</label>
                            <input type="number" class="swal2-input" id="velocidadEdit" value="${vehiculo.velocidadMaximaKmh || ''}">
                        </div>
                        <div class="swal2-form-group">
                            <label class="swal2-label">Aceleración 0-100 km/h</label>
                            <input type="number" class="swal2-input" id="aceleracionEdit" value="${vehiculo.aceleracion0a100 || ''}" step="0.1">
                        </div>
                    </form>
                `,
                customClass: {
                    container: 'edit-form-container'
                },
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#751010',
                cancelButtonColor: '#6B7280',
                width: '600px',
                didRender: () => {
                    // Agregar estilos específicos para el formulario de edición
                    const style = document.createElement('style');
                    style.textContent = `
                        .edit-form-container .swal2-popup {
                            padding: 2rem;
                        }
                        .edit-form {
                            display: grid;
                            gap: 1rem;
                            max-height: 70vh;
                            overflow-y: auto;
                            padding: 1rem;
                        }
                        .swal2-form-group {
                            display: flex;
                            flex-direction: column;
                            gap: 0.5rem;
                            margin-bottom: 1rem;
                        }
                        .swal2-label {
                            font-weight: 500;
                            color: #374151;
                            font-size: 0.9rem;
                        }
                        .swal2-input {
                            height: 40px !important;
                            margin: 0 !important;
                            font-size: 0.9rem !important;
                        }
                    `;
                    document.head.appendChild(style);
                },
                preConfirm: () => {
                    return {
                        imagenVehiculo: document.getElementById('imagenEdit').value,
                        motor: document.getElementById('motorEdit').value,
                        modelo: document.getElementById('modeloEdit').value,
                        equipoPiloto: document.getElementById('equipoEdit').value,
                        nombrePiloto: document.getElementById('pilotoEdit').value,
                        velocidadMaximaKmh: document.getElementById('velocidadEdit').value,
                        aceleracion0a100: document.getElementById('aceleracionEdit').value,
                    };
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    this.editarVehiculo(id, result.value);
                }
            });
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo cargar el vehículo para editar'
            });
        });
    }

    editarVehiculo = async (id, datos) => {
        try {
            const response = await patchVehiculos(datos, id);
            if (!response.ok) throw new Error('Error al actualizar el vehículo');
            
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'El vehículo ha sido actualizado',
                timer: 1500,
                showConfirmButton: false
            });
            this.mostrarVehiculos();
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo actualizar el vehículo'
            });
        }
    }
}

customElements.define("vehiculos-admin", VehiculosAdmin);