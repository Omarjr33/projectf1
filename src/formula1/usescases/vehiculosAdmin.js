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
        if (this.currentStep < 4) {
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
        const percentage = ((this.currentStep - 1) / 3) * 100;
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
                    <label for="exampleInputNombre" class="form-label">Motor</label>
                    <input type="text" class="form-control" id="exampleInputNombre" aria-describedby="NombreHelp">
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
                    <label for="exampleInputModelo" class="form-label">Modelo</label>
                    <input type="text" class="form-control" id="exampleInputModelo" aria-describedby="ModeloHelp">
                </div>
                <div class="step-navigation">
                    <button type="button" class="step-btn next-step">Siguiente: Conducción Normal</button>
                </div>
            </div>

            <!-- Step 2: Conducción Normal -->
            <div class="step-section" data-step="2">
                <h3>Conducción Normal</h3>
                <label for="exampleInputVelocProm" class="form-label">Velocidad Promedio</label>
                <input type="text" class="form-control" id="exampleInputVelocProm" aria-describedby="VelocPromHelp">
                <p>Consumo de Combustible</p>
                <label for="exampleInputSeco" class="form-label">Seco</label>
                <input type="text" class="form-control" id="exampleInputSeco" aria-describedby="SecoHelp">
                <label for="exampleInputLluvioso" class="form-label">Lluvioso</label>
                <input type="text" class="form-control" id="exampleInputNormal" aria-describedby="LluviosoHelp">
                <label for="exampleInputExtremo" class="form-label">Extremo</label>
                <input type="text" class="form-control" id="exampleInputExtremo" aria-describedby="ExtremoHelp">
                <p>Desgaste de Neumaticos</p>
                <label for="exampleInputSeco" class="form-label">Seco</label>
                <input type="text" class="form-control" id="exampleInputSeco" aria-describedby="SecoHelp">
                <label for="exampleInputLluvioso" class="form-label">Lluvioso</label>
                <input type="text" class="form-control" id="exampleInputNormal" aria-describedby="LluviosoHelp">
                <label for="exampleInputExtremo" class="form-label">Extremo</label>
                <input type="text" class="form-control" id="exampleInputExtremo" aria-describedby="ExtremoHelp">
                <div class="step-navigation">
                    <button type="button" class="step-btn prev-step">Anterior</button>
                    <button type="button" class="step-btn next-step">Siguiente: Conducción Agresiva</button>
                </div>
            </div>

            <!-- Step 3: Conducción Agresiva -->
            <div class="step-section" data-step="3">
                <h3>Conducción Agresiva</h3>
                <label for="exampleInputVelocProm" class="form-label">Velocidad Promedio</label>
                <input type="text" class="form-control" id="exampleInputVelocProm" aria-describedby="VelocPromHelp">
                <p>Consumo de Combustible</p>
                <label for="exampleInputSeco" class="form-label">Seco</label>
                <input type="text" class="form-control" id="exampleInputSeco" aria-describedby="SecoHelp">
                <label for="exampleInputLluvioso" class="form-label">Lluvioso</label>
                <input type="text" class="form-control" id="exampleInputNormal" aria-describedby="LluviosoHelp">
                <label for="exampleInputExtremo" class="form-label">Extremo</label>
                <input type="text" class="form-control" id="exampleInputExtremo" aria-describedby="ExtremoHelp">
                <p>Desgaste de Neumaticos</p>
                <label for="exampleInputSeco" class="form-label">Seco</label>
                <input type="text" class="form-control" id="exampleInputSeco" aria-describedby="SecoHelp">
                <label for="exampleInputLluvioso" class="form-label">Lluvioso</label>
                <input type="text" class="form-control" id="exampleInputNormal" aria-describedby="LluviosoHelp">
                <label for="exampleInputExtremo" class="form-label">Extremo</label>
                <input type="text" class="form-control" id="exampleInputExtremo" aria-describedby="ExtremoHelp">
                <div class="step-navigation">
                    <button type="button" class="step-btn prev-step">Anterior</button>
                    <button type="button" class="step-btn next-step">Siguiente: Ahorro de Combustible</button>
                </div>
            </div>

            <!-- Step 4: Ahorro de Combustible -->
            <div class="step-section" data-step="4">
                <h3>Ahorro de Combustible</h3>
                <label for="exampleInputVelocProm" class="form-label">Velocidad Promedio</label>
                <input type="text" class="form-control" id="exampleInputVelocProm" aria-describedby="VelocPromHelp">
                <p>Consumo de Combustible</p>
                <label for="exampleInputSeco" class="form-label">Seco</label>
                <input type="text" class="form-control" id="exampleInputSeco" aria-describedby="SecoHelp">
                <label for="exampleInputLluvioso" class="form-label">Lluvioso</label>
                <input type="text" class="form-control" id="exampleInputNormal" aria-describedby="LluviosoHelp">
                <label for="exampleInputExtremo" class="form-label">Extremo</label>
                <input type="text" class="form-control" id="exampleInputExtremo" aria-describedby="ExtremoHelp">
                <p>Desgaste de Neumaticos</p>
                <label for="exampleInputSeco" class="form-label">Seco</label>
                <input type="text" class="form-control" id="exampleInputSeco" aria-describedby="SecoHelp">
                <label for="exampleInputLluvioso" class="form-label">Lluvioso</label>
                <input type="text" class="form-control" id="exampleInputNormal" aria-describedby="LluviosoHelp">
                <label for="exampleInputExtremo" class="form-label">Extremo</label>
                <input type="text" class="form-control" id="exampleInputExtremo" aria-describedby="ExtremoHelp">
                <div class="step-navigation">
                    <button type="button" class="step-btn prev-step">Anterior</button>
                    <button type="submit" class="step-btn">Guardar Vehículo</button>
                </div>
            </div>
        </form>
        <div class="card">
            <h1>Conoce nuestros Vehiculos</h1>
            <button id="btnListar" type="submit" class="btn-submit">↓</button>
            <div id="vehiculosCards">
                <!--Aquí se llamarán las cartas desde archivo JS-->
            </div>
        </div>
        `;
    }
}

customElements.define("vehiculos-admin", VehiculosAdmin);