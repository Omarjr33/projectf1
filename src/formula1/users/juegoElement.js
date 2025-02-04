export class JuegoElement extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render(){
        this.shadowRoot.innerHTML = `
        <h1>Configuración Juego</h1>
        <h2>Circuito</h2>
        <div class="form-group">
            <label for="nombreCircuito" class="form-label">Circuito</label>
            <select id="circuitoSelect">
                <option value="">Seleccionar Circuito</option>
            </select>
        </div>
        <div class="circuitosInfo"></div>

        <h2>Vehiculo</h2>
        <div class="form-group">
            <label for="vehiculo" class="form-label">Vehiculo</label>
            <select id="vehiculoSelect">
                <option value="">Seleccionar Vehiculo</option>
            </select>
        </div>
        <div class="vehiculosInfo"></div>

        `;

        fetch('../../../db.json')
            .then(response => response.json()) 
            .then(data => {
                const circuitoSelect = this.shadowRoot.querySelector("#circuitoSelect");
                
                data.circuitos.forEach(circuito => {
                    const option = document.createElement("option");
                    option.value = circuito.id;
                    option.textContent = circuito.nombreCircuito;
                    circuitoSelect.appendChild(option);
                });

                // Llamamos a la función para manejar la selección del circuito
                this.circuitoSelected(data.circuitos);
            });

        fetch('../../../db.json')
            .then(response => response.json()) 
            .then(data => {
                const vehiculoSelect = this.shadowRoot.querySelector("#vehiculoSelect");
                
                data.vehiculos.forEach(vehiculo => {
                    const option = document.createElement("option");
                    option.value = vehiculo.id;
                    option.textContent = vehiculo.motor;
                    vehiculoSelect.appendChild(option);
                });

                // Llamamos a la función para manejar la selección del circuito
                this.vehiculosSelected(data.vehiculos);
            });
    }

    circuitoSelected(circuitos){
        const circuitoSelect = this.shadowRoot.getElementById("circuitoSelect");
        const circuitosInfoDiv = this.shadowRoot.querySelector(".circuitosInfo");

        circuitoSelect.addEventListener("change", (event) => {
            const circuitoId = event.target.value;
            if(circuitoId){
                const circuito = circuitos.find(c => c.id === circuitoId);
                this.displayCircuitoInfo(circuito, circuitosInfoDiv);
            } else {
                circuitosInfoDiv.innerHTML = '';
            }
        });
    }

    displayCircuitoInfo(circuito, container){
        if (circuito) {
            container.innerHTML = `
                <label for="longitud">Longitud</label>
                <input type="text" id="longitud" value="${circuito.longitud}" disabled>
                <label for="vueltas">Vueltas</label>
                <input type="text" id="vueltas" value="${circuito.vueltas}" disabled>
            `;
        }
    }

    vehiculosSelected(vehiculos){
        const vehiculoSelect = this.shadowRoot.getElementById("vehiculoSelect");
        const vehiculosInfoDiv = this.shadowRoot.querySelector(".vehiculosInfo");

        vehiculoSelect.addEventListener("change", (event) => {
            const vehiculoId = event.target.value;
            if(vehiculoId){
                const vehiculo = vehiculos.find(v => v.id === vehiculoId);
                this.displayVehiculoInfo(vehiculo, vehiculosInfoDiv);
            } else {
                vehiculosInfoDiv.innerHTML = '';
            }
        });
    }

    displayVehiculoInfo(vehiculo, container){
        if (vehiculo) {
            container.innerHTML = `
                <label for="longitud">Velocidad Máxima</label>
                <input type="text" id="longitud" value="${vehiculo.velocidadMaximaKmh}" disabled>
                <label for="aceleracion">Aceleración</label>
                <input type="text" id="aceleracion" value="${vehiculo.aceleracion0a100}" disabled>
            `;
        }
    }
}

customElements.define("juego-element", JuegoElement)