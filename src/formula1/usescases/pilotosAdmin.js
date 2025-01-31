export class pilotosAdmin extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
        this.setupEventListeners();
    }
    render(){
        this.innerHTML= /*html*/ `
        <form id="formCrearPiloto"> 
        <div class="mb-3">
            <label for="exampleInputNombre" class="form-label" >Codigo</label>
            <input type="text" class="form-control" id="exampleInputNombre" aria-describedby="NombreHelp">
        </div>
        <div class="mb-3">
            <label for="exampleInputNombre" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="exampleInputNombre" aria-describedby="NombreHelp">
        </div>
        <div class="mb-3">
            <label for="exampleInputRol" class="form-label">Rol</label>
            <input type="text" class="form-control" id="exampleInputRol" aria-describedby="RolHelp">
        </div>
        <div class="mb-3">
        <label for="exampleInputPiloto" class="form-label">Pilotos</label>
        <select class="form-select" >
            <option selected>Seleccionar Piloto</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
        </select>
        </div>
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