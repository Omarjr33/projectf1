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
            }

            .card {
                background: white;
                border-radius: 15px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                padding: 2rem;
                max-width: 800px;
                margin: 2rem auto;
            }

            .card-header {
                text-align: center;
                margin-bottom: 2rem;
            }

            .card-header h2 {
                color: #2c3e50;
                margin: 0;
                font-size: 1.8rem;
            }

            .form-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1.5rem;
            }

            .form-group {
                margin-bottom: 1.5rem;
            }

            .form-label {
                display: block;
                margin-bottom: 0.5rem;
                color: #2c3e50;
                font-weight: 500;
            }

            .form-control {
                width: 100%;
                padding: 0.75rem;
                border: 2px solid #e2e8f0;
                border-radius: 8px;
                font-size: 1rem;
                transition: border-color 0.3s ease;
            }

            .form-control:focus {
                outline: none;
                border-color: #3498db;
                box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
            }

            .btn-submit {
                background-color: #3498db;
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
                margin: 1rem auto;
                display: block;
            }

            .btn-submit:hover {
                background-color: #2980b9;
            }

            .preview-image {
                width: 100%;
                height: 150px;
                border-radius: 8px;
                object-fit: cover;
                margin-top: 1rem;
                display: none;
            }

            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }

            .card {
                animation: fadeIn 0.5s ease-out;
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
                        <label class="form-label" for="imageEquipo">URL de la Imagen</label>
                        <input type="url" class="form-control" id="imageEquipo" name="imageEquipo" placeholder="https://ejemplo.com/imagen.jpg">
                        <img class="preview-image" id="imagePreview" alt="Preview">
                    </div>
                </div>

                <button id="btnRegistrar" type="submit" class="btn-submit">
                    Registrar Equipo
                </button>
            </form>
        </div>
        `;
    }

    crearEquipo = () => {
        const formCrearEquipo = this.shadowRoot.querySelector('#formCrearEquipo');
        const imageInput = this.shadowRoot.querySelector('#imageEquipo');
        const imagePreview = this.shadowRoot.querySelector('#imagePreview');

        // Agregar preview de imagen
        imageInput.addEventListener('input', () => {
            const imageUrl = imageInput.value;
            if (imageUrl) {
                imagePreview.style.display = 'block';
                imagePreview.src = imageUrl;
            } else {
                imagePreview.style.display = 'none';
            }
        });

        this.shadowRoot.querySelector('#btnRegistrar').addEventListener("click", (e) => {
            e.preventDefault();
            const datos = Object.fromEntries(new FormData(formCrearEquipo).entries());
            
            postEquipos(datos)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error(`Error en la solicitud POST: ${response.status} - ${response.statusText}`);
                    }
                })
                .then(responseData => {
                    console.log('Respuesta exitosa:', responseData);
                    // Mostrar mensaje de éxito
                    alert('Equipo registrado exitosamente');
                    formCrearEquipo.reset();
                    imagePreview.style.display = 'none';
                })
                .catch(error => {
                    console.error('Error en la solicitud POST:', error.message);
                    alert('Error al registrar el equipo. Por favor, intente nuevamente.');
                });
        });
    }
}

customElements.define("equipos-admin", equiposAdmin);