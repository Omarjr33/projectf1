import { postVehiculos } from "../../Apis/vehiculosApis.js";

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
                <div class="form-group">
                        <label class="form-label" for="imagenVehiculo">Imagen Vehiculo</label>
                        <div class="image-upload-container" id="dropZone">
                            <i>📁</i>
                            <p class="image-upload-text">Arrastra una imagen aquí o haz clic para seleccionar</p>
                            <input type="file" class="file-input" id="imagenVehiculo" name="imagenVehiculo" accept="image/*">
                        </div>
                        <div class="preview-container">
                            <img class="preview-image" id="imagePreview" alt="Preview">
                        </div>
                </div>
                <div class="mb-3">
                    <label for="motor" class="form-label">Motor</label>
                    <input type="text" class="form-control" name="motor" id="motor" aria-describedby="NombreHelp">
                </div>
                <div class="mb-3">
                    <label for="modelo" class="form-label">Modelo</label>
                    <input type="text" class="form-control" id="modelo" name="modelo" aria-describedby="ModeloHelp">
                </div>
                <div class="form-group">
                    <label for="equipoPiloto" class="form-label">Equipo</label>
                    <select class="form-select" id="equipoPiloto" name="equipoPiloto">
                        <option value="">Seleccionar Equipo</option>
                    </select>
                </div>
                <div class="step-navigation">
                    <button type="button" class="step-btn next-step">Siguiente: Información Adicional</button>
                </div>
            </div>

            <!-- Step 2: Información -->
            <div class="step-section" data-step="2">
                <h3>Información Adicional</h3>
                <div class="form-group">
                    <label for="nombrePiloto" class="form-label">Piloto</label>
                    <select class="form-select" id="nombrePiloto" name="nombrePiloto">
                        <option value="">Seleccionar Piloto</option>
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
                <input type="text" class="form-control" id="extremo_neumaticos" name="extremo_neumaticos" aria-describedby="ExtremoHelp">
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
                    <button type="submit" btn="btnRegistrarVehiculo" class="btn-submit">Guardar Vehículo</button>
                </div>
            </div>
            <div id="statusMessage" class="status-message"></div>
        </form>
        <div class="card">
            <h1>Conoce nuestros Vehiculos</h1>
            <button id="btnListarVehiculos" type="submit" class="btn-submit">↓</button>
            <div id="vehiculosCards">
                <!--Aquí se llamarán las cartas desde archivo JS-->
            </div>
        </div>
        `;

        fetch('../../../db.json')
        .then(response => response.json()) 
        .then(data => {
            const equipoPiloto = this.shadowRoot.querySelector("#equipoPiloto");
            
            data.equipos.forEach(equipo => {
                const option = document.createElement("option");
                option.value = equipo.id;
                option.textContent = equipo.nombreEquipo;
                equipoPiloto.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error al cargar los datos de equipos:", error);
        });

        fetch('../../../db.json')
        .then(response => response.json()) 
        .then(data => {
            const nombrePiloto = this.shadowRoot.querySelector("#nombrePiloto");
            
            data.pilotos.forEach(piloto => {
                const option = document.createElement("option");
                option.value = piloto.id;
                option.textContent = piloto.nombrePiloto;
                nombrePiloto.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error al cargar los datos de los vehículos:", error);
        });
    }

    saveData() {
        const formCrearVehiculo = this.shadowRoot.querySelector('#formCrearVehiculo');
        const btnRegistrarVehiculos = this.shadowRoot.querySelector('#btnRegistrarVehiculos');
        const fileInput = formCrearVehiculo.querySelector('#imagenVehiculo'); // Obtener el input de la imagen
        const previewContainer = this.shadowRoot.querySelector('#previewContainer');
        const imagePreview = this.shadowRoot.querySelector('#imagePreview');
        const statusMessage = this.shadowRoot.querySelector('#statusMessage');
        
        // Mostrar la vista previa de la imagen
        const handleImageDisplay = (file) => {
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    imagePreview.src = e.target.result;
                    previewContainer.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        };
        
        // Evento de registro de vehículo
        btnRegistrarVehiculos.addEventListener("click", (e) => {
            e.preventDefault(); // Prevenir el envío del formulario
        
            const formData = new FormData(formCrearVehiculo); // Recoger los datos del formulario
            
            const datos = {
                equipo: formData.get('equipoPiloto'),
                modelo: formData.get('modelo'),
                motor: formData.get('motor'),
                velocidad_maxima_kmh: formData.get('velocidad_maxima_kmh'),
                aceleracion_0_100: formData.get('aceleracion_0_100'),
                pilotos: formData.get('nombrePiloto'),
                rendimiento: {
                    conduccion_normal: {
                        velocidad_promedio_kmh: formData.get('velocidad_normal'),
                        consumo_combustible: {
                            seco: formData.get('seco_normal'),
                            lluvioso: formData.get('lluvioso_normal'),
                            extremo: formData.get('extremo_normal')
                        },
                        desgaste_neumaticos: {
                            seco: formData.get('seco_neumaticos'),
                            lluvioso: formData.get('lluvioso_neumaticos'),
                            extremo: formData.get('extremo_neumaticos')
                        },
                    },
                    conduccion_agresiva: {
                        velocidad_promedio_kmh: formData.get('velocidad_agresiva'),
                        consumo_combustible: {
                            seco: formData.get('seco_agresiva'),
                            lluvioso: formData.get('lluvioso_agresiva'),
                            extremo: formData.get('extremo_agresiva')
                        },
                        desgaste_neumaticos: {
                            seco: formData.get('seco_agreneu'),
                            lluvioso: formData.get('lluvioso_agreneu'),
                            extremo: formData.get('extremo_agreneu')
                        },
                    },
                    ahorro_combustible: {
                        velocidad_promedio_kmh: formData.get('velocidad_combustible'),
                        consumo_combustible: {
                            seco: formData.get('seco_ahorro'),
                            lluvioso: formData.get('lluvioso_ahorro'),
                            extremo: formData.get('extremo_ahorro')
                        },
                        desgaste_neumaticos: {
                            seco: formData.get('seco_ahorro_neu'),
                            lluvioso: formData.get('lluvioso_ahorro_neu'),
                            extremo: formData.get('extremo_ahorro_neu')
                        }
                    }
                }
            };
    
            // Si hay una imagen seleccionada, manejarla y agregarla a los datos
            const file = fileInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    // Ahora agregamos la imagen a los datos de la misma manera
                    datos.imagenVehiculo = reader.result; // Aquí guardamos el DataURL de la imagen
                    enviarDatos(datos); // Enviar los datos completos
                };
                reader.readAsDataURL(file);
                handleImageDisplay(file); // Mostrar vista previa
            } else {
                // Si no hay imagen, solo enviar los datos
                enviarDatos(datos);
            }
        });
    
        // Función para enviar los datos al servidor
        const enviarDatos = (datos) => {
            postVehiculos(datos)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                })
                .then(responseData => {
                    console.log('Respuesta exitosa:', responseData);
                    statusMessage.textContent = '¡Vehículo registrado exitosamente!';
                    statusMessage.className = 'status-message success';
                    statusMessage.style.display = 'block';
                    formCrearVehiculo.reset();
                    previewContainer.style.display = 'none';
                    setTimeout(() => {
                        statusMessage.style.display = 'none';
                    }, 3000);
                })
                .catch(error => {
                    console.error('Error:', error.message);
                    statusMessage.textContent = 'Error al registrar el vehículo. Por favor, intente nuevamente.';
                    statusMessage.className = 'status-message error';
                    statusMessage.style.display = 'block';
                });
        };
    }    
}

customElements.define("vehiculos-admin", VehiculosAdmin);