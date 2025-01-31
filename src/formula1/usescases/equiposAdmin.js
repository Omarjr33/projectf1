import { postEquipos } from "../../Apis/equiposApis.js";

export class equiposAdmin extends HTMLElement {
    constructor(){
        super();
        this.render();
        this.addCrearEquipo();
    }
    render(){
        let id = Date.now();
        this.innerHTML= /*html*/ `
        <form id="formCrearEquipo">
            <div class="col">
                <label for="id" class="form-label">COD</label>
                <input type="number" class="form-control" id="id" name ="id" placeholder="${id}" disabled>
            </div>
            <div class="row">
                <div class="col">
                    <label for="nombreEquipo" class="form-label">Nombre Equipo</label>
                    <input type="text" class="form-control" id="nombreEquipo" name="nombreEquipo">
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <label for="pais" class="form-label">Pais</label>
                    <input type="text" class="form-control" id="pais" name ="pais">
                </div>
                <div class="col">
                    <label for="Motor" class="form-label">Motor</label>
                    <input type="text" class="form-control" id="Motor" name="Motor">
                </div>
                <div class="col">
                    <label for="imageEquipo" class="form-label">Imágen</label>
                    <input type="url" class="form-control" id="imageEquipo" name="imageEquipo">
                </div>
            </div>
            <div class="row mt-3">
                <div class="col">
                    <button id="btnRegistrar" type="submit" class="btn btn-primary">Registrar</button>  
                </div>
            </div>
        </form>
        `;
    }

    addCrearEquipo = () => {
        const formCrearEquipo = document.querySelector("#formCrearEquipo");
        document.querySelector('#btnRegistar').addEventListener("click",(e) =>{
            e.preventDefault();

            const datos = Object.fromEntries(new FormData(formCrearEquipo).entries());
            datos.id = document.querySelector("#id").placeholder;
            postEquipos(datos)
            .then(response => {
                // Verificar si la solicitud fue exitosa (código de respuesta en el rango 200)
                if (response.ok) {
                    return response.json(); // Devolver la respuesta como JSON
                } else {
                    // Si la respuesta no fue exitosa, lanzar una excepción
                    throw new Error(`Error en la solicitud POST: ${response.status} - ${response.statusText}`);
                }
            })
            .then(responseData => {
                // Hacer algo con la respuesta exitosa si es necesario
                console.log('Respuesta exitosa:', responseData);
            })
            .catch(error => {
                console.error('Error en la solicitud POST:', error.message);
                // Puedes manejar el error de otra manera si es necesario
            });
            e.stopImmediatePropagation();
            e.preventDefault();
        })
    }
}
customElements.define("equipos-admin", equiposAdmin);