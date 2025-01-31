
export class pilotosAdmin extends HTMLElement{
    constructor(){
        super();
        this.render();
    }
    render(){
        let idPiloto = Date.now();
        this.innerHTML= /*html*/ `
        <form id="formCrearPiloto"> 
        <div class="col">
                <label for="idPiloto" class="form-label">COD</label>
                <input type="number" class="form-control" id="idPiloto" name ="idPiloto" placeholder="${idPiloto}" disabled>
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
        <button type="submit" class="btn btn-primary" id="RegistrarPiloto">Enviar</button>
        </form>
        `;
    }

    
}
customElements.define("pilotos-admin", pilotosAdmin)