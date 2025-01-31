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
            <label for="exampleInputVelocidadProm" class="form-label"> Rendimiento</label>
            <select class="form-select" >
                <option selected>Seleccionar Rendimiento</option>
                <option value="1" id="SleccionRendimiento" >Conduccion Normal</option>
                <option value="2" id="SleccionRendimiento" >Conduccion Agresiva</option>
                <option value="3" id="SleccionRendimiento" >Ahorro Combustible</option>
        </select>
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

    mostrarRendimiento = () => {
        getRendimiento()
        .then((rendimiento) => {
            //Toma el elemento HTML con ID productosCards
            const  containerRendimiento= document.getElementById('containerRendimiento');
            
            rendimiento.forEach((rendimiento) => {
                const {} = rendimiento;
                //Crea un div en HTML
                const divItems = document.createElement('div');
                //El div creado tendrá como clase col
                divItems.classList.add('col');
                //Cambios dentro del archivo HTML, se completa la información con la data adquirida
                divItems.innerHTML = /*html*/`
                <form>
                <div class="mb-3">
                    <label for="exampleInputNombre" class="form-label">Velocidad Promedio</label>
                    <input type="text" class="form-control" id="exampleInputNombre" aria-describedby="NombreHelp">
                </div>
                <div class="mb-3">
                    <label for="exampleInputNombre" class="form-label">Consumo de Combustible</label>
                    <label for="exampleInputNombre" class="form-label">Seco</label>
                    <input type="number" class="form-control" id="exampleInputNombre" aria-describedby="NombreHelp">
                    <label for="exampleInputNombre" class="form-label">Lluvioso</label>
                    <input type="number" class="form-control" id="exampleInputNombre" aria-describedby="NombreHelp">
                    <label for="exampleInputNombre" class="form-label">Extremo</label>
                    <input type="number" class="form-control" id="exampleInputNombre" aria-describedby="NombreHelp">
                </div>
                <div class="mb-3">
                    <label for="exampleInputNombre" class="form-label">Desgaste de neumaticos</label>
                    <label for="exampleInputNombre" class="form-label">Seco</label>
                    <input type="number" class="form-control" id="exampleInputNombre" aria-describedby="NombreHelp">
                    <label for="exampleInputNombre" class="form-label">Lluvioso</label>
                    <input type="number" class="form-control" id="exampleInputNombre" aria-describedby="NombreHelp">
                    <label for="exampleInputNombre" class="form-label">Extremo</label>
                    <input type="number" class="form-control" id="exampleInputNombre" aria-describedby="NombreHelp">
                </div>
                </form>
                `;
                equiposCards.appendChild(divItems);
            });

        }).catch ((error) => {
            console.error('Error en la solicitud GET:', error.message);
        });
    }
    
}

customElements.define("vehiculos-admin", VehiculosAdmin);