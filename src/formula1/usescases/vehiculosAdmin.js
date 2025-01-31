export class VehiculosAdmin extends HTMLElement {
        constructor(){
            super();
            this.render();
        }
    render(){

        this.innerHTML = /*html*/ `
        <form id="formCrearVehiculo"> 
        <div class="col">
                <label for="idVehiculo" class="form-label">COD</label>
                <input type="number" class="form-control" id="idVehiculo" name ="idVehiculo" placeholder="${idVehiculo}" disabled>
        </div>
        <div class="mb-3">
            <label for="exampleInputNombre" class="form-label">Motor</label>
            <input type="text" class="form-control" id="exampleInputNombre" aria-describedby="NombreHelp">
        </div>
        <div class="mb-3">
        <label for="exampleInputEquipos" class="form-label">Equipo</label>
        <select class="form-select" >
            <option selected>Seleccionar Equipo</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
        </select>
        </div>
        <div class="mb-3">
        <label for="exampleInputPilotos" class="form-label">Pilotos</label>
        <select class="form-select" >
            <option selected>Seleccionar Piloto</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
        </select>
        </div>
        <div class="mb-3">
            <label for="exampleInputModelo" class="form-label">Modelo</label>
            <input type="text" class="form-control" id="exampleInputModelo" aria-describedby="ModeloHelp">
                </div>
                <div class="mb-3">
                <label for="exampleInputVelocidadProm" class="form-label"> Rendimiento</label>
                <input type="number" class="form-control" id="exampleInputVelocidadProm" aria-describedby="VelocidadPromHelp">
            </div>
        
        `;
    }
}
customElements.define("vehiculos-admin", VehiculosAdmin);