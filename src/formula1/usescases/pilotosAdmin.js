export class pilotosAdmin extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
        this.setupEventListeners();
    }
    render() {
        this.shadowRoot.innerHTML = /*html*/ `
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
                padding: 5rem;
                max-width: 1400px;
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

            .form-group {
                margin-bottom: 1.5rem;
            }

            .form-label {
                display: block;
                margin-bottom: 0.5rem;
                color: var(--text-secondary);
                font-weight: 500;
            }

            .form-control, .form-select {
                width: 100%;
                padding: 0.75rem;
                background-color: var(--bg-primary);
                border: 2px solid var(--border-color);
                border-radius: 8px;
                font-size: 1rem;
                color: var(--text-primary);
                transition: all 0.3s ease;
            }

            .form-control:focus, .form-select:focus {
                outline: none;
                border-color: var(--accent-color);
                box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
            }

            .form-control::placeholder, .form-select {
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

            .status-message {
                padding: 1rem;
                border-radius: 8px;
                margin-top: 1rem;
                text-align: center;
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
                <h2>Registro de Piloto</h2>
            </div>
            <form id="formCrearPiloto">
                <div class="form-group">
                    <label for="codigoPiloto" class="form-label">Código</label>
                    <input type="text" class="form-control" id="codigoPiloto" name="codigoPiloto" placeholder="Ingrese código del piloto">
                </div>
                <div class="form-group">
                    <label for="nombrePiloto" class="form-label">Nombre</label>
                    <input type="text" class="form-control" id="nombrePiloto" name="nombrePiloto" placeholder="Nombre completo del piloto">
                </div>
                <div class="form-group">
                    <label for="rolPiloto" class="form-label">Rol</label>
                    <input type="text" class="form-control" id="rolPiloto" name="rolPiloto" placeholder="Rol del piloto">
                </div>
                <div class="form-group">
                    <label for="equipoPiloto" class="form-label">Equipo</label>
                    <select class="form-select" id="equipoPiloto" name="equipoPiloto">
                        <option selected>Seleccionar Equipo</option>
                        <option value="1">Mercedes</option>
                        <option value="2">Ferrari</option>
                        <option value="3">Red Bull</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="imagenPiloto" class="form-label">Imagen del Piloto</label>
                    <div class="image-upload-container" id="dropZone">
                        <i>📁</i>
                        <p class="image-upload-text">Arrastra una imagen aquí o haz clic para seleccionar</p>
                        <input type="file" class="file-input" id="imagenPiloto" name="imagenPiloto" accept="image/*">
                    </div>
                    <div class="preview-container">
                        <img class="preview-image" id="imagePreview" alt="Preview">
                    </div>
                </div>

                <button type="submit" class="btn-submit" id="RegistrarPiloto">
                    Registrar Piloto
                </button>

                <div id="statusMessage" class="status-message"></div>
            </form>
       `;
    }

    setupEventListeners() {
        const formCrearPiloto = this.shadowRoot.querySelector('#formCrearPiloto');
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

        // Manejo del envío del formulario
        formCrearPiloto.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(formCrearPiloto);

            // Convertir la imagen a Base64 si existe
            const file = fileInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const datos = Object.fromEntries(formData.entries());
                    datos.imagenPiloto = reader.result;
                    
                    // Aquí iría tu función de envío de datos (postPilotos)
                    // Por ahora solo mostraré un mensaje de ejemplo
                    console.log('Datos a enviar:', datos);
                    
                    statusMessage.textContent = '¡Piloto registrado exitosamente!';
                    statusMessage.className = 'status-message success';
                    statusMessage.style.display = 'block';
                    formCrearPiloto.reset();
                    previewContainer.style.display = 'none';
                    
                    setTimeout(() => {
                        statusMessage.style.display = 'none';
                    }, 3000);
                };
                reader.readAsDataURL(file);
            } else {
                statusMessage.textContent = 'Por favor, selecciona una imagen para el piloto.';
                statusMessage.className = 'status-message error';
                statusMessage.style.display = 'block';
                
                setTimeout(() => {
                    statusMessage.style.display = 'none';
                }, 3000);
            }
        });
    }
}

customElements.define("pilotos-admin", pilotosAdmin);