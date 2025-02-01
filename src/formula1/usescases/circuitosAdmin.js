import Swal from 'sweetalert2';
import { postCircuitos, getCircuitos } from "../../Apis/circuitosApis.js";

export class circuitosAdmin extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
        this.crearCircuito();
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
                        <div class="form-group">
                            <button id="btnRegistrarCircuito" type="button">Registrar Circuito</button>
                            <div id="statusMessage" class="status-message"></div>
                        </div>
                    </div>
                </form>
                 <div class="card">
                    <h1>Conoce nuestros equipos</h1>
                    <button id="btnListar" type="submit" class="btn-submit">↓</button>
                    <div id="circuitosCards">
                    <!--Aquí se llamarán las cartas desde archivo JS-->
                 </div>
 </div>
            </div>
        `;
        this.addEventListener();
    }
    addEventListener(){
        this.shadowRoot.querySelector('#btnListar').addEventListener("click", (e) => {
            this.mostrarCircuitos();
        });
    }

    addEventListener() {
        this.shadowRoot.querySelector('#btnRegistrarCircuito').addEventListener("click", (e) => {
            this.crearCircuito();
        });
    }

    crearCircuito = () => {
        const formCrearCircuito = this.shadowRoot.querySelector('#formCrearCircuito');
        const statusMessage = this.shadowRoot.querySelector('#statusMessage');
        
        const formData = new FormData(formCrearCircuito);
        const datos = Object.fromEntries(formData.entries());

        postCircuitos(datos)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            })
            .then(responseData => {
                console.log('Respuesta exitosa:', responseData);
                statusMessage.textContent = '¡Circuito registrado exitosamente!';
                statusMessage.className = 'status-message success';
                statusMessage.style.display = 'block';
                formCrearCircuito.reset();
                setTimeout(() => {
                    statusMessage.style.display = 'none';
                }, 3000);
            })
            .catch(error => {
                console.error('Error:', error.message);
                statusMessage.textContent = 'Error al registrar el circuito. Por favor, intente nuevamente.';
                statusMessage.className = 'status-message error';
                statusMessage.style.display = 'block';
            });
    }

    mostrarCircuitos = () => {
        getCircuitos()
        .then((circuitos) => {
            const circuitosCards = this.shadowRoot.querySelector('#circuitosCards');
            circuitosCards.innerHTML = '';
            
            circuitos.forEach((circuito) => {
                const divItems = document.createElement('div');
                divItems.classList.add('col');
                divItems.innerHTML = /*html*/ `
                <div id="card__listar" class="card">
                    <img src="${circuito.imagenEquipo}" alt="${circuito.nombreEquipo} Logo">
                    <div class="card__content">
                        <h1 class="card__title">${circuito.nombreEquipo}</h1>
                        <p class="card__pais">🌍 ${circuito.paisEquipo}</p>
                        <p class="card__vueltas">⚡ ${circuito.vueltasEquipo}</p>
                        <p class="card__longitud">⚡ ${circuito.longitudEquipo}</p>
                        <p class="card__descripcion">⚡ ${circuito.descripcionEquipo}</p>
                    </div>
                    <div class="card__actions">
                        <button class="btnEditarForm" data-id="${circuito.id}">Editar</button>
                        <button class="btnEliminar" data-id="${circuito.id}">Eliminar</button>
                    </div>
                </div>
                <form id="formEditarEquipo" style="display: none;">
                </form>
                `;
                circuitosCards.appendChild(divItems);
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
}

customElements.define("circuitos-admin", circuitosAdmin);
