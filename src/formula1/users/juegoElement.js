import { patchUsuarios, postUsuarios } from "../../Apis/usuariosApis.js";
import Swal from 'sweetalert2';

export class JuegoElement extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
        this.crearConfiguracion();
    }

    render(){
        this.shadowRoot.innerHTML = `
        <h1>Configuración Juego</h1>
        <form id="formCrearConfig">
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

        <button id="btnJugar" type="submit" class="btn-submit">Configuración</button>
        </form>
        `;

        this.addEventListeners();

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

    addEventListeners() {
        this.shadowRoot.querySelector('#btnJugar').addEventListener("click", () => this.crearConfiguracion());
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
                <input type="text" id="longitud" name="longitud" value="${circuito.longitud}" disabled>
                <label for="vueltas">Vueltas</label>
                <input type="text" id="vueltas" name="vueltas" value="${circuito.vueltas}" disabled>
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
                <label for="motor">Motor</label>
                <input type="text" id="motor" name="motor" value="${vehiculo.motor}" disabled>
                <label for="piloto">Piloto</label>
                <input type="text" id="piloto" name="piloto" value="${vehiculo.nombrePiloto}" disabled>
                <label for="velocidadMaxima">Velocidad Máxima</label>
                <input type="number" id="velocidadMaxima" name="velocidadMaxima" value="${vehiculo.velocidadMaximaKmh}" disabled>
                <label for="aceleracion">Aceleración</label>
                <input type="number" id="aceleracion" name="aceleracion" value="${vehiculo.aceleracion0a100}" disabled>
                <div class="form-group">
                    <label for="vehiculosRendimiento" class="form-label">Rendimiento Vehiculo</label>
                    <select id="vehiculoRendimiento">
                        <option selected>Seleccionar Rendimiento</option>
                        <option value="conduccionNormal">Conducción Normal</option>
                        <option value="conduccionAgresiva">Conducción Agresiva</option>
                        <option value="ahorroCombustible">Ahorro de Combustible</option>
                    </select>
                </div>
                <div class="vehiculosRendimiento"></div>
            `;

            const gestion = this.shadowRoot.getElementById("vehiculoRendimiento");
            const rendimientoDiv = this.shadowRoot.querySelector(".vehiculosRendimiento");

            gestion.addEventListener("change", () => {
                const selectedRendimiento = gestion.value;
                this.displayRendimientoInfo(vehiculo, selectedRendimiento, rendimientoDiv);
            });
        }
    }

    displayRendimientoInfo(vehiculo, rendimiento, container) {
        let velocidad;
        if (!rendimiento || !vehiculo.rendimiento[rendimiento]) {
            container.innerHTML = '';
            return;
        }

        if(rendimiento == "conduccionNormal"){
            velocidad = vehiculo.rendimiento[rendimiento].velocidadNormal;
        } else if(rendimiento == "conduccionAgresiva"){
            velocidad = vehiculo.rendimiento[rendimiento].velocidadAgresiva;
        } else if(rendimiento == "ahorroCombustible"){
            velocidad = vehiculo.rendimiento[rendimiento].velocidadPromedio;
        }

        container.innerHTML = `
        <label for="velocidad">Velocidad</label>
        <input type="number" id="velocidad" name="velocidad" value="${velocidad}" disabled>
        <h2>Consumo de Combustible</h2>
        <label for="consumoCombustible">Consumo de Combustible</label>
        <select id="climaSeleccionado">
            <option selected>Seleccionar Clima</option>
            <option value="seco">Seco</option>
            <option value="lluvioso">Lluvioso</option>
            <option value="extremo">Extremo</option>
        </select>
         <div class="consumoCombustible"></div>
        `;

        const climaSeleccionado = this.shadowRoot.querySelector('#climaSeleccionado');
        const consumoDiv = this.shadowRoot.querySelector(".consumoCombustible");

        climaSeleccionado.addEventListener("change", () => {
            const clima = climaSeleccionado.value;
            this.displayConsumoCombustible(vehiculo, rendimiento, clima, consumoDiv);
        });
    }

    displayConsumoCombustible(vehiculo, rendimiento, clima, consumoDiv) {
        let consumo;
        if (!clima || !vehiculo.rendimiento[rendimiento].consumoCombustible[clima]) {
            consumoDiv.innerHTML = '';
            return;
        }
        
        if(clima == "seco"){
            consumo = vehiculo.rendimiento[rendimiento].consumoCombustible.seco;
        } else if(clima == "lluvioso"){
            consumo = vehiculo.rendimiento[rendimiento].consumoCombustible.lluvioso;
        } else if(clima == "extremo"){
            consumo = vehiculo.rendimiento[rendimiento].consumoCombustible.extremo;
        }
        
        consumoDiv.innerHTML = `
            <label for="consumo">Consumo (L/100km)</label>
            <input type="text" id="consumo" name="consumo" value="${consumo}" disabled>
            <h2>Desgaste de Neumáticos</h2>
            <label for="desgasteNeumaticos">Desgaste de Neumáticos</label>
            <select id="desgasteSeleccionado">
                <option selected>Seleccionar Clima</option>
                <option value="seco">Seco</option>
                <option value="lluvioso">Lluvioso</option>
                <option value="extremo">Extremo</option>
            </select>
            <div class="desgasteNeumaticos"></div>
        `;

        const desgasteSeleccionado = this.shadowRoot.querySelector('#desgasteSeleccionado');
        const desgasteDiv = this.shadowRoot.querySelector(".desgasteNeumaticos");

        desgasteSeleccionado.addEventListener("change", () => {
            const desgaste = desgasteSeleccionado.value;
            this.displayDesgasteCombustibles(vehiculo, rendimiento, desgaste, desgasteDiv);
        });
    }

    displayDesgasteCombustibles(vehiculo, rendimiento, desgaste, desgasteDiv){
        let desgasteNeu;
        if (!desgaste || !vehiculo.rendimiento[rendimiento].desgasteNeumaticos[desgaste]) {
            desgasteDiv.innerHTML = '';
            return;
        }

        if(desgaste == "seco"){
            desgasteNeu = vehiculo.rendimiento[rendimiento].desgasteNeumaticos.seco;
        } else if (desgaste == "lluvioso"){
            desgasteNeu = vehiculo.rendimiento[rendimiento].desgasteNeumaticos.lluvioso;
        } else if(desgaste == "extremo"){
            desgasteNeu = vehiculo.rendimiento[rendimiento].desgasteNeumaticos.extremo;
        }

        desgasteDiv.innerHTML = `
        <label for="desgaste">Desgaste</label>
        <input type="text" id="desgaste" name="desgaste" value="${desgasteNeu}" disabled>
        `;
    }

    crearConfiguracion(){
        const formCrearConfig = this.shadowRoot.querySelector('#formCrearConfig');

        const formData = new FormData(formCrearConfig);
        const datos = Object.fromEntries(formData.entries());

        const usuario = {
            configuracion: {
                circuito: datos.nombreCircuito,
                vueltas: datos.vueltas, 
                longitud: datos.longitud,
                aceleracion: datos.aceleracion,
                velocidadMaxima: datos.velocidadMaxima,
                velocidad: datos.velocidad,
                consumo: datos.consumo,
                desgaste: datos.desgaste,
                piloto: datos.nombrePiloto,
                motor: datos.motor
            }
        };

        patchUsuarios(usuario, usuario.id)
            .then(response => {
                if (!response.ok) throw new Error(`Error: ${response.status}`);
                return response.json();
            })
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'Configuración registrada exitosamente',
                    showConfirmButton: false,
                    timer: 1500
                });
                alert("Configurado")
                formCrearConfig.reset();
                previewContainer.style.display = 'none';
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo guardar la configuración. Por favor, intente nuevamente.',
                });
                alert("Error")
            });
    }
}

customElements.define("juego-element", JuegoElement)