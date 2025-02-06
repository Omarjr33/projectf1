//Importa funciones para el manejo de la información en el archivo JSON
import { deleteCircuitos, getCircuitos, patchCircuitos, postCircuitos } from "../../Apis/circuitosApis.js";
//Importación sweetalert
import Swal from 'sweetalert2';

//Componente CRUD circuitos
export class CircuitosAdmin extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render(){
        let idCircuito = Date.now();
        this.shadowRoot.innerHTML = /*html*/`
        <style>
            :host {
                display: block;
                font-family: 'Segoe UI', system-ui, sans-serif;
                background:#1e1e1e;
                min-height: 100vh;
                padding: 0rem;
            }

            .card {
                background: #2d2d2d;
                border-radius: 12px;
                padding: 2rem;
                box-shadow: 0 8px 24px rgba(0,0,0,0.2);
                color: #ffffff;
                transition: transform 0.2s ease;
                margin-bottom: 2rem;
            }

            .row {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 2rem;
                margin-bottom: 1rem;
            }

            .form-group {
                margin-bottom: 1.5rem;
            }

            label {
                display: block;
                margin-bottom: 0.5rem;
                font-size: 0.9rem;
                color: #9ca3af;
            }

            input, select {
                width: 95%;
                padding: 0.75rem;
                border: 2px solid #404040;
                background: #1a1a1a;
                border-radius: 6px;
                color: #ffffff;
                font-size: 1rem;
                transition: all 0.2s ease;
            }

            input:focus, select:focus {
                outline: none;
                border-color: rgb(183, 16, 16);
                box-shadow: 0 0 0 2px rgba(183, 16, 16, 0.2);
            }

            button {
                background: rgb(183, 16, 16);
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 6px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
            }

            button:hover {
                background: rgb(93, 8, 8);
                transform: translateY(-1px);
            }

            h1 {
                color: #ffffff;
                margin-bottom: 1.5rem;
                font-size: 1.8rem;
            }

            #circuitosCards {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 2rem;
            }

            .circuit-card {
                background: #1a1a1a;
                border-radius: 12px;
                overflow: hidden;
                transition: transform 0.3s ease;
            }

            .circuit-card:hover {
                transform: translateY(-5px);
            }

            .circuit-card img {
                width: 100%;
                height: 200px;
                object-fit: cover;
            }

            .circuit-content {
                padding: 1.5rem;
            }

            .circuit-content h2 {
                color: #ffffff;
                margin: 0 0 1rem 0;
                font-size: 1.5rem;
            }

            .circuit-content p {
                color: #9ca3af;
                margin: 0.5rem 0;
            }

            .circuit-actions {
                display: flex;
                gap: 1rem;
                padding: 1rem 1.5rem;
                background: rgba(0, 0, 0, 0.1);
            }

            .btnEditarForm, .btnEliminar {
                flex: 1;
            }

            .btnEliminar {
                background: #dc2626;
            }

            .btnEliminar:hover {
                background: #991b1b;
            }

            .status-message {
                padding: 1rem;
                border-radius: 6px;
                margin-top: 1rem;
                text-align: center;
                display: none;
            }

            .status-message.success {
                background: #059669;
                color: white;
            }

            .status-message.error {
                background: #dc2626;
                color: white;
            }

            .section-title {
                color: #ffffff;
                font-size: 1.2rem;
                margin: 2rem 0 1rem;
                padding-bottom: 0.5rem;
                border-bottom: 2px solid #7e0804
            }

            @media (max-width: 768px) {
                :host {
                    padding: 1rem;
                }

                .row {
                    grid-template-columns: 1fr;
                }

                .circuit-actions {
                    flex-direction: column;
                }
            }
        </style>
        <!--Formulario de registro circuitos-->
        <div class="card">
            <form id="formCrearCircuito">
                <h1>Registro de Circuito</h1>
                <!--Nombre circuito-->
                <div class="row">
                    <div class="form-group">
                        <label for="nombreCircuito">Nombre Circuito</label>
                        <input type="text" id="nombreCircuito" name="nombreCircuito" placeholder="Ingrese nombre del circuito" required>
                    </div>
                    <!--País circuito-->
                    <div class="form-group">
                        <label for="paisCircuito">País</label>
                        <input type="text" id="paisCircuito" name="paisCircuito" placeholder="Ingrese país" required>
                    </div>
                </div>
                <!--Número de vueltas circuito-->
                <div class="row">
                    <div class="form-group">
                        <label for="vueltas">Vueltas</label>
                        <input type="number" id="vueltas" name="vueltas" placeholder="Número de vueltas" required>
                    </div>
                    <!--Longitud circuito-->
                    <div class="form-group">
                        <label for="longitud">Longitud (km)</label>
                        <input type="number" id="longitud" name="longitud" placeholder="Longitud en kilómetros" step="0.001" required>
                    </div>
                </div>
                <!--URL imágen circuito-->
                <div class="row">
                    <div class="form-group">
                        <label for="imagenCircuito">Imagen (URL)</label>
                        <input type="url" id="imagenCircuito" name="imagenCircuito" placeholder="URL de la imagen" required>
                    </div>
                    <!--Descripción circuito-->
                    <div class="form-group">
                        <label for="descripcion">Descripción</label>
                        <input type="text" id="descripcion" name="descripcion" placeholder="Descripción del circuito" required>
                    </div>
                </div>
                <!--Record vuelta-->
                <div class="section-title">Record Vuelta</div>
                <div class="row">
                    <!--Tiempo vuelta record-->
                    <div class="form-group">
                        <label for="tiempo">Tiempo</label>
                        <input type="text" id="tiempo" name="tiempo" placeholder="Tiempo" required>
                    </div>
                    <!--Piloto vuelta record-->
                    <div class="form-group">
                        <label for="piloto">Piloto</label>
                        <input type="text" id="piloto" name="piloto" placeholder="Piloto" required>
                    </div>
                    <!--Año vuelta record-->
                    <div class="form-group">
                        <label for="año">Año</label>
                        <input type="text" id="año" name="año" placeholder="Año" required>
                    </div>
                </div>
                <!--Podio de Ganadores-->
                <div class="section-title">Ganadores</div>
                <div class="row">
                    <div class="form-group">
                        <!--Ganador última temporada-->
                        <label for="temporada1">Última Temporada</label>
                        <input type="text" id="temporada1" name="temporada1" placeholder="Año" required>
                        <label for="nombrePiloto1">Piloto</label>
                        <!--Usa como valor los ids de los pilotos registrados-->
                        <select class="nombrePilotoVeh" name="nombrePiloto1" required>
                            <option value="">Seleccionar Piloto</option>
                        </select>
                    </div>
                    <div class="form-group">
                    <!--Ganador penúltima temporada-->
                        <label for="temporada2">Penúltima Temporada</label>
                        <input type="text" id="temporada2" name="temporada2" placeholder="Año" required>
                        <label for="nombrePiloto2">Piloto</label>
                        <!--Usa como valor los ids de los pilotos registrados-->
                        <select class="nombrePilotoVeh" name="nombrePiloto2" required>
                            <option value="">Seleccionar Piloto</option>
                        </select>
                    </div>
                    <div class="form-group">
                    <!--Ganador antepenúltima temporada-->
                        <label for="temporada3">Antepenúltima Temporada</label>
                        <input type="text" id="temporada3" name="temporada3" placeholder="Año" required>
                        <label for="nombrePiloto3">Piloto</label>
                        <!--Usa como valor los ids de los pilotos registrados-->
                        <select class="nombrePilotoVeh" name="nombrePiloto3" required>
                            <option value="">Seleccionar Piloto</option>
                        </select>
                    </div>
                </div>
                <!--Boton de registro de circuitos-->
                <button id="btnRegistrarCircuito" type="submit">Registrar Circuito</button>
                <div id="statusMessage" class="status-message"></div>
            </form>
        </div>
        <!--Contenedor para mostrar circuitos registrados-->
        <div class="card">
            <h1>Circuitos Registrados</h1>
            <button id="btnListar" type="button">Mostrar Circuitos</button>
            <div id="circuitosCards"></div>
        </div>
        `;

