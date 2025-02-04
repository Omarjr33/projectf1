class Circuito {
    constructor(name, laps, length, weather) {
        this.name = name;
        this.laps = laps;
        this.length = length;
        this.weather = weather;
    }
}

class Car {
    constructor(acceleration, maxSpeed, normalSpeed) {
        this.acceleration = acceleration;
        this.maxSpeed = maxSpeed;
        this.normalSpeed = normalSpeed;
        this.fuelConsumption = {
            dry: 1.9,
            rainy: 2.1,
            extreme: 2.4
        };
        this.tireWear = {
            dry: 1.5,
            rainy: 0.8,
            extreme: 2.5
        };
    }
}

class Driver {
    constructor(name, number, car) {
        this.name = name;
        this.number = number;
        this.car = car;
        this.lapTimes = [];
        this.totalTime = 0;
    }
}

class SingleDriverRace {
    constructor(circuit, driver) {
        this.circuit = circuit;
        this.driver = driver;
    }

    calculateLapTime() {
        const baseTime = (this.circuit.length / this.driver.car.normalSpeed) * 3600;
        const currentLap = this.driver.lapTimes.length + 1;
        
        const weatherEffect = {
            dry: 1,
            rainy: 1.2,
            extreme: 1.4
        }[this.circuit.weather];
        
        const tireWear = this.driver.car.tireWear[this.circuit.weather] * (currentLap / this.circuit.laps);
        const fuelEffect = this.driver.car.fuelConsumption[this.circuit.weather] * (currentLap / this.circuit.laps);
        const randomFactor = 0.95 + Math.random() * 0.1;

        return baseTime * weatherEffect * (1 + tireWear) * (1 + fuelEffect) * randomFactor;
    }

    simulate() {
        this.driver.lapTimes = [];
        this.driver.totalTime = 0;

        for (let lap = 1; lap <= this.circuit.laps; lap++) {
            const lapTime = this.calculateLapTime();
            this.driver.lapTimes.push(lapTime);
            this.driver.totalTime += lapTime;
        }
    }

    getResults() {
        const formatTime = (seconds) => {
            const mins = Math.floor(seconds / 60);
            const secs = (seconds % 60).toFixed(3);
            return `${mins}:${secs.padStart(6, '0')}`;
        };

        return {
            driverName: this.driver.name,
            number: this.driver.number,
            totalTime: formatTime(this.driver.totalTime),
            lapTimes: this.driver.lapTimes.map((time, index) => ({
                lap: index + 1,
                time: formatTime(time)
            }))
        };
    }
}

// Función para cargar los datos desde db.json
function loadData() {
    fetch('../../../db.json')
        .then(response => response.json())
        .then(data => {
            populateCircuitos(data.circuitos);
            populateVehiculos(data.vehiculos);
            window.gameData = data; // Guardamos los datos en una variable global
        });
}

// Función para llenar el select de circuitos
function populateCircuitos(circuitos) {
    const circuitoSelect = document.querySelector("#circuitoSelect");
    circuitoSelect.innerHTML = `<option value="">Seleccionar Circuito</option>`;

    circuitos.forEach(circuito => {
        const option = document.createElement("option");
        option.value = circuito.id;
        option.textContent = circuito.nombreCircuito;
        circuitoSelect.appendChild(option);
    });
}

// Función para llenar el select de vehículos
function populateVehiculos(vehiculos) {
    const vehiculoSelect = document.querySelector("#vehiculoSelect");
    vehiculoSelect.innerHTML = `<option value="">Seleccionar Vehiculo</option>`;

    vehiculos.forEach(vehiculo => {
        const option = document.createElement("option");
        option.value = vehiculo.id;
        option.textContent = vehiculo.motor;
        vehiculoSelect.appendChild(option);
    });
}

// Evento para iniciar la simulación cuando se hace clic en el botón "Jugar"
document.querySelector('#btnJugar').addEventListener("click", (event) => {
    event.preventDefault();

    const circuitoId = document.querySelector("#circuitoSelect").value;
    const vehiculoId = document.querySelector("#vehiculoSelect").value;

    if (!circuitoId || !vehiculoId) {
        alert("Selecciona un circuito y un vehículo");
        return;
    }

    const circuitoData = window.gameData.circuitos.find(c => c.id === circuitoId);
    const vehiculoData = window.gameData.vehiculos.find(v => v.id === vehiculoId);

    // Crear instancias de las clases con los datos seleccionados
    const circuito = new Circuit(circuitoData.nombreCircuito, circuitoData.vueltas, circuitoData.longitud, "dry");
    const car = new Car(vehiculoData.aceleracion0a100, vehiculoData.velocidadMaximaKmh, vehiculoData.velocidad);
    const driver = new Driver(vehiculoData.nombrePiloto, vehiculoId, car);

    const race = new SingleDriverRace(circuito, driver);
    race.simulate();
    
    displayResults(race.getResults());
});

// Función para mostrar los resultados en la interfaz
function displayResults(results) {
    const resultsDiv = document.querySelector(".raceResults");
    resultsDiv.innerHTML = `
        <h2>Resultados</h2>
        <p>Piloto: ${results.driverName}</p>
        <p>Tiempo Total: ${results.totalTime}</p>
        <h3>Vueltas:</h3>
        <ul>
            ${results.lapTimes.map(lap => `<li>Vuelta ${lap.lap}: ${lap.time}</li>`).join("")}
        </ul>
    `;
}

// Cargar los datos cuando la página se carga
loadData();
