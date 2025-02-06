//Importación sweetalert
import Swal from 'sweetalert2';
//Importa funciones para el manejo de la información en el archivo JSON
import { postEquipos, getEquipos, deleteEquipos, patchEquipos } from "../../Apis/equiposApis.js";

//Componente CRUD equipos
export class equiposAdmin extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
        this.crearEquipo();
        this.eliminarEquipo();
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
                --accent-color: #e10600;
                --accent-hover: #b30500;
                --border-color: #404040;
                --error-color: #dc2626;
                --success-color: #10b981;
                --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            }

            * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
            }

            .card {
                background: var(--bg-secondary);
                border-radius: 15px;
                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
                padding: 2rem;
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
                font-size: 2rem;
                font-weight: 600;
            }

            .form-grid {
                display: grid;
                grid-template-columns: 1fr;
                gap: 1.5rem;
                padding: 1rem;
            }

            @media (min-width: 640px) {
                .form-grid {
                    grid-template-columns: repeat(2, 1fr);
                }

                .form-group:last-child {
                    grid-column: span 2;
                }
            }

            @media (min-width: 1024px) {
                .form-grid {
                    grid-template-columns: repeat(3, 1fr);
                }

                .form-group:last-child {
                    grid-column: span 3;
                }
            }

            .form-group {
                margin-bottom: 1rem;
                width: 100%;
            }

            .form-label {
                display: block;
                margin-bottom: 0.5rem;
                color: var(--text-secondary);
                font-weight: 500;
                font-size: 0.95rem;
            }

            .form-control, .nombrePilotoVeh {
                width: 100%;
                padding: 0.75rem;
                background-color: var(--bg-primary);
                border: 2px solid var(--border-color);
                border-radius: 8px;
                font-size: 1rem;
                color: var(--text-primary);
                transition: all 0.3s ease;
            }

            .form-control:focus, .nombrePilotoVeh:focus {
                outline: none;
                border-color: var(--accent-color);
                box-shadow: 0 0 0 3px rgba(225, 6, 0, 0.2);
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
                padding: 1.5rem;
                cursor: pointer;
                transition: all 0.3s ease;
                background-color: var(--bg-primary);
            }

            .image-upload-container:hover {
                border-color: var(--accent-color);
                background-color: rgba(225, 6, 0, 0.1);
            }

            .preview-container {
                margin-top: 1rem;
                width: 100%;
                display: none;
            }

            .preview-image {
                width: 100%;
                max-height: 200px;
                object-fit: contain;
                border-radius: 8px;
                background: var(--bg-primary);
                padding: 1rem;
            }

            .btn-submit {
                background-color: var(--accent-color);
                color: white;
                border: none;
                border-radius: 8px;
                padding: 1rem 2rem;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                width: 100%;
                max-width: 200px;
                margin: 2rem auto;
                display: block;
            }

            .btn-submit:hover {
                background-color: var(--accent-hover);
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(225, 6, 0, 0.3);
            }

            .btn-submit:active {
                transform: translateY(0);
            }

            #equiposCards {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                gap: 1.5rem;
                padding: 1rem;
            }

            #card__listar {
                background: var(--bg-secondary);
                border-radius: 15px;
                overflow: hidden;
                transition: all 0.3s ease;
                box-shadow: var(--card-shadow);
                display: flex;
                flex-direction: column;
                height: 100%;
                border: 1px solid var(--border-color);
            }

            #card__listar:hover {
                transform: translateY(-5px);
                box-shadow: 0 12px 20px rgba(0, 0, 0, 0.3);
            }

            #card__listar img {
                width: 200px;
                height: 200px;
                object-fit: contain;
                margin: 1.5rem auto;
                padding: 1rem;
                background: var(--bg-primary);
                border-radius: 10px;
                transition: transform 0.3s ease;
            }

            #card__listar:hover img {
                transform: scale(1.05);
            }

            .card__content {
                padding: 1.5rem;
                flex-grow: 1;
                display: flex;
                flex-direction: column;
                gap: 0.8rem;
            }

            .card__title {
                color: var(--text-primary);
                font-size: 1.5rem;
                margin: 0;
                text-align: center;
                font-weight: 600;
            }

            .card__pais, .card__motor {
                margin: 0;
                text-align: center;
                font-size: 1.1rem;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
            }

            .card__pais {
                color: var(--text-secondary);
            }

            .card__motor {
                color: var(--accent-color);
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
                min-width: 100px;
            }

            .btnEditarForm {
                background-color: var(--accent-color);
                color: white;
            }

            .btnEditarForm:hover {
                background-color: var(--accent-hover);
                transform: translateY(-2px);
            }

            .btnEliminar {
                background-color: transparent;
                color: var(--error-color);
                border: 2px solid var(--error-color);
            }

            .btnEliminar:hover {
                background-color: var(--error-color);
                color: white;
                transform: translateY(-2px);
            }

            .status-message {
                padding: 1rem;
                border-radius: 8px;
                margin-top: 1rem;
                display: none;
                text-align: center;
            }

            .status-message.success {
                background-color: var(--success-color);
                color: white;
            }

            .status-message.error {
                background-color: var(--error-color);
                color: white;
            }

            .section-title {
                color: var(--text-primary);
                font-size: 2rem;
                text-align: center;
                margin: 2rem 0;
                font-weight: 600;
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

            /* Responsive Styles */
            @media (max-width: 640px) {
                .card {
                    padding: 1rem;
                    margin: 1rem;
                }

                .card-header h2 {
                    font-size: 1.5rem;
                }

                .section-title {
                    font-size: 1.5rem;
                }

                .btn-submit {
                    width: 90%;
                    max-width: none;
                    margin: 1rem auto;
                }

                .btnEditarForm, .btnEliminar {
                    padding: 0.5rem 1rem;
                    font-size: 0.85rem;
                }

                #card__listar {
                    height: auto;
                }

                #card__listar img {
                    width: 150px;
                    height: 150px;
                }

                .form-label {
                    font-size: 0.85rem;
                }

                .card__title {
                    font-size: 1.25rem;
                }

                .card__pais, .card__motor {
                    font-size: 0.95rem;
                }

                .preview-image {
                    max-height: 150px;
                }
            }

            @media (min-width: 641px) and (max-width: 1023px) {
                .card {
                    padding: 1.5rem;
                }

                .form-grid {
                    grid-template-columns: repeat(2, 1fr);
                }

                #equiposCards {
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                }
            }

            /* Estilos para el modal responsivo */
            .swal2-popup {
                max-width: 95vw !important;
                width: auto !important;
            }

            @media (max-width: 640px) {
                .swal2-popup {
                    padding: 0.5rem !important;
                    width: 90% !important;
                }

                .form-edit {
                    padding: 0.5rem !important;
                }

                .form-edit input,
                .form-edit select {
                    padding: 0.5rem !important;
                    font-size: 0.9rem !important;
                }
            }
        </style>
        <!--Formulario de registro equipos-->
        <div class="card">
            <div class="card-header">
                <h2>Registro de Equipo</h2>
            </div>
            <form id="formCrearEquipo">
                <div class="codigo" style="display: none;">
                    <label for="idEquipo" class="form-label">COD</label>
                    <input type="number" class="form-control" id="idEquipo" name="idEquipo" placeholder="${idEquipo}" disabled>
                </div>
                <!--Nombre equipo-->
                <div class="form-grid">
                    <div class="form-group">
                        <label class="form-label" for="nombreEquipo">Nombre del Equipo</label>
                        <input type="text" class="form-control" id="nombreEquipo" name="nombreEquipo" placeholder="Ingrese el nombre del equipo" required>
                    </div>
                    <!--Pais equipo-->
                    <div class="form-group">
                        <label class="form-label" for="paisEquipo">País</label>
                        <input type="text" class="form-control" id="paisEquipo" name="paisEquipo" placeholder="Ingrese el país" required>
                    </div>
                    <!--Motor equipo-->
                    <div class="form-group">
                        <label class="form-label" for="motorEquipo">Motor</label>
                        <input type="text" class="form-control" id="motorEquipo" name="motorEquipo" placeholder="Especifique el motor" required>
                    </div>
                    <!--Piloto principal-->
                    <div class="form-group">
                        <label for="nombrePiloto1" class="form-label">Piloto Principal</label>
                        <select class="nombrePilotoVeh form-control" name="nombrePiloto1" required>
                            <option value="">Seleccionar Piloto</option>
                        </select>
                    </div>
                    <!--Piloto secundario-->
                    <div class="form-group">
                        <label for="nombrePiloto2" class="form-label">Piloto Secundario</label>
                        <select class="nombrePilotoVeh form-control" name="nombrePiloto2" required>
                            <option value="">Seleccionar Piloto</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="imagenEquipo">Imagen del Equipo</label>
                        <div class="image-upload-container" id="dropZone">
                            <i>📁</i>
                            <p class="image-upload-text">Arrastra una imagen aquí o haz clic para seleccionar</p>
                            <input type="file" class="file-input" id="imagenEquipo" name="imagenEquipo" accept="image/*" required>
                        </div>
                        <div class="preview-container">
                            <img class="preview-image" id="imagePreview" alt="Preview">
                        </div>
                    </div>
                </div>
                <!--Evento al registrar el equipo-->
                <button id="btnRegistrar" type="submit" class="btn-submit">
                    Registrar Equipo
                </button>
                <div id="statusMessage" class="status-message"></div>
            </form>
        </div>

        <div class="card">
            <h2 class="section-title">Nuestros Equipos</h2>
            <button id="btnListar" type="button" class="btn-submit">
                Mostrar Equipos
            </button>
            <div id="equiposCards">
                <!-- Aquí se cargarán las tarjetas dinámicamente -->
            </div>
        </div>
        `;
        //Función para el manejo de eventos
        this.addEventListener();

        // Cargar pilotos desde db.json
        fetch('../../../db.json')
            .then(response => response.json())
            .then(data => {
                //Itera sobre los selects mostrando los nombres de los pilotos registrados
                const selectsPilotos = this.shadowRoot.querySelectorAll(".nombrePilotoVeh");
                selectsPilotos.forEach(select => {
                    data.pilotos.forEach(piloto => {
                        const option = document.createElement("option");
                        option.value = piloto.id;
                        option.textContent = piloto.nombrePiloto;
                        select.appendChild(option);
                    });
                });
            })
            .catch(error => {
                console.error("Error al cargar los datos de los pilotos:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudieron cargar los pilotos. Por favor, recarga la página.',
                });
            });
    }

    /**
     * Manejo de evento para mostrar equipos registrados
     */
    addEventListener() {
        this.shadowRoot.querySelector('#btnListar').addEventListener("click", () => {
            this.mostrarEquipos();
        });
    }

    /**
     * Crea un equipo
     */
    crearEquipo = () => {
        const formCrearEquipo = this.shadowRoot.querySelector('#formCrearEquipo');
        const dropZone = this.shadowRoot.querySelector('#dropZone');
        const fileInput = this.shadowRoot.querySelector('.file-input');
        const previewContainer = this.shadowRoot.querySelector('.preview-container');
        const imagePreview = this.shadowRoot.querySelector('#imagePreview');
        const statusMessage = this.shadowRoot.querySelector('#statusMessage');

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

        dropZone.addEventListener('click', () => fileInput.click());
        
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.style.borderColor = 'var(--accent-color)';
            dropZone.style.backgroundColor = 'rgba(225, 6, 0, 0.1)';
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

        formCrearEquipo.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(formCrearEquipo);

            // Validar campos requeridos
            const requiredFields = ['nombreEquipo', 'paisEquipo', 'motorEquipo', 'nombrePiloto1', 'nombrePiloto2'];
            const missingFields = requiredFields.filter(field => !formData.get(field));
            
            if (missingFields.length > 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Campos Requeridos',
                    text: 'Por favor, complete todos los campos requeridos.',
                });
                return;
            }

            const file = fileInput.files[0];
            if (!file) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Imagen Requerida',
                    text: 'Por favor, seleccione una imagen para el equipo.',
                });
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                //Toma los datos en el formulario de registro
                const datos = Object.fromEntries(formData.entries());
                datos.imagenEquipo = reader.result;

                //Ordena los datos para enviarlos
                const equipo = {
                    nombreEquipo: datos.nombreEquipo,
                    paisEquipo: datos.paisEquipo,
                    motorEquipo: datos.motorEquipo,
                    pilotos: [datos.nombrePiloto1, datos.nombrePiloto2],
                    imagenEquipo: datos.imagenEquipo
                };
                
                //Envia los datos del equipo
                postEquipos(equipo)
                    .then(response => {
                        if (!response.ok) throw new Error(`Error: ${response.status}`);
                        return response.json();
                    })
                    .then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: '¡Éxito!',
                            text: 'Equipo registrado exitosamente',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        formCrearEquipo.reset(); //Limpia el formulario
                        previewContainer.style.display = 'none';
                        this.mostrarEquipos(); //Actualiza la lista de equipos
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'No se pudo registrar el equipo. Por favor, intente nuevamente.',
                        });
                    });
            };
            reader.readAsDataURL(file);
        });
    }

    /**
     * Mostrar equipos registrados
     */
    mostrarEquipos = () => {
        //Obtiene la información de los equipos
        getEquipos()
            .then((equipos) => {
                //Toma el contenedor para almacenar los datos
                const equiposCards = this.shadowRoot.querySelector('#equiposCards');
                equiposCards.innerHTML = '';
                
                //Por cada equipo registrado muestra la información
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
                            <!--Eventos de edición y eliminación-->
                            <div class="card__actions">
                                <button class="btnEditarForm" data-id="${equipo.id}">Editar</button>
                                <button class="btnEliminar" data-id="${equipo.id}">Eliminar</button>
                            </div>
                        </div>
                    `;
                    //Añade ñas cartas
                    equiposCards.appendChild(divItems);
                });

                //Evento de editar el equipo
                this.shadowRoot.querySelectorAll('.btnEditarForm').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const id = e.target.getAttribute('data-id'); //Crea un atributo al botón para obtener el id del equipo
                        this.mostrarFormularioEdit(id); //Muestra formulario de edición
                    });
                });
            })
            .catch((error) => {
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudieron cargar los equipos.',
                });
            });
    }

    /**
     * Eliminar equipos
     */
    eliminarEquipo() {
        //Toma las cartas de los equipos
        const equiposCards = this.shadowRoot.querySelector("#equiposCards");
    
        //Maneja el evento de eliminar equipo
        equiposCards.addEventListener("click", async (e) => {
            if (e.target.classList.contains("btnEliminar")) {
                const id = e.target.getAttribute("data-id"); //Crea un atributo al botón para obtener el id del equipo
    
                if (!id) {
                    console.error("ID del equipo no encontrado.");
                    return;
                }
    
                //Confirmación de la operación
                const result = await Swal.fire({
                    title: '¿Eliminar equipo?',
                    text: "Esta acción no se puede deshacer",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#dc2626',
                    cancelButtonColor: '#6B7280',
                    confirmButtonText: 'Sí, eliminar',
                    cancelButtonText: 'Cancelar'
                });
                //Si se confirma la eliminación
                if (result.isConfirmed) {
                    try {
                        //Elimina el equipo del JSON
                        const response = await deleteEquipos(id);
                        if (!response.ok) throw new Error(`Error ${response.status}`);
                        
                        Swal.fire({
                            icon: 'success',
                            title: 'Eliminado',
                            text: 'El equipo ha sido eliminado exitosamente',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.mostrarEquipos(); //Actualiza la lista de equipos
                    } catch (error) {
                        console.error("Error:", error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'No se pudo eliminar el equipo',
                        });
                    }
                }
            }
        });
    }

    //Muestra formulario de edición
    mostrarFormularioEdit = async (id) => {
        try {
            //Obtiene el equipo a editar
            const [equipos, dbData] = await Promise.all([
                getEquipos(),
                fetch('../../../db.json').then(response => response.json())
            ]);
            
            //Itera sobre los equipos buscando el id como parametro
            const equipo = equipos.find(e => e.id === id);
            if (!equipo) throw new Error('Equipo no encontrado');

            //Itera sobre cada uno de los pilotos para obtener su nombre 
            const pilotosOptions = dbData.pilotos.map(piloto => 
                `<option value="${piloto.id}" ${equipo.pilotos[0] === piloto.id ? 'selected' : ''}>${piloto.nombrePiloto}</option>`
            ).join('');

            const pilotosOptions2 = dbData.pilotos.map(piloto => 
                `<option value="${piloto.id}" ${equipo.pilotos[1] === piloto.id ? 'selected' : ''}>${piloto.nombrePiloto}</option>`
            ).join('');

            const result = await Swal.fire({
                title: 'Editar Equipo',
                html: `
                    <style>
                        .swal2-popup {
                            background: #2d2d2d !important;
                            color: #ffffff !important;
                        }
                        .swal2-title {
                            color: #ffffff !important;
                        }
                        .form-edit {
                            display: flex;
                            flex-direction: column;
                            gap: 1rem;
                            padding: 1rem;
                        }
                        .form-edit .form-group {
                            display: flex;
                            flex-direction: column;
                            gap: 0.5rem;
                        }
                        .form-edit label {
                            color: #b3b3b3;
                            font-size: 0.9rem;
                            font-weight: 500;
                            text-align: left;
                        }
                        .form-edit input,
                        .form-edit select {
                            width: 100%;
                            padding: 0.75rem;
                            background-color: #1a1a1a;
                            border: 2px solid #404040;
                            border-radius: 8px;
                            color: #ffffff;
                            font-size: 1rem;
                            transition: all 0.3s ease;
                        }
                        .form-edit input:focus,
                        .form-edit select:focus {
                            outline: none;
                            border-color: #e10600;
                            box-shadow: 0 0 0 3px rgba(225, 6, 0, 0.2);
                        }
                        .form-edit select option {
                            background-color: #1a1a1a;
                            color: #ffffff;
                        }
                        .swal2-confirm {
                            background-color: #e10600 !important;
                        }
                        .swal2-confirm:hover {
                            background-color: #b30500 !important;
                        }
                        .swal2-cancel {
                            background-color: #4b5563 !important;
                        }
                    </style>
                    <!--Formulario de edición-->
                    <form id="formEditarEquipo" class="form-edit">
                        <div class="form-group">
                            <label for="nombreEquipo">Nombre del Equipo</label>
                            <input type="text" id="nombreEquipo" value="${equipo.nombreEquipo}" placeholder="Nombre del equipo">
                        </div>
                        <div class="form-group">
                            <label for="paisEquipo">País</label>
                            <input type="text" id="paisEquipo" value="${equipo.paisEquipo}" placeholder="País">
                        </div>
                        <div class="form-group">
                            <label for="motorEquipo">Motor</label>
                            <input type="text" id="motorEquipo" value="${equipo.motorEquipo}" placeholder="Motor">
                        </div>
                        <div class="form-group">
                            <label for="piloto1">Piloto Principal</label>
                            <select id="piloto1">
                                <option value="">Seleccionar Piloto</option>
                                ${pilotosOptions}
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="piloto2">Piloto Secundario</label>
                            <select id="piloto2">
                                <option value="">Seleccionar Piloto</option>
                                ${pilotosOptions2}
                            </select>
                        </div>
                    </form>
                `,
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Guardar Cambios',
                cancelButtonText: 'Cancelar',
                background: '#2d2d2d',
                color: '#ffffff',
                confirmButtonColor: '#e10600',
                cancelButtonColor: '#4b5563',
                preConfirm: () => {
                    const piloto1 = document.getElementById('piloto1').value;
                    const piloto2 = document.getElementById('piloto2').value;

                    if (!piloto1 || !piloto2) {
                        Swal.showValidationMessage('Por favor seleccione ambos pilotos');
                        return false;
                    }
                    //Retorna los valores de los campos del formulario
                    return {
                        nombreEquipo: document.getElementById('nombreEquipo').value,
                        paisEquipo: document.getElementById('paisEquipo').value,
                        motorEquipo: document.getElementById('motorEquipo').value,
                        pilotos: [piloto1, piloto2]
                    };
                }
            });

            if (result.isConfirmed) {
                const response = await patchEquipos(result.value, id);
                if (!response.ok) throw new Error('Error al actualizar');

                Swal.fire({
                    icon: 'success',
                    title: '¡Actualizado!',
                    text: 'El equipo ha sido actualizado exitosamente',
                    showConfirmButton: false,
                    timer: 1500
                });
                this.mostrarEquipos(); //Llama a la función para mostrar los equipos
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo actualizar el equipo',
            });
        }
    }
}

customElements.define("equipos-admin", equiposAdmin);