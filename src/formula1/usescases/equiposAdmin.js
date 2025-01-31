import { postEquipos } from "../../Apis/equiposApis.js";

export class equiposAdmin extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
        this.addCrearEquipo();
    }
    render(){
        this.innerHTML= /*html*/ `
        <div class="container">
        <form id="formCrearEquipo">
            <div class="row">
                <div class="col">
                    <label for="nombreEquipo" class="form-label">Nombre Equipo</label>
                    <input type="text" class="form-control" id="nombreEquipo" name="nombreEquipo">
                </div>
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
            </div>
        </form>
        </div>
        `;
    }

    crearEquipo = () =>{
        const formCrearEquipo = document.querySelector('#formCrearEquipo');
        document.querySelector('#btnRegistrar').addEventListener("click",(e) =>{
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