        //Función para el manejo de eventos
        this.addEventListener();
        //Función para cargar información de los pilotos en los selects
        this.loadPilotos();
    }

    /**
     * Cargar información de los pilotos en los selects
     */
    loadPilotos() {
        fetch('../../../db.json') //Ruta archivo json
            .then(response => response.json())
            .then(data => {
                //Toma los datos de los pilotos y los selecciona en los selects
                const selectsPilotos = this.shadowRoot.querySelectorAll(".nombrePilotoVeh");
                //Itera sobre los selects
                selectsPilotos.forEach(select => {
                    //Crea un option para cada piloto
                    data.pilotos.forEach(piloto => {
                        const option = document.createElement("option");
                        //Toma como valor el id del piloto
                        option.value = piloto.id;
                        //Toma como texto el nombre del piloto
                        option.textContent = piloto.nombrePiloto;
                        //Añade al select la opción
                        select.appendChild(option);
                    });
                });
            })
            //En caso de que ocurra un error al cargar los datos de los pilotos
            .catch(error => {
                console.error("Error al cargar los datos de los pilotos:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudieron cargar los pilotos'
                });
            });
    }

    //Manejo de eventos en bótones
    addEventListener() {
        //Botón para mostrar circuitos
        this.shadowRoot.querySelector('#btnListar').addEventListener("click", () => this.mostrarCircuitos());
        //Botón para crear los circuitos
        this.shadowRoot.querySelector('#formCrearCircuito').addEventListener('submit', (e) => {
            e.preventDefault();
            this.crearCircuitos();
        });
    }

    /**
     * Función para crear circuitos
     */
    crearCircuitos = () => {
        //Toma el formulario de registro
        const formCrearCircuito = this.shadowRoot.querySelector('#formCrearCircuito');
        //Toma los datos de los campos
        const formData = new FormData(formCrearCircuito);
        //Toma los datos del objetos
        const datos = Object.fromEntries(formData.entries());
    
        //Estructura para almacenar la información en el JSON
        const circuito = {
            nombreCircuito: datos.nombreCircuito,
            paisCircuito: datos.paisCircuito,
            longitud: parseFloat(datos.longitud),
            vueltas: parseInt(datos.vueltas),
            descripcion: datos.descripcion,
            record_vuelta: {
                tiempo: datos.tiempo,
                piloto: datos.piloto,
                año: datos.año
            },
            ganadores: [
                { temporada: datos.temporada1, piloto: datos.nombrePiloto1 },
                { temporada: datos.temporada2, piloto: datos.nombrePiloto2 },
                { temporada: datos.temporada3, piloto: datos.nombrePiloto3 }
            ],
            imagenCircuito: datos.imagenCircuito
        };

        //Función para enviar la información
        postCircuitos(circuito)
            .then(response => {
                if (!response.ok) throw new Error('Error al crear el circuito');
                return response.json();
            })
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'Circuito registrado correctamente',
                    timer: 1500,
                    showConfirmButton: false
                });
                //Limpia los campos del formulario
                formCrearCircuito.reset();
            })
            //En caso de error
            .catch(error => {
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo registrar el circuito'
                });
            });
    };

    /**
     * Función para mostrar circuitos registrados
     */
    mostrarCircuitos = () => {
        //Toma los circuitos registrados del JSON
        getCircuitos()
            .then((circuitos) => {
                //Toma el contenedor donde se va a mostrar la información
                const circuitosCards = this.shadowRoot.querySelector('#circuitosCards');
                circuitosCards.innerHTML = '';

                //Recorre los circuitos registrados
                circuitos.forEach((circuito) => {
                    //Crea un elemento card
                    const divItems = document.createElement('div');
                    //Añade una clase al elemento creado
                    divItems.classList.add('circuit-card');
                    //Añade el contenido del card con la información del circuito
                    divItems.innerHTML = /*html*/`
                        <img src="${circuito.imagenCircuito}" alt="${circuito.nombreCircuito}">
                        <div class="circuit-content">
                            <h2>${circuito.nombreCircuito}</h2>
                            <p>🌍 ${circuito.paisCircuito}</p>
                            <p>🏁 ${circuito.vueltas} vueltas</p>
                            <p>📏 ${circuito.longitud} km</p>
                            <p>${circuito.descripcion}</p>
                            <div class="record-info">
                                <h3>Record Vuelta</h3>
                                <p>⏱️ ${circuito.record_vuelta.tiempo}</p>
                                <p>🏎️ ${circuito.record_vuelta.piloto} (${circuito.record_vuelta.año})</p>
                            </div>
                        </div>
                        <!--Cada card tiene botones de editar y eliminar-->
                        <div class="circuit-actions">
                            <button class="btnEditarForm" data-id="${circuito.id}">Editar</button>
                            <button class="btnEliminar" data-id="${circuito.id}">Eliminar</button>
                        </div>
                    `;
                    //Añade a las cartas los contenedores por circuito
                    circuitosCards.appendChild(divItems);
                });
                //Función para el manejo de eventos de los botones eliminar y editar
                this.setupCardEventListeners();
            })
            .catch((error) => {
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudieron cargar los circuitos'
                });
            });
    }
    /**
     * Función para el manejo de eventos de los botones eliminar y editar
     */
    setupCardEventListeners() {
        //Itera por cada botón con clase .btnEliminar y llama la función correspondiente
        this.shadowRoot.querySelectorAll('.btnEliminar').forEach(btn => {
            btn.addEventListener('click', (e) => this.eliminarCircuito(e.target.dataset.id));});
            //Itera por cada botón con clase .btnEdtarForm y llama la función correspondiente
            this.shadowRoot.querySelectorAll('.btnEditarForm').forEach(btn => {
                btn.addEventListener('click', (e) => this.mostrarFormularioEdit(e.target.dataset.id));
            });
        }
    /**
     * Eliminar circuito
     * @param {*} id //Id circuito
     */
        eliminarCircuito = async (id) => {
            //Antes de eliminar verifica la operación
            const result = await Swal.fire({
                title: '¿Está seguro?',
                text: "Esta acción no se puede deshacer",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: 'rgb(183, 16, 16)',
                cancelButtonColor: '#6B7280',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            });
            //Si la respuesta es confirmada
            if (result.isConfirmed) {
                try {
                    //Realizar la petición de eliminar circuitos
                    const response = await deleteCircuitos(id);
                    //En caso de error
                    if (!response.ok) throw new Error('Error al eliminar el circuito');
                    
                    //Si se elimina correctamente
                    Swal.fire({
                        icon: 'success',
                        title: 'Eliminado',
                        text: 'El circuito ha sido eliminado',
                        timer: 1500,
                        showConfirmButton: false
                    });
                    //Refrescar la lista de circuitos
                    this.mostrarCircuitos();
                //Error al eliminar
                } catch (error) {
                    console.error('Error:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se pudo eliminar el circuito'
                    });
                }
            }
        }
        
        //Formulario para editar el circuito correspondiente
        mostrarFormularioEdit = (id) => {
            //Obtiene los datos de los circuitos
            getCircuitos()
            .then((circuitos) => {
                //Recorre los circuitos encontrando el id correspondiente
                const circuito = circuitos.find(c => c.id === id);
                if (!circuito) throw new Error('Circuito no encontrado');
    
                //Si se encuentra el circuito se muestra el formulario de edición de datos
                Swal.fire({
                    title: 'Editar Circuito',
                    html: `
                        <form id="editCircuitoForm" class="edit-form">
                            <div class="swal2-form-group">
                                <label class="swal2-label">Imagen Actual</label>
                                <div class="image-preview">
                                    <img src="${circuito.imagenCircuito}" alt="Circuito" style="max-width: 200px; margin: 10px 0;">
                                </div>
                                <label class="swal2-label">Nueva URL de Imagen</label>
                                <input type="url" class="swal2-input" id="imagenEdit" value="${circuito.imagenCircuito || ''}">
                            </div>
                            <div class="swal2-form-group">
                                <label class="swal2-label">Nombre del Circuito</label>
                                <input type="text" class="swal2-input" id="nombreCircuitoEdit" value="${circuito.nombreCircuito || ''}">
                            </div>
                            <div class="swal2-form-group">
                                <label class="swal2-label">País</label>
                                <input type="text" class="swal2-input" id="paisCircuitoEdit" value="${circuito.paisCircuito || ''}">
                            </div>
                            <div class="swal2-form-group">
                                <label class="swal2-label">Vueltas</label>
                                <input type="number" class="swal2-input" id="vueltasEdit" value="${circuito.vueltas || ''}">
                            </div>
                            <div class="swal2-form-group">
                                <label class="swal2-label">Longitud (km)</label>
                                <input type="number" class="swal2-input" id="longitudEdit" value="${circuito.longitud || ''}" step="0.001">
                            </div>
                            <div class="swal2-form-group">
                                <label class="swal2-label">Descripción</label>
                                <textarea class="swal2-textarea" id="descripcionEdit" rows="3">${circuito.descripcion || ''}</textarea>
                            </div>
                            <div class="section-title">Record Vuelta</div>
                            <div class="swal2-form-group">
                                <label class="swal2-label">Tiempo</label>
                                <input type="text" class="swal2-input" id="tiempoEdit" value="${circuito.record_vuelta?.tiempo || ''}">
                            </div>
                            <div class="swal2-form-group">
                                <label class="swal2-label">Piloto Record</label>
                                <input type="text" class="swal2-input" id="pilotoRecordEdit" value="${circuito.record_vuelta?.piloto || ''}">
                            </div>
                            <div class="swal2-form-group">
                                <label class="swal2-label">Año Record</label>
                                <input type="text" class="swal2-input" id="añoRecordEdit" value="${circuito.record_vuelta?.año || ''}">
                            </div>
                            <div class="section-title">Ganadores Recientes</div>
                            <div class="winners-section">
                                ${circuito.ganadores?.map((ganador, index) => `
                                    <div class="winner-group">
                                        <div class="swal2-form-group">
                                            <label class="swal2-label">Temporada ${index + 1}</label>
                                            <input type="text" class="swal2-input" id="temporada${index + 1}Edit" value="${ganador.temporada || ''}">
                                        </div>
                                        <div class="swal2-form-group">
                                            <label class="swal2-label">Piloto Ganador ${index + 1}</label>
                                            <select class="swal2-select" id="piloto${index + 1}Edit">
                                                <option value="">Seleccionar Piloto</option>
                                            </select>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </form>
                    `,
                    customClass: {
                        container: 'edit-form-container'
                    },
                    showCancelButton: true,
                    confirmButtonText: 'Guardar',
                    cancelButtonText: 'Cancelar',
                    confirmButtonColor: 'rgb(183, 16, 16)',
                    cancelButtonColor: '#6B7280',
                    width: '700px',
                    didRender: () => {
                        const style = document.createElement('style');
                        style.textContent = `
                            .edit-form-container .swal2-popup {
                                padding: 2rem;
                                background: #1a1a1a;
                                color: #ffffff;
                            }
                            .edit-form {
                                display: grid;
                                gap: 1rem;
                                max-height: 80vh;
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
                                color: #9ca3af;
                                font-size: 0.9rem;
                                text-align: left;
                            }
                            .swal2-input, .swal2-select, .swal2-textarea {
                                background: #27272a !important;
                                color: #ffffff !important;
                                border: 1px solid #374151 !important;
                                margin: 0 !important;
                                font-size: 0.9rem !important;
                            }
                            .swal2-select {
                                width: 100%;
                                padding: 0.75rem;
                                border-radius: 6px;
                            }
                            .swal2-textarea {
                                min-height: 80px;
                                padding: 0.75rem;
                            }
                            .image-preview {
                                background: #27272a;
                                padding: 1rem;
                                border-radius: 6px;
                                text-align: center;
                            }
                            .section-title {
                                font-size: 1.1rem;
                                color: #ffffff;
                                margin: 1.5rem 0 1rem;
                                padding-bottom: 0.5rem;
                                border-bottom: 1px solid #374151;
                            }
                            .winners-section {
                                display: grid;
                                gap: 1.5rem;
                            }
                            .winner-group {
                                padding: 1rem;
                                background: #27272a;
                                border-radius: 6px;
                            }
                        `;
                        document.head.appendChild(style);
    
                        // Cargar pilotos en los selectores en el formulario de edición
                        fetch('../../../db.json')
                            .then(response => response.json()) // Se convierte la respuesta a formato JSON
                            .then(data => {
                                 // Se recorren los ganadores del circuito y se llenan los select con los pilotos disponibles
                                circuito.ganadores?.forEach((ganador, index) => {
                                    const select = document.getElementById(`piloto${index + 1}Edit`);
                                    if (select) {
                                        data.pilotos.forEach(piloto => {
                                            const option = new Option(piloto.nombrePiloto, piloto.id);
                                            select.add(option);
                                        });
                                         // Se asigna el valor del piloto ganador si existe
                                        select.value = ganador.piloto || '';
                                    }
                                });
                            });
                    },
                    // Función para obtener los datos del formulario y devolver un objeto con la información
                    preConfirm: () => {
                        return {
                            nombreCircuito: document.getElementById('nombreCircuitoEdit').value,
                            paisCircuito: document.getElementById('paisCircuitoEdit').value,
                            vueltas: parseInt(document.getElementById('vueltasEdit').value),
                            longitud: parseFloat(document.getElementById('longitudEdit').value),
                            descripcion: document.getElementById('descripcionEdit').value,
                            imagenCircuito: document.getElementById('imagenEdit').value,
                            record_vuelta: {
                                tiempo: document.getElementById('tiempoEdit').value,
                                piloto: document.getElementById('pilotoRecordEdit').value,
                                año: document.getElementById('añoRecordEdit').value
                            },
                            ganadores: [1, 2, 3].map(num => ({
                                temporada: document.getElementById(`temporada${num}Edit`).value,
                                piloto: document.getElementById(`piloto${num}Edit`).value
                            }))
                        };
                    }
                    // Si el usuario confirma la edición, se llama a la función para editar el circuito
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.editarCircuito(id, result.value);
                    }
                });
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo cargar el circuito para editar'
                });
            });
        }
        // Función asíncrona para editar el circuito con los datos proporcionados
        editarCircuito = async (id, datos) => {
            try {
                const response = await patchCircuitos(datos, id);  // Se envía la petición para actualizar
                if (!response.ok) throw new Error('Error al actualizar el circuito');
                
                // Notificación de éxito con SweetAlert
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'El circuito ha sido actualizado',
                    timer: 1500,
                    showConfirmButton: false
                });
                this.mostrarCircuitos(); // Se actualiza la lista de circuitos
            } catch (error) {
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo actualizar el circuito'
                });
            }
        }
    }
    
    // Definición del web component "circuitos-admin"
    customElements.define("circuitos-admin", CircuitosAdmin);