import Swal from 'sweetalert2';
import { postEquipos, getEquipos, deleteEquipos, patchEquipos } from "../../Apis/equiposApis.js";

export class equiposAdmin extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
        this.crearEquipo();
        this.eliminarEquipo();
        this.editarEquipo();
    }

    render() {
        let idEquipo = Date.now();
        this.shadowRoot.innerHTML = /*html*/`
        <style>
            :host {
                display: block;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                --bg-primary: #1a1a1a;
                --bg-secondary: #2d2d2d;
                --text-primary: #ffffff;
                --text-secondary: #b3b3b3;
                --accent-color:rgba(192, 54, 54, 0.74);
                --accent-hover:rgb(137, 15, 15);
                --border-color: #404040;
                --error-color:rgb(79, 2, 2);
                --success-color: #10b981;
                --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
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

            /* Nuevo estilo para las tarjetas de equipos */
            #equiposCards {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 2rem;
                padding: 2rem;
            }

            #card__listar {
                background: var(--bg-secondary);
                border-radius: 15px;
                overflow: hidden;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
                box-shadow: var(--card-shadow);
                display: flex;
                flex-direction: column;
                height: 90%;
            }

            #card__listar:hover {
                transform: translateY(-5px);
                box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
            }

            #card__listar img {
                width: 200px;
                height: 200px;
                object-fit: contain;
                margin: 1.5rem auto;
                padding: 1rem;
                background: var(--bg-primary);
                border-radius: 10px;
            }

            .card__content {
                padding: 1.5rem;
                flex-grow: 1;
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }

            .card__title {
                color: var(--text-primary);
                font-size: 1.5rem;
                margin: 0;
                text-align: center;
            }

            .card__pais {
                color: var(--text-secondary);
                font-size: 1.1rem;
                margin: 0.5rem 0;
                text-align: center;
            }

            .card__motor {
                color: var(--accent-color);
                font-size: 1.1rem;
                margin: 0;
                text-align: center;
                font-weight: 500;
            }

            .card__actions {
                display: flex;
                gap: 1rem;
                padding: 1.5rem;
                justify-content: center;
                background: #2d2d2d;
                margin-top: auto;
            }

            .btnEditarForm, .btnEliminar {
                padding: 0.75rem 1.5rem;
                border: none;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 0.9rem;
            }

            .btnEditarForm {
                background-color: var(--accent-color);
                color: white;
            }

            .btnEditarForm:hover {
                background-color: var(--accent-hover);
            }

            .btnEliminar {
                background-color: var(--error-color);
                color: white;
            }

            .btnEliminar:hover {
                background-color: #dc2626;
            }
        </style>

        <div class="card">
            <div class="card-header">
                <h2>Registro de Equipo</h2>
            </div>
            <form id="formCrearEquipo">
                <div class="codigo" style="display: none;">
                    <label for="idEquipo" class="form-label">COD</label>
                    <input type="number" class="form-control" id="idEquipo" name ="idEquipo" placeholder="${idEquipo}" disabled>
                </div>
                <div class="form-grid">
                    <div class="form-group">
                        <label class="form-label" for="nombreEquipo">Nombre del Equipo</label>
                        <input type="text" class="form-control" id="nombreEquipo" name="nombreEquipo" placeholder="Ingrese el nombre del equipo">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="paisEquipo">País</label>
                        <input type="text" class="form-control" id="paisEquipo" name="paisEquipo" placeholder="Ingrese el país">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="motorEquipo">Motor</label>
                        <input type="text" class="form-control" id="motorEquipo" name="motorEquipo" placeholder="Especifique el motor">
                    </div>
                    <div class="form-group">
                        <label for="nombrePiloto" class="form-label">Piloto</label>
                        <select class="nombrePilotoVeh" name="nombrePiloto1">
                            <option value="">Seleccionar Piloto</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="nombrePiloto" class="form-label">Piloto</label>
                        <select class="nombrePilotoVeh" name="nombrePiloto2">
                            <option value="">Seleccionar Piloto</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="imagenEquipo">Imagen del Equipo</label>
                        <div class="image-upload-container" id="dropZone">
                            <i>📁</i>
                            <p class="image-upload-text">Arrastra una imagen aquí o haz clic para seleccionar</p>
                            <input type="file" class="file-input" id="imagenEquipo" name="imagenEquipo" accept="image/*">
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
        this.addEventListener();

        fetch('../../../db.json')
        .then(response => response.json()) 
        .then(data => {
            const selectsPilotos = this.shadowRoot.querySelectorAll(".nombrePilotoVeh"); // Selecciona todos los <select>

            // Iterar sobre cada <select> y añadir los pilotos
            selectsPilotos.forEach(select => {
                data.pilotos.forEach(piloto => {
                    const option = document.createElement("option");
                    option.value = piloto.id;
                    option.textContent = piloto.nombrePiloto;
                    select.appendChild(option); // Agregar opción al select correspondiente
                });
            });
        })
        .catch(error => {
            console.error("Error al cargar los datos de los pilotos:", error);
        });
    }

    addEventListener(){
        this.shadowRoot.querySelector('#btnListar').addEventListener("click", (e) => {
            this.mostrarEquipos();
        });
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
                    datos.imagenEquipo = reader.result;

                    const equipo = {
                        nombreEquipo: datos.nombreEquipo,
                        paisEquipo: datos.paisEquipo,
                        motorEquipo: datos.motorEquipo,
                        pilotos: [datos.nombrePiloto1, datos.nombrePiloto2], // IDs de pilotos
                        imagenEquipo: datos.imagenEquipo
                    }
                    
                    postEquipos(equipo)
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

    mostrarEquipos = () => {
        getEquipos()
        .then((equipos) => {
            const equiposCards = this.shadowRoot.querySelector('#equiposCards');
            equiposCards.innerHTML = '';
            
            equipos.forEach((equipo) => {
                const divItems = document.createElement('div');
                divItems.classList.add('col');
                divItems.innerHTML = /*html*/ `
                <div id="card__listar" class="card">
                    <img src="${equipo.imagenEquipo}" alt="${equipo.nombreEquipo} Logo">
                    <div class="card__content">
                        <h1 class="card__title">${equipo.nombreEquipo}</h1>
                        <p class="card__pais">🌍 ${equipo.paisEquipo}</p>
                        <p class="card__motor">⚡ ${equipo.motorEquipo}</p>
                    </div>
                    <div class="card__actions">
                        <button class="btnEditarForm" data-id="${equipo.id}">Editar</button>
                        <button class="btnEliminar" data-id="${equipo.id}">Eliminar</button>
                    </div>
                </div>
                <form id="formEditarEquipo" style="display: none;">
                </form>
                `;
                equiposCards.appendChild(divItems);
            });

            this.eliminarEquipo();
            this.shadowRoot.querySelectorAll('.btnEditarForm').forEach((btnEditarForm) => {
                btnEditarForm.addEventListener("click", (e) => {
                    const id = e.target.getAttribute("data-id");
                    this.mostrarFormularioEdit(id);
                });
            });
        }).catch ((error) => {
            console.error('Error en la solicitud GET:', error.message);
        });
    }

    eliminarEquipo() {
        const equiposCards = this.shadowRoot.querySelector("#equiposCards");
    
        equiposCards.addEventListener("click", async (e) => {
            if (e.target.classList.contains("btnEliminar")) {
                const id = e.target.getAttribute("data-id");
    
                if (!id) {
                    console.error("ID del equipo no encontrado.");
                    return;
                }
    
                const confirmacion = await Swal.fire({
                    title: "¿Está seguro de eliminar el equipo?",
                    text: "Esta acción no se puede deshacer.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Sí, eliminar",
                    cancelButtonText: "Cancelar"
                });
    
                if (confirmacion.isConfirmed) {
                    try {
                        const response = await deleteEquipos(id);
    
                        if (!response || !response.ok) {
                            throw new Error(`Error ${response ? response.status : "desconocido"}`);
                        }
    
                        Swal.fire("Eliminado", "El equipo ha sido eliminado.", "success");
                        this.mostrarEquipos();
                    } catch (error) {
                        console.error("Error al eliminar el equipo:", error);
                        Swal.fire("Error", "No se pudo eliminar el equipo.", "error");
                    }
                }
            }
        });
    }   

    mostrarFormularioEdit = (id) => {
        const formEditarEquipo = this.shadowRoot.querySelector('#formEditarEquipo');
        formEditarEquipo.style.display = 'none';
        
        getEquipos()
        .then((equipos) => {
            const equipo = equipos.find((equipo) => equipo.id === id);
            if (equipo) {
                const {nombreEquipo, paisEquipo, motorEquipo, imagenEquipo } = equipo;

                formEditarEquipo.innerHTML = /*html*/ `
                    <div class="form-grid">
                    <div class="form-group">
                        <label class="form-label" for="nombreEquipo">Nombre del Equipo</label>
                        <input type="text" class="form-control" id="nombreEquipo" name="nombreEquipo" value="${nombreEquipo}">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="paisEquipo">País</label>
                        <input type="text" class="form-control" id="paisEquipo" name="paisEquipo" value="${paisEquipo}">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="motorEquipo">Motor</label>
                        <input type="text" class="form-control" id="motorEquipo" name="motorEquipo" value="${motorEquipo}">
                    </div>
                </div>
    
                <button id="btnEditar" data-id="${id}" type="submit" class="btn-submit">
                    Editar Equipo
                </button>
                `;
    
                formEditarEquipo.style.display = 'block';
                this.editarEquipo();
            }
        })
        .catch((error) => {
            console.error('Error en la solicitud GET:', error.message);
        });
    }
    
    editarEquipo() {
        const formEditarEquipo = this.shadowRoot.querySelector('#formEditarEquipo');
        
        this.shadowRoot.querySelector('#btnEditar').addEventListener("click", (e) => {
            e.preventDefault();
            
            const datos = Object.fromEntries(new FormData(formEditarEquipo).entries());
            const id = e.target.getAttribute("data-id");
            
            patchEquipos(datos, id)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error(`Error en la solicitud PATCH: ${response.status} - ${response.statusText}`);
                    }
                })
                .then(responseData => {
                    console.log("Equipo actualizado:", responseData);
                    Swal.fire({
                        icon: 'success',
                        title: '¡Éxito!',
                        text: 'El equipo ha sido editado correctamente.',
                    });
                    this.mostrarEquipos();
                })
                .catch(error => {
                    console.error('Error en la solicitud PATCH:', error.message);
                    Swal.fire({
                        icon: 'error',
                        title: '¡Error!',
                        text: 'Hubo un problema al editar el equipo.',
                    });
                });
        });
    }
}

customElements.define("equipos-admin", equiposAdmin);