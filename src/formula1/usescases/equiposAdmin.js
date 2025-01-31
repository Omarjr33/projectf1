import { postEquipos } from "../../Apis/equiposApis.js";

export class equiposAdmin extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
        this.crearEquipo();
    }

    render() {
        this.shadowRoot.innerHTML = /*html*/`
        <style>
            :host {
                display: block;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                --bg-primary: #1a1a1a;
                --bg-secondary: #2d2d2d;
                --text-primary: #ffffff;
                --text-secondary: #b3b3b3;
                --accent-color: #6366f1;
                --accent-hover: #818cf8;
                --border-color: #404040;
                --error-color: #ef4444;
                --success-color: #10b981;
            }

            .card {
                background: var(--bg-secondary);
                border-radius: 15px;
                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
                padding: 2rem 5rem 2rem 3rem;
                max-width: 1200px;
                margin: 2rem auto;
                color: var(--text-primary);
            }

            .card-header {
                text-align: center;
                margin-bottom: 2rem;
                border-bottom: 2px solid var(--border-color);
                padding-bottom: 1rem;
            }

            .card-header h2 {
                color: var(--text-primary);
                margin: 0;
                font-size: 1.8rem;
                font-weight: 600;
            }

            .form-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 2rem;
            }

            .form-group {
                margin-bottom: 1.5rem;
            }

            .form-label {
                display: block;
                margin-bottom: 0.5rem;
                color: var(--text-secondary);
                font-weight: 500;
            }

            .form-control {
                width: 100%;
                padding: 0.75rem;
                background-color: var(--bg-primary);
                border: 2px solid var(--border-color);
                border-radius: 8px;
                font-size: 1rem;
                color: var(--text-primary);
                transition: all 0.3s ease;
            }

            .form-control:focus {
                outline: none;
                border-color: var(--accent-color);
                box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
            }

            .form-control::placeholder {
                color: var(--text-secondary);
                opacity: 0.6;
            }

            .image-upload-container {
                position: relative;
                width: 100%;
                min-height: 150px;
                border: 2px dashed var(--border-color);
                border-radius: 8px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 1rem;
                padding: 1rem;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .image-upload-container:hover {
                border-color: var(--accent-color);
                background-color: rgba(99, 102, 241, 0.1);
            }

            .image-upload-container i {
                font-size: 2rem;
                color: var(--accent-color);
            }

            .image-upload-text {
                color: var(--text-secondary);
                text-align: center;
            }

            .preview-container {
                margin-top: 1rem;
                width: 100%;
                display: none;
            }

            .preview-image {
                width: 100%;
                height: 200px;
                object-fit: cover;
                border-radius: 8px;
                border: 2px solid var(--border-color);
            }

            .btn-submit {
                background-color: var(--accent-color);
                color: white;
                border: none;
                border-radius: 8px;
                padding: 0.75rem 2rem;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: background-color 0.3s ease;
                width: 100%;
                max-width: 200px;
                margin: 2rem auto 1rem;
                display: block;
            }

            .btn-submit:hover {
                background-color: var(--accent-hover);
                transform: translateY(-1px);
            }

            .btn-submit:active {
                transform: translateY(1px);
            }

            .file-input {
                display: none;
            }

            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }

            .card {
                animation: fadeIn 0.5s ease-out;
            }

            .status-message {
                padding: 1rem;
                border-radius: 8px;
                margin-top: 1rem;
                display: none;
            }

            .status-message.error {
                background-color: var(--error-color);
                color: white;
            }

            .status-message.success {
                background-color: var(--success-color);
                color: white;
            }
        </style>

        <div class="card">
            <div class="card-header">
                <h2>Registro de Equipo</h2>
            </div>
            <form id="formCrearEquipo">
                <div class="form-grid">
                    <div class="form-group">
                        <label class="form-label" for="nombreEquipo">Nombre del Equipo</label>
                        <input type="text" class="form-control" id="nombreEquipo" name="nombreEquipo" placeholder="Ingrese el nombre del equipo">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="pais">País</label>
                        <input type="text" class="form-control" id="pais" name="pais" placeholder="Ingrese el país">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="Motor">Motor</label>
                        <input type="text" class="form-control" id="Motor" name="Motor" placeholder="Especifique el motor">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="imageEquipo">Imagen del Equipo</label>
                        <div class="image-upload-container" id="dropZone">
                            <i>📁</i>
                            <p class="image-upload-text">Arrastra una imagen aquí o haz clic para seleccionar</p>
                            <input type="file" class="file-input" id="imageEquipo" name="imageEquipo" accept="image/*">
                        </div>
                        <div class="preview-container">
                            <img class="preview-image" id="imagePreview" alt="Preview">
                        </div>
                    </div>
                </div>

                <button id="btnRegistrar" type="submit" class="btn-submit">
                    Registrar Equipo
                </button>
                <div id="statusMessage" class="status-message"></div>
            </form>
             <div class="card">
            <h1>Conoce nuestros equipos</h1>
            <button id="btnListar" type="submit" class="btn-submit">↓</button>
            <div id="equiposCards">
            <!--Aquí se llamarán las cartas desde archivo JS-->
            </div>
        </div>
        </div>
        `;
    }

    crearEquipo = () => {
        const formCrearEquipo = this.shadowRoot.querySelector('#formCrearEquipo');
        const dropZone = this.shadowRoot.querySelector('#dropZone');
        const fileInput = this.shadowRoot.querySelector('.file-input');
        const previewContainer = this.shadowRoot.querySelector('.preview-container');
        const imagePreview = this.shadowRoot.querySelector('#imagePreview');
        const statusMessage = this.shadowRoot.querySelector('#statusMessage');

        // Función para manejar la visualización de la imagen
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

        // Event listeners para drag and drop
        dropZone.addEventListener('click', () => fileInput.click());
        
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.style.borderColor = 'var(--accent-color)';
            dropZone.style.backgroundColor = 'rgba(99, 102, 241, 0.1)';
        });

        dropZone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            dropZone.style.borderColor = 'var(--border-color)';
            dropZone.style.backgroundColor = 'transparent';
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                fileInput.files = e.dataTransfer.files;
                handleImageDisplay(file);
            }
            dropZone.style.borderColor = 'var(--border-color)';
            dropZone.style.backgroundColor = 'transparent';
        });

        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                handleImageDisplay(file);
            }
        });

        this.shadowRoot.querySelector('#btnRegistrar').addEventListener("click", (e) => {
            e.preventDefault();
            const formData = new FormData(formCrearEquipo);

            // Convertir la imagen a Base64 si existe
            const file = fileInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const datos = Object.fromEntries(formData.entries());
                    datos.imageEquipo = reader.result;
                    
                    postEquipos(datos)
                        .then(response => {
                            if (response.ok) {
                                return response.json();
                            }
                            throw new Error(`Error: ${response.status} - ${response.statusText}`);
                        })
                        .then(responseData => {
                            console.log('Respuesta exitosa:', responseData);
                            statusMessage.textContent = '¡Equipo registrado exitosamente!';
                            statusMessage.className = 'status-message success';
                            statusMessage.style.display = 'block';
                            formCrearEquipo.reset();
                            previewContainer.style.display = 'none';
                            setTimeout(() => {
                                statusMessage.style.display = 'none';
                            }, 3000);
                        })
                        .catch(error => {
                            console.error('Error:', error.message);
                            statusMessage.textContent = 'Error al registrar el equipo. Por favor, intente nuevamente.';
                            statusMessage.className = 'status-message error';
                            statusMessage.style.display = 'block';
                        });
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

customElements.define("equipos-admin", equiposAdmin);