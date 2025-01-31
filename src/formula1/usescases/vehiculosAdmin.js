const divContainerProduct = document.querySelector('.containerRendimiento'); 
export class VehiculosAdmin extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render(){
        let idVehiculo = Date.now();
        this.shadowRoot.innerHTML = /*html*/ `
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
                <h2>Rendimiento</h2>

                <h3> Conduccion Normal</h3>
                <label for="exampleInputVelocProm" class="form-label">Velocidad Promedio</label>
                <input type="text" class="form-control" id="exampleInputVelocProm" aria-describedby="VelocPromHelp">
                <p> Consumo de Combustible</p>
                <label for="exampleInputSeco" class="form-label">Seco</label>
                <input type="text" class="form-control" id="exampleInputSeco" aria-describedby="SecoHelp">
                <label for="exampleInputLluvioso" class="form-label">Lluvioso</label>
                <input type="text" class="form-control" id="exampleInputNormal" aria-describedby="LluviosoHelp">
                <label for="exampleInputExtremo" class="form-label">Extremo</label>
                <input type="text" class="form-control" id="exampleInputExtremo" aria-describedby="ExtremoHelp">
                <p>Desgaste de Neumaticos</p>
                <label for="exampleInputSeco" class="form-label">Seco</label>
                <input type="text" class="form-control" id="exampleInputSeco" aria-describedby="SecoHelp">
                <label for="exampleInputLluvioso" class="form-label">Lluvioso</label>
                <input type="text" class="form-control" id="exampleInputNormal" aria-describedby="LluviosoHelp">
                <label for="exampleInputExtremo" class="form-label">Extremo</label>
                <input type="text" class="form-control" id="exampleInputExtremo" aria-describedby="ExtremoHelp">

                <h3> Conduccion Agresiva</h3>
                <label for="exampleInputVelocProm" class="form-label">Velocidad Promedio</label>
                <input type="text" class="form-control" id="exampleInputVelocProm" aria-describedby="VelocPromHelp">
                <p> Consumo de Combustible</p>
                <label for="exampleInputSeco" class="form-label">Seco</label>
                <input type="text" class="form-control" id="exampleInputSeco" aria-describedby="SecoHelp">
                <label for="exampleInputLluvioso" class="form-label">Lluvioso</label>
                <input type="text" class="form-control" id="exampleInputNormal" aria-describedby="LluviosoHelp">
                <label for="exampleInputExtremo" class="form-label">Extremo</label>
                <input type="text" class="form-control" id="exampleInputExtremo" aria-describedby="ExtremoHelp">
                <p>Desgaste de Neumaticos</p>
                <label for="exampleInputSeco" class="form-label">Seco</label>
                <input type="text" class="form-control" id="exampleInputSeco" aria-describedby="SecoHelp">
                <label for="exampleInputLluvioso" class="form-label">Lluvioso</label>
                <input type="text" class="form-control" id="exampleInputNormal" aria-describedby="LluviosoHelp">
                <label for="exampleInputExtremo" class="form-label">Extremo</label>
                <input type="text" class="form-control" id="exampleInputExtremo" aria-describedby="ExtremoHelp">

                <h3> Ahorro de Combustible</h3>
                <label for="exampleInputVelocProm" class="form-label">Velocidad Promedio</label>
                <input type="text" class="form-control" id="exampleInputVelocProm" aria-describedby="VelocPromHelp">
                <p> Consumo de Combustible</p>
                <label for="exampleInputSeco" class="form-label">Seco</label>
                <input type="text" class="form-control" id="exampleInputSeco" aria-describedby="SecoHelp">
                <label for="exampleInputLluvioso" class="form-label">Lluvioso</label>
                <input type="text" class="form-control" id="exampleInputNormal" aria-describedby="LluviosoHelp">
                <label for="exampleInputExtremo" class="form-label">Extremo</label>
                <input type="text" class="form-control" id="exampleInputExtremo" aria-describedby="ExtremoHelp">
                <p>Desgaste de Neumaticos</p>
                <label for="exampleInputSeco" class="form-label">Seco</label>
                <input type="text" class="form-control" id="exampleInputSeco" aria-describedby="SecoHelp">
                <label for="exampleInputLluvioso" class="form-label">Lluvioso</label>
                <input type="text" class="form-control" id="exampleInputNormal" aria-describedby="LluviosoHelp">
                <label for="exampleInputExtremo" class="form-label">Extremo</label>
                <input type="text" class="form-control" id="exampleInputExtremo" aria-describedby="ExtremoHelp">
        </div>
        <div id="containerRendimiento">

        </div>
        </form>
        <div class="card">
            <h1>Conoce nuestros Vehiculos</h1>
            <button id="btnListar" type="submit" class="btn-submit">↓</button>
            <div id="vehiculosCards">
            <!--Aquí se llamarán las cartas desde archivo JS-->
            </div>
        </div>
        `;
    }    
    
}

customElements.define("vehiculos-admin", VehiculosAdmin);