import { postPilotos, getPilotos, deletePilotos, patchPilotos} from "../../Apis/pilotosApis.js";
import Swal from 'sweetalert2';

export class pilotosAdmin extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
        this.crearPilotos();
        this.eliminarPiloto();
        this.editarPiloto();
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

            /* Estilos para las tarjetas 3D */
            #pilotosCards {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 50px;
                padding: 20px;
            }

            .elemento__cartao {
                width: 200px;
                height: 300px;
                position: relative;
                display: flex;
                justify-content: center;
                align-items: flex-end;
                padding: 0 36px;
                perspective: 2500px;
                margin: 0;
            }

            .caixa__foto {
                transition: all 0.5s;
                position: absolute;
                width: 100%;
                height: 100%;
                z-index: 1;
                overflow: hidden;
                border-radius: 15px;
            }

            .elemento__cartao:hover .caixa__foto {
                transform: perspective(900px) translateY(-5%) rotateX(25deg) translateZ(0);
                box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.75);
            }

            .elemento__foto__cobertura {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .caixa__foto::before,
            .caixa__foto::after {
                content: "";
                opacity: 0;
                width: 100%;
                height: 80px;
                transition: all 0.5s;
                position: absolute;
                left: 0;
            }

            .caixa__foto::before {
                top: 0;
                height: 100%;
                background-image: linear-gradient(
                    to top,
                    transparent 46%,
                    rgba(12, 13, 19, 0.5) 68%,
                    rgba(12, 13, 19) 0.97
                );
            }

            .caixa__foto::after {
                bottom: 0;
                opacity: 1;
                background-image: linear-gradient(
                    to bottom,
                    transparent 46%,
                    rgba(12, 13, 19, 0.5) 68%,
                    rgba(12, 13, 19) 0.97
                );
            }

            .elemento__cartao:hover .caixa__foto::before,
            .elemento__cartao:hover .caixa__foto::after {
                opacity: 1;
            }

            .elemento__cartao:hover .caixa__foto::after {
                height: 120px;
            }

            .card__info {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                padding: 15px;
                color: white;
                text-align: center;
                z-index: 2;
                transition: transform 0.5s;
                background: rgba(0, 0, 0, 0.7);
                border-radius: 0 0 15px 15px;
            }

            .elemento__cartao:hover .card__info {
                transform: translateY(-20px);
            }

            .card__title {
                margin: 0;
                font-size: 1.2em;
                font-weight: bold;
                color: var(--text-primary);
            }

            .card__pais,
            .card__rol {
                margin: 5px 0;
                font-size: 0.9em;
                color: var(--text-secondary);
            }

            .btnEditarForm,
            .btnEliminar {
                background: var(--accent-color);
                color: white;
                border: none;
                padding: 5px 10px;
                margin: 5px;
                border-radius: 5px;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .btnEliminar {
                background: var(--error-color);
            }

            .btnEditarForm:hover {
                background: var(--accent-hover);
                transform: translateY(-2px);
            }

            .btnEliminar:hover {
                background: #dc2626;
                transform: translateY(-2px);
            }

            @media (max-width: 768px) {
                .card {
                    padding: 2rem;
                }

                .elemento__cartao {
                    width: 160px;
                    height: 240px;
                }
            }
        </style>

        <div class="card">
            <div class="card-header">
                <h2>Registro de Piloto</h2>
            </div>
            <form id="formCrearPiloto">
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
                        <option value="">Seleccionar Equipo</option>
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

                <button type="submit" class="btn-submit" id="btnRegistrarPiloto">
                    Registrar Piloto
                </button>

                <div id="statusMessage" class="status-message"></div>
            </form>
        </div>

        <div class="card">
            <h1>Conoce nuestros Pilotos</h1>
            <button id="btnListarPilotos" type="submit" class="btn-submit">↓</button>
            <div id="pilotosCards">
            <!--Aquí se llamarán las cartas desde archivo JS-->
            </div>
        </div>
        `;
        this.addEventListener();

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
    }

    addEventListener() {
        this.shadowRoot.querySelector('#btnListarPilotos').addEventListener("click", (e) => {
            this.mostrarPilotos();
        });
    }

    crearPilotos() {
        const formCrearPiloto = this.shadowRoot.querySelector('#formCrearPiloto');
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
        });// Manejo del envío del formulario
        this.shadowRoot.querySelector('#btnRegistrarPiloto').addEventListener("click", (e) => {
            e.preventDefault();
            const formData = new FormData(formCrearPiloto);

            const file = fileInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const datos = Object.fromEntries(formData.entries());
                    datos.imagenPiloto = reader.result;

                    postPilotos(datos)
                        .then(response => {
                            if (response.ok) {
                                return response.json();
                            }
                            throw new Error(`Error: ${response.status} - ${response.statusText}`);
                        })
                        .then(responseData => {
                            console.log('Respuesta exitosa:', responseData);
                            statusMessage.textContent = '¡Piloto registrado exitosamente!';
                            statusMessage.className = 'status-message success';
                            statusMessage.style.display = 'block';
                            formCrearPiloto.reset();
                            previewContainer.style.display = 'none';
                            setTimeout(() => {
                                statusMessage.style.display = 'none';
                            }, 3000);
                        })
                        .catch(error => {
                            console.error('Error:', error.message);
                            statusMessage.textContent = 'Error al registrar el piloto. Por favor, intente nuevamente.';
                            statusMessage.className = 'status-message error';
                            statusMessage.style.display = 'block';
                        });
                };
                reader.readAsDataURL(file);
            }
        });
    }

    mostrarPilotos = () => {
        getPilotos()
        .then((pilotos) => {
            const pilotosCards = this.shadowRoot.querySelector('#pilotosCards');
            pilotosCards.innerHTML = '';

            fetch('../../../db.json')
            .then(response => response.json())
            .then(data => {
                const equiposMap = data.equipos.reduce((acc, equipo) => {
                    acc[equipo.id] = equipo.nombreEquipo;
                    return acc;
                }, {});

                pilotos.forEach((piloto) => {
                    const { equipoPiloto } = piloto;
                    const equipoNombre = equiposMap[equipoPiloto];

                    const divItems = document.createElement('div');
                    divItems.classList.add('col');

                    divItems.innerHTML = /*html*/ `
                        <div class="elemento__cartao">
                            <div class="caixa__foto">
                                <img src="${piloto.imagenPiloto}" alt="Imagen del Piloto" class="elemento__foto__cobertura">
                            </div>
                            <div class="card__info">
                                <h1 class="card__title">${piloto.nombrePiloto}</h1>
                                <p class="card__pais">${equipoNombre}</p>
                                <p class="card__rol">${piloto.rolPiloto}</p>
                                <div>
                                    <button class="btnEditarForm" data-id="${piloto.id}">Editar</button>
                                    <button class="btnEliminar" data-id="${piloto.id}">Eliminar</button>
                                </div>
                            </div>
                        </div>
                        <form id="formEditarPiloto" style="display: none;">
                        </form>
                    `;
                    pilotosCards.appendChild(divItems);
                });

                this.eliminarPiloto();
                this.shadowRoot.querySelectorAll('.btnEditarForm').forEach((btnEditarForm) => {
                    btnEditarForm.addEventListener("click", (e) => {
                        const id = e.target.getAttribute("data-id");
                        this.mostrarFormularioEdit(id);
                    });
                });
            })
            .catch((error) => {
                console.error('Error al cargar los equipos:', error);
            });
        })
        .catch ((error) => {
            console.error('Error en la solicitud GET:', error.message);
        });
    }

    eliminarPiloto() {
        const pilotosCards = this.shadowRoot.querySelector("#pilotosCards");
    
        pilotosCards.addEventListener("click", async (e) => {
            if (e.target.classList.contains("btnEliminar")) {
                const id = e.target.getAttribute("data-id");
    
                if (!id) {
                    console.error("ID del piloto no encontrado.");
                    return;
                }
    
                const confirmacion = await Swal.fire({
                    title: "¿Está seguro de eliminar el piloto?",
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
                        const response = await deletePilotos(id);
    
                        if (!response || !response.ok) {
                            throw new Error(`Error ${response ? response.status : "desconocido"}`);
                        }
    
                        Swal.fire("Eliminado", "El piloto ha sido eliminado.", "success");
                        this.mostrarPilotos();
                    } catch (error) {
                        console.error("Error al eliminar el piloto:", error);
                        Swal.fire("Error", "No se pudo eliminar el piloto.", "error");
                    }
                }
            }
        });
    }

    mostrarFormularioEdit = (id) => {
        const formEditarPiloto = this.shadowRoot.querySelector('#formEditarPiloto');
        formEditarPiloto.style.display = 'none';
        
        getPilotos()
        .then((pilotos) => {
            const piloto = pilotos.find((piloto) => piloto.id === id);
            if (piloto) {
                const {nombrePiloto, rolPiloto, equipoPiloto, imagenPiloto } = piloto;

                formEditarPiloto.innerHTML = /*html*/ `
                <div class="form-group">
                    <label for="nombrePiloto" class="form-label">Nombre</label>
                    <input type="text" class="form-control" id="nombrePiloto" name="nombrePiloto" value="${nombrePiloto}">
                </div>
                <div class="form-group">
                    <label for="rolPiloto" class="form-label">Rol</label>
                    <input type="text" class="form-control" id="rolPiloto" name="rolPiloto" value="${rolPiloto}">
                </div>
                <div class="form-group">
                    <label for="equipoPiloto" class="form-label">Equipo</label>
                    <select class="form-select" id="equipoPilotoEditar" name="equipoPilotoEditar">
                        <option value="">Seleccionar Equipo</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="imagenPiloto" class="form-label">Imagen del Piloto</label>
                    <div class="image-upload-container" id="dropZone">
                        <i>📁</i>
                        <p class="image-upload-text">Arrastra una imagen aquí o haz clic para seleccionar</p>
                        <input type="file" class="file-input" id="imagenPiloto" name="imagenPiloto" accept="image/*">
                    </div>
                    <div class="preview-container" style="display: block;">
                        <img class="preview-image" id="imagePreview" src="${imagenPiloto}" alt="Preview">
                    </div>
                </div>

                <button type="submit" class="btn-submit" id="btnEditarPiloto" data-id="${id}">
                    Editar Piloto
                </button>
                `;
                formEditarPiloto.style.display = 'block';
                
                fetch('../../../db.json')
                .then(response => response.json()) 
                .then(data => {
                    const equipoPilotoEditar = this.shadowRoot.querySelector("#equipoPilotoEditar");
                    
                    data.equipos.forEach(equipo => {
                        const option = document.createElement("option");
                        option.value = equipo.id;
                        option.textContent = equipo.nombreEquipo;
                        equipoPilotoEditar.appendChild(option);
                    });
                })
                this.editarPiloto();
            }
        })
        .catch((error) => {
            console.error('Error en la solicitud GET:', error.message);
        });
    }
    
    editarPiloto() {
        const formEditarPiloto = this.shadowRoot.querySelector('#formEditarPiloto');
        
        this.shadowRoot.querySelector('#btnEditarPiloto').addEventListener("click", (e) => {
            e.preventDefault();
            
            const datos = Object.fromEntries(new FormData(formEditarPiloto).entries());
            const id = e.target.getAttribute("data-id");
    
            const equipoID = datos.equipoPilotoEditar;
    
            fetch('../../../db.json')
                .then(response => response.json())
                .then(data => {
                    const equiposMap = data.equipos.reduce((acc, equipo) => {
                        acc[equipo.id] = equipo.nombreEquipo;
                        return acc;
                    }, {});
    
                    const equipoNombre = equiposMap[equipoID];
    
                    if (equipoNombre) {
                        datos.equipoPiloto = equipoNombre;
    
                        delete datos.equipoPilotoEditar;
    
                        patchPilotos(datos, id)
                            .then(response => {
                                if (response.ok) {
                                    return response.json();
                                } else {
                                    throw new Error(`Error en la solicitud PATCH: ${response.status} - ${response.statusText}`);
                                }
                            })
                            .then(responseData => {
                                console.log("Piloto actualizado:", responseData);
                                Swal.fire({
                                    icon: 'success',
                                    title: '¡Éxito!',
                                    text: 'El piloto ha sido editado correctamente.',
                                });
                                this.mostrarPilotos();
                            })
                            .catch(error => {
                                console.error('Error en la solicitud PATCH:', error.message);
                                Swal.fire({
                                    icon: 'error',
                                    title: '¡Error!',
                                    text: 'Hubo un problema al editar el piloto.',
                                });
                            });
                    } else {
                        console.error("Equipo no encontrado");
                    }
                })
                .catch(error => {
                    console.error('Error al obtener equipos:', error.message);
                });
        });
    }
}

customElements.define("pilotos-admin", pilotosAdmin);