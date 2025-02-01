import { postVehiculos, getVehiculos, deleteVehiculos, patchVehiculos } from "../../Apis/vehiculosApis.js";
import VehiculoModel from "../../Models/vehiculoModel.js";
const divContainerProduct = document.querySelector('.containerRendimiento');

export class VehiculosAdmin extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentStep = 1;
        this.render();
        this.setupEventListeners();
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
        let idVehiculo = Date.now();
        this.shadowRoot.innerHTML = /*html*/ `
        <style>
            :host {
                --primary-bg: #1a1a1a;
                --secondary-bg: #2d2d2d;
                --input-bg: #333333;
                --text-primary: #ffffff;
                --text-secondary: #cccccc;
                --accent-color:#751010;
                --border-color: #404040;
                --hover-color: #751010;
                --error-color: #ef4444;
                --success-color: #10b981;
            }

            /* Form styles */
            form {
                background-color: #2d2d2d;
                padding: 7rem;
                border-radius: 12px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
                color: var(--text-primary);
                max-width: 800px;
                margin: 2rem auto;
            }

            /* Input fields with enhanced styling */
            .form-control {
                background-color: var(--input-bg);
                border: 1px solid var(--border-color);
                color: var(--text-primary);
                padding: 0.75rem 1rem;
                border-radius: 8px;
                width: 100%;
                margin-top: 0.5rem;
                transition: all 0.3s ease;
                font-size: 0.95rem;
                box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
            }

            .form-control:focus {
                outline: none;
                border-color: var(--accent-color);
                box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
            }

            .form-control:disabled {
                background-color: var(--secondary-bg);
                cursor: not-allowed;
                opacity: 0.7;
            }

            /* Labels with enhanced styling */
            .form-label {
                color: var(--text-secondary);
                font-size: 0.9rem;
                margin-bottom: 0.5rem;
                display: block;
                font-weight: 500;
                letter-spacing: 0.5px;
            }

            /* Select dropdowns with enhanced styling */
            .form-select {
                background-color: var(--input-bg);
                border: 1px solid var(--border-color);
                color: var(--text-primary);
                padding: 0.75rem 1rem;
                border-radius: 8px;
                width: 104%;
                margin-top: 0.5rem;
                appearance: none;
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
                background-repeat: no-repeat;
                background-position: right 1rem center;
                background-size: 1.5em;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .form-select:focus {
                outline: none;
                border-color: var(--accent-color);
                box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
            }

            /* Step navigation */
            .step-navigation {
                display: flex;
                justify-content: space-between;
                margin-top: 2rem;
                padding-top: 1.5rem;
                border-top: 1px solid var(--border-color);
            }

            /* Progress bar */
            .progress-bar-container {
                width: 100%;
                height: 6px;
                background-color: var(--border-color);
                border-radius: 3px;
                margin: 1.5rem 0;
                overflow: hidden;
            }

            .progress-bar {
                height: 100%;
                background: linear-gradient(90deg, var(--accent-color), #6366f1);
                border-radius: 3px;
                width: 0;
                transition: width 0.3s ease;
            }

            /* Step sections */
            .step-section {
                display: none;
                animation: fadeIn 0.5s ease-in-out;
            }

            .step-section[data-step="1"] {
                display: block;
            }

            /* Headings */
            h2 {
                color: var(--text-primary);
                margin-bottom: 1.5rem;
                font-size: 1.5rem;
                font-weight: 600;
                letter-spacing: -0.025em;
            }

            h3 {
                color: var(--text-primary);
                margin-top: 1.5rem;
                margin-bottom: 1.5rem;
                font-size: 1.2rem;
                font-weight: 500;
                padding-bottom: 0.5rem;
                border-bottom: 2px solid var(--border-color);
            }

            /* Navigation buttons */
            .step-btn {
                background-color: var(--accent-color);
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-weight: 500;
                font-size: 0.9rem;
            }

            .step-btn:hover {
                background-color: var(--hover-color);
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
            }

            .step-btn.prev-step {
                background-color: var(--secondary-bg);
            }

            .step-btn.prev-step:hover {
                background-color: #3a3a3a;
            }

            /* Card styles */
            .card {
                background-color: var(--secondary-bg);
                border-radius: 12px;
                padding: 2rem;
                margin-top: 2rem;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
            }

            .card h1 {
                color: var(--text-primary);
                margin-top: 0;
                margin-bottom: 1.5rem;
                font-size: 1.5rem;
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

            /* Spacing utilities */
            .mb-3 {
                margin-bottom: 1.5rem;
            }

            .col {
                margin-bottom: 1.5rem;
            }

            /* Responsive adjustments */
            @media (max-width: 768px) {
                form {
                    padding: 1.5rem;
                    margin: 1rem;
                }
            }
        </style>

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
                <div class="col">
                    <label for="idVehiculo" class="form-label">COD</label>
                    <input type="number" class="form-control" id="idVehiculo" name="idVehiculo" placeholder="${idVehiculo}" disabled>
                </div>
                <div class="mb-3">
                    <label for="motor" class="form-label">Motor</label>
                    <input type="text" class="form-control" name="motor" id="motor" aria-describedby="NombreHelp">
                </div>
                <div class="mb-3">
                    <label for="modelo" class="form-label">Modelo</label>
                    <input type="text" class="form-control" id="modelo" name="modelo" aria-describedby="ModeloHelp">
                </div>
                <div class="mb-3">
                    <label for="exampleInputEquipos" class="form-label">Equipo</label>
                    <select class="form-select">
                        <option selected>Seleccionar Equipo</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
                <div class="step-navigation">
                    <button type="button" class="step-btn next-step">Siguiente: Información Adicional</button>
                </div>
            </div>

            <!-- Step 2: Información -->
            <div class="step-section" data-step="2">
                <h3>Información Adicional</h3>
                <div class="mb-3">
                    <label for="exampleInputPilotos" class="form-label">Pilotos</label>
                    <select class="form-select">
                        <option selected>Seleccionar Piloto</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPilotos" class="form-label">Pilotos</label>
                    <select class="form-select">
                        <option selected>Seleccionar Piloto</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="velocidad_maxima_kmh" class="form-label">Velocidad Máxima</label>
                    <input type="text" class="form-control" id="velocidad_maxima_kmh" name="velocidad_maxima_kmh" aria-describedby="ModeloHelp">
                </div>
                <div class="mb-3">
                    <label for="aceleracion_0_100" class="form-label">Aceleración</label>
                    <input type="text" class="form-control" id="aceleracion_0_100" name="aceleracion_0_100" aria-describedby="ModeloHelp">
                </div>
                <div class="step-navigation">
                    <button type="button" class="step-btn prev-step">Anterior</button>
                    <button type="button" class="step-btn next-step">Siguiente: Conducción Normal</button>
                </div>
            </div>

            <!--Step 3: Conducción Normal-->
            <div class="step-section" data-step="3">
                <h3>Conducción Normal</h3>
                <label for="velocidad_normal" class="form-label">Velocidad Promedio</label>
                <input type="text" class="form-control" id="velocidad_normal" name="velocidad_normal" aria-describedby="VelocPromHelp">
                <p>Consumo de Combustible</p>
                <label for="seco_normal" class="form-label">Seco</label>
                <input type="text" class="form-control" id="seco_normal" name="seco_normal" aria-describedby="SecoHelp">
                <label for="lluvioso_normal" class="form-label">Lluvioso</label>
                <input type="text" class="form-control" id="lluvioso_normal" id="lluvioso_normal" aria-describedby="LluviosoHelp">
                <label for="extremo_normal" class="form-label">Extremo</label>
                <input type="text" class="form-control" id="extremo_normal" name="extremo_normal" aria-describedby="ExtremoHelp">
                <p>Desgaste de Neumaticos</p>
                <label for="seco_neumaticos" class="form-label">Seco</label>
                <input type="text" class="form-control" id="seco_neumaticos" name="seco_neumaticos" aria-describedby="SecoHelp">
                <label for="lluvioso_neumaticos" class="form-label">Lluvioso</label>
                <input type="text" class="form-control" id="lluvioso_neumaticos" name="lluvioso_neumaticos" aria-describedby="LluviosoHelp">
                <label for="extremo_neumaticos" class="form-label">Extremo</label>
                <input type="text" class="form-control" id="extremo_<input type="text" class="form-control" id="extremo_neumaticos" name="extremo_neumaticos" aria-describedby="ExtremoHelp">
                <div class="step-navigation">
                    <button type="button" class="step-btn prev-step">Anterior</button>
                    <button type="button" class="step-btn next-step">Siguiente: Conducción Agresiva</button>
                </div>
            </div>

            <!-- Step 4: Conducción Agresiva -->
            <div class="step-section" data-step="4">
                <h3>Conducción Agresiva</h3>
                <label for="velocidad_agresiva" class="form-label">Velocidad Promedio</label>
                <input type="text" class="form-control" id="velocidad_agresiva" name="velocidad_agresiva" aria-describedby="VelocPromHelp">
                <p>Consumo de Combustible</p>
                <label for="seco_agresiva" class="form-label">Seco</label>
                <input type="text" class="form-control" id="seco_agresiva" name="seco_agresiva" aria-describedby="SecoHelp">
                <label for="lluvioso_agresiva" class="form-label">Lluvioso</label>
                <input type="text" class="form-control" id="lluvioso_agresiva" name="lluvioso_agresiva" aria-describedby="LluviosoHelp">
                <label for="extremo_agresiva" class="form-label">Extremo</label>
                <input type="text" class="form-control" id="extremo_agresiva" aria-describedby="ExtremoHelp">
                <p>Desgaste de Neumaticos</p>
                <label for="seco_agreneu" class="form-label">Seco</label>
                <input type="text" class="form-control" id="seco_agreneu" name="seco_agreneu" aria-describedby="SecoHelp">
                <label for="lluvioso_agreneu" class="form-label">Lluvioso</label>
                <input type="text" class="form-control" id="lluvioso_agreneu" name="lluvioso_agreneu"  aria-describedby="LluviosoHelp">
                <label for="extremo_agreneu" class="form-label">Extremo</label>
                <input type="text" class="form-control" id="extremo_agreneu" name="extremo_agreneu"  aria-describedby="ExtremoHelp">
                <div class="step-navigation">
                    <button type="button" class="step-btn prev-step">Anterior</button>
                    <button type="button" class="step-btn next-step">Siguiente: Ahorro de Combustible</button>
                </div>
            </div>

            <!-- Step 5: Ahorro de Combustible -->
            <div class="step-section" data-step="5">
                <h3>Ahorro de Combustible</h3>
                <label for="velocidad_combustible" class="form-label">Velocidad Promedio</label>
                <input type="text" class="form-control" id="velocidad_combustible" name="velocidad_combustible"  aria-describedby="VelocPromHelp">
                <p>Consumo de Combustible</p>
                <label for="seco_ahorro" class="form-label">Seco</label>
                <input type="text" class="form-control" id="seco_ahorro" name="seco_ahorro" aria-describedby="SecoHelp">
                <label for="lluvioso_ahorro" class="form-label">Lluvioso</label>
                <input type="text" class="form-control" id="lluvioso_ahorro" name="lluvioso_ahorro" aria-describedby="LluviosoHelp">
                <label for="extremo_ahorro" class="form-label">Extremo</label>
                <input type="text" class="form-control" id="extremo_ahorro" name="extremo_ahorro"  aria-describedby="ExtremoHelp">
                <p>Desgaste de Neumaticos</p>
                <label for="seco_ahorro_neu" class="form-label">Seco</label>
                <input type="text" class="form-control" id="seco_ahorro_neu" name="seco_ahorro_neu" aria-describedby="SecoHelp">
                <label for="lluvioso_ahorro_neu" class="form-label">Lluvioso</label>
                <input type="text" class="form-control" id="lluvioso_ahorro_neu" name="lluvioso_ahorro_neu" aria-describedby="LluviosoHelp">
                <label for="extremo_ahorro_neu" class="form-label">Extremo</label>
                <input type="text" class="form-control" id="extremo_ahorro_neu" name="extremo_ahorro_neu" aria-describedby="ExtremoHelp">
                <div class="step-navigation">
                    <button type="button" class="step-btn prev-step">Anterior</button>
                    <button type="submit" btn="btnRegistrarVehiculo" class="step-btn">Guardar Vehículo</button>
                </div>
            </div>
        </form>
        <div class="card">
            <h1>Conoce nuestros Vehiculos</h1>
            <button id="btnListarVehiculos" type="submit" class="btn-submit">↓</button>
            <div id="vehiculosCards">
                <!--Aquí se llamarán las cartas desde archivo JS-->
            </div>
        </div>
        `;
    }
}

customElements.define("vehiculos-admin", VehiculosAdmin);