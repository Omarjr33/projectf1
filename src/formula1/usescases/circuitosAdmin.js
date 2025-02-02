import Swal from 'sweetalert2';
import { postCircuitos, getCircuitos, deleteCircuitos, patchCircuitos } from "../../Apis/circuitosApis.js";

export class circuitosAdmin extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
        this.addEventListeners(); 
        this.eliminarCircuitos();
        this.editarCircuito();
    }

    render() {
        let idCircuito = Date.now();
        const styles = `
            :host {
                display: block;
                font-family: 'Segoe UI', system-ui, sans-serif;
            }
            .card {
                background: #1a1a1a;
                border-radius: 12px;
                padding: 2rem;
                box-shadow: 0 8px 24px rgba(0,0,0,0.2);
                color: #ffffff;
                transition: transform 0.2s ease;
            }
            .card:hover {
                transform: translateY(-2px);
            }
            .form-group {
                margin-bottom: 1.5rem;
            }
            .row {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 2rem;
                margin-bottom: 1rem;
            }
            label {
                display: block;
                margin-bottom: 0.5rem;
                font-size: 0.9rem;
                color: #9ca3af;
            }
            input {
                width: 100%;
                padding: 0.75rem;
                border: 1px solid #374151;
                background: #27272a;
                border-radius: 6px;
                color: #ffffff;
                font-size: 1rem;
                transition: border-color 0.2s ease;
            }
            input:focus {
                outline: none;
                border-color: rgb(132, 0, 0);
                box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
            }
            button {
                background: rgb(183, 16, 16);
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 6px;
                font-weight: 500;
                cursor: pointer;
                transition: background-color 0.2s ease;
            }
            button:hover {
                background: rgb(93, 8, 8);
            }
        `;

        this.shadowRoot.innerHTML = `
            <style>${styles}</style>
            <div class="card">
                <form id="formCrearCircuito">
                    <div class="form-group">
                        <label for="idCircuito">ID</label>
                        <input type="number" id="idCircuito" name="idCircuito" value="${idCircuito}" disabled>
                    </div>

                    <div class="row">
                        <div class="form-group">
                            <label for="nombreCircuito">Nombre Circuito</label>
                            <input type="text" id="nombreCircuito" name="nombreCircuito" placeholder="Ingrese nombre del circuito">
                        </div>
                        <div class="form-group">
                            <label for="paisCircuito">País</label>
                            <input type="text" id="paisCircuito" name="paisCircuito" placeholder="Ingrese país">
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group">
                            <label for="vueltas">Vueltas</label>
                            <input type="number" id="vueltas" name="vueltas" placeholder="Número de vueltas">
                        </div>
                        <div class="form-group">
                            <label for="longitud">Longitud KM</label>
                            <input type="number" id="longitud" name="longitud" placeholder="Longitud en kilómetros">
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group">
                            <label for="imageCircuito">Imagen (URL)</label>
                            <input type="url" id="imageCircuito" name="imageCircuito" placeholder="URL de la imagen">
                        </div>
                        <div class="form-group">
                            <label for="descripcion">Descripción</label>
                            <input type="text" id="descripcion" name="descripcion" placeholder="Descripción del circuito">
                        </div>
                    </div>
                    <div class="row">
                        <h1>Record Vuelta</h1>
                        <div class="form-group">
                            <label for="tiempo">Tiempo</label>
                            <input type="text" id="tiempo" name="tiempo" placeholder="Tiempo">
                        </div>
                        <div class="form-group">
                            <label for="piloto">Piloto</label>
                            <input type="text" id="piloto" name="piloto" placeholder="Piloto">
                        </div>
                        <div class="form-group">
                            <label for="año">Año</label>
                            <input type="text" id="año" name="año" placeholder="Año">
                        </div>
                    </div>
                    <div class="row">
                        <h1>Ganadores</h1>
                        <div class="form-group">
                            <label for="temporada">Año Temporada</label>
                            <input type="text" id="temporada1" name="temporada1" placeholder="Última temporada">
                        </div>
                        <div class="form-group">
                            <label for="nombrePiloto" class="form-label">Piloto</label>
                            <select class="form-select" class="nombrePilotoVeh" name="nombrePiloto">
                                <option value="">Seleccionar Piloto</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="temporada">Año Temporada</label>
                            <input type="text" id="temporada2" name="temporada2" placeholder="Penúltima temporada">
                        </div>
                        <div class="form-group">
                            <label for="nombrePiloto" class="form-label">Piloto</label>
                            <select class="form-select" class="nombrePilotoVeh" name="nombrePiloto">
                                <option value="">Seleccionar Piloto</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="temporada">Año Temporada</label>
                            <input type="text" id="temporada3" name="temporada3" placeholder="Antepenúltima temporada">
                        </div>
                        <div class="form-group">
                            <label for="nombrePiloto" class="form-label">Piloto</label>
                            <select class="form-select" class="nombrePilotoVeh" name="nombrePiloto">
                                <option value="">Seleccionar Piloto</option>
                            </select>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group">
                            <button id="btnRegistrarCircuito" type="button">Registrar Circuito</button>
                            <div id="statusMessage" class="status-message"></div>
                        </div>
                    </div>
                </form>

                <div class="card">
                    <h1>Conoce nuestros circuitos</h1>
                    <button id="btnListar" type="button">↓</button>
                    <div id="circuitosCards"></div>
                </div>
            </div>
        `;
        fetch('../../../db.json')
        .then(response => response.json()) 
        .then(data => {
            const nombrePiloto = this.shadowRoot.querySelectorAll(".nombrePilotoVeh");
            
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

    addEventListeners() {
        this.shadowRoot.querySelector('#btnRegistrarCircuito').addEventListener("click", () => this.crearCircuito());
        this.shadowRoot.querySelector('#btnListar').addEventListener("click", () => this.mostrarCircuitos());
    }

    crearCircuito = () => {
        const formCrearCircuito = this.shadowRoot.querySelector('#formCrearCircuito');
        const statusMessage = this.shadowRoot.querySelector('#statusMessage');

        const formData = new FormData(formCrearCircuito);
        const datos = Object.fromEntries(formData.entries());

        postCircuitos(datos)
            .then(response => response.json())
            .then(responseData => {
                statusMessage.textContent = '¡Circuito registrado exitosamente!';
                statusMessage.className = 'status-message success';
                statusMessage.style.display = 'block';
                formCrearCircuito.reset();
                setTimeout(() => {
                    statusMessage.style.display = 'none';
                }, 3000);
            })
            .catch(error => {
                console.error('Error:', error);
                statusMessage.textContent = 'Error al registrar el circuito.';
                statusMessage.className = 'status-message error';
            });
    }

    mostrarCircuitos = () => {
        getCircuitos()
            .then((circuitos) => {
                if (!Array.isArray(circuitos)) {
                    console.error("Los datos recibidos no son un array:", circuitos);
                    return;
                }

                const circuitosCards = this.shadowRoot.querySelector('#circuitosCards');
                circuitosCards.innerHTML = '';

                circuitos.forEach((circuito) => {
                    const divItems = document.createElement('div');
                    divItems.classList.add('col');
                    divItems.innerHTML = `
                        <div class="card">
                            <img src="${circuito.imageCircuito}" alt="${circuito.nombreCircuito}">
                            <div class="card__content">
                                <h1>${circuito.nombreCircuito}</h1>
                                <p>🌍 ${circuito.paisCircuito}</p>
                                <p>⚡ ${circuito.vueltas} vueltas</p>
                                <p>📏 ${circuito.longitud} km</p>
                                <p>${circuito.descripcion}</p>
                            </div>
                            <div class="card__actions">
                                <button class="btnEditarForm" data-id="${circuito.id}">Editar</button>
                                <button class="btnEliminar" data-id="${circuito.id}">Eliminar</button>
                            </div>
                        </div>
                         <form id="formEditarCircuito" style="display: none;">
                        </form>
                    `;
                    circuitosCards.appendChild(divItems);
                });

                this.shadowRoot.querySelectorAll('.btnEditarForm').forEach((btnEditarForm) => {
                    btnEditarForm.addEventListener("click", (e) => {
                        const id = e.target.getAttribute("data-id");
                        this.mostrarFormularioEdit(id);
                    });
                });
            })
            .catch((error) => console.error('Error en la solicitud GET:', error));
    }

    eliminarCircuitos() {
        const circuitosCards = this.shadowRoot.querySelector("#circuitosCards");
    
        circuitosCards.addEventListener("click", async (e) => {
            if (e.target.classList.contains("btnEliminar")) {
                const id = e.target.getAttribute("data-id");
    
                if (!id) {
                    console.error("ID del circuitoo no encontrado.");
                    return;
                }
    
                const confirmacion = await Swal.fire({
                    title: "¿Está seguro de eliminar el circuito?",
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
                        const response = await deleteCircuitos(id);
    
                        if (!response || !response.ok) {
                            throw new Error(`Error ${response ? response.status : "desconocido"}`);
                        }
    
                        Swal.fire("Eliminado", "El circuito ha sido eliminado.", "success");
                        this.mostrarCircuitos();
                    } catch (error) {
                        console.error("Error al eliminar el circuito:", error);
                        Swal.fire("Error", "No se pudo eliminar el circuito.", "error");
                    }
                }
            }
        });
    }   

    mostrarFormularioEdit = (id) => {
        const formEditarCircuito = this.shadowRoot.querySelector('#formEditarCircuito');
        formEditarCircuito.style.display = 'none';
        
        getCircuitos()
        .then((circuitos) => {
            const circuito = circuitos.find((circuito) => circuito.id === id);
            if (circuito) {
                const {nombreCircuito, paisCircuito, vueltas, longitud, descripcion } = circuito;
                formEditarCircuito.innerHTML = /*html*/ `
                    <div class="form-grid">
                    <div class="form-group">
                        <label class="form-label" for="nombreCircuito">Nombre del Circuito</label>
                        <input type="text" class="form-control" id="nombreCircuito" name="nombreCircuito" value="${nombreCircuito}">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="paisCircuito">País</label>
                        <input type="text" class="form-control" id="paisCircuito" name="paisCircuito" value="${paisCircuito}">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="vueltas">Vueltas</label>
                        <input type="text" class="form-control" id="vueltas" name="vueltas" value="${vueltas}">
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="longitud">Longitud</label>
                        <input type="text" class="form-control" id="longitud" name="longitud" value="${longitud}">
                    </div>

                     <div class="form-group">
                         <label class="form-label" for="descripcion">Longitud</label>
                         <input type="text" class="form-control" id="descripcion" name="descripcion" value="${descripcion}">
                    </div>
                </div>
    
                <button id="btnEditar" data-id="${id}" type="submit" class="btn-submit">
                    Editar Circuito
                </button>
                `;
    
                formEditarCircuito.style.display = 'block';
                this.editarCircuito();
            }
        })
        .catch((error) => {
            console.error('Error en la solicitud GET:', error.message);
        });
    }
    

    editarCircuito() {
        const formEditarCircuito = this.shadowRoot.querySelector('#formEditarCircuito');
        
        this.shadowRoot.querySelector('#btnEditar').addEventListener("click", (e) => {
            e.preventDefault();
            
            const datos = Object.fromEntries(new FormData(formEditarCircuito).entries());
            const id = e.target.getAttribute("data-id");
            
            patchCircuitos(datos, id)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error(`Error en la solicitud PATCH: ${response.status} - ${response.statusText}`);
                    }
                })
                .then(responseData => {
                    console.log("Circuito actualizado:", responseData);
                    Swal.fire({
                        icon: 'success',
                        title: '¡Éxito!',
                        text: 'El circuito ha sido editado correctamente.',
                    });
                    this.mostrarCircuitos();
                })
                .catch(error => {
                    console.error('Error en la solicitud PATCH:', error.message);
                    Swal.fire({
                        icon: 'error',
                        title: '¡Error!',
                        text: 'Hubo un problema al editar el circuito.',
                    });
                });
        });
    }

}

customElements.define("circuitos-admin", circuitosAdmin);
