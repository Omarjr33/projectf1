export class circuitosAdmin extends HTMLElement {
    constructor(){
        super();
        this.render();
    }

    render(){
        let idCircuito = Date.now();
        this.innerHTML = /*html*/`
        <form id="formCrearEquipo">
            <div class="col">
                <label for="idCircuito" class="form-label">ID</label>
                <input type="number" class="form-control" id="idCircuito" name ="idCircuito" placeholder="${idCircuito}" disabled>
            </div>
            <div class="row">
                <div class="col">
                    <label for="nombreCircuito" class="form-label">Nombre Circuito</label>
                    <input type="text" class="form-control" id="nombreCircuito" name="nombreCircuito">
                </div>
                <div class="col">
                    <label for="paisCircuito" class="form-label">Pais</label>
                    <input type="text" class="form-control" id="paisCircuito" name="paisCircuito">
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <label for="vueltas" class="form-label">Vueltas</label>
                    <input type="number" class="form-control" id="vueltas" name ="vueltas">
                </div>
                <div class="col">
                    <label for="longitud" class="form-label">Longitud KM</label>
                    <input type="number" class="form-control" id="longitud" name ="longitud">
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <label for="imageCircuito" class="form-label">Imágen</label>
                    <input type="url" class="form-control" id="imageCircuito" name="imageCircuito">
                </div>
                <div class="col">
                    <label for="descripcion" class="form-label">Descripción</label>
                    <input type="number" class="form-control" id="descripcion" name ="descripcion">
                    </div>
            </div>
            <div class="row mt-3">
                <div class="col">
                    <button id="btnRegistrarCircuito" type="submit" class="btn btn-primary">Registrar</button>  
                </div>
            </div>
        </form>
        `;
    }
}
customElements.define("circuitos-admin", circuitosAdmin);