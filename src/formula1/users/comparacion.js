
export class CompararVehiculos extends HTMLElement{
    constructor(){
        super()
        this.selectedCars= [];
        this.attachShadow({ mode: 'open' });
        this.render();
    }
    render() {
        this.shadowRoot.innerHTML = `
        <div class="comparison-container">
            <div class="car-selector">
                <select id="carSelect" name="carSelect">
                    <option value="">Seleccionar carro</option>
                </select>
            </div>
            <div id="comparisonTableContainer"></div>
        </div>
        `;
        
        this.fetchVehicles();
        this.attachEventListeners();
    }

    fetchVehicles() {
        fetch('../../../db.json')
        .then(response => response.json()) 
        .then(data => {
            const carSelect = this.shadowRoot.getElementById("carSelect");
            
            data.vehiculos.forEach(vehiculo => {
                const option = document.createElement("option");
                option.value = vehiculo.id;
                option.textContent = vehiculo.motor;
                carSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error al cargar los datos de vehiculos:", error);
        });
    }

    attachEventListeners() {
        const carSelect = this.shadowRoot.getElementById('carSelect');
        carSelect.addEventListener('change', (e) => {
            if (!e.target.value) return;

            const vehiculoId = parseInt(e.target.value);
            
            fetch('../../../db.json')
            .then(response => response.json())
            .then(data => {
                const vehiculo = data.vehiculos.find(v => v.id === vehiculoId);
                
                if (vehiculo && !this.selectedCars.find(vehiculo => vehiculo.id === vehiculoId)) {
                    this.selectedCars.push(vehiculo);
                    this.updateComparisonTable(data.vehiculos);
                }
                
               // e.target.value = '';  Reset select
            });
        });
    }

    removeCar(vehiculoId) {
        this.selectedCars = this.selectedCars.filter(vehiculo => vehiculo.id !== vehiculoId);
        this.updateComparisonTable();
    }

    getComparisonClass(value1, value2, feature) {
        if (this.selectedCars.length <= 1) return '';
    
        const v1 = parseFloat(value1);
        const v2 = parseFloat(value2);
    
        if (!isNaN(v1) && !isNaN(v2)) {
            const invertComparison = ['velocidadMaximaKmh', 'aceleracion0a100'].includes(feature);
    
            if (invertComparison) {
                return v1 < v2 ? 'better-value' : v1 > v2 ? 'worse-value' : '';
            } else {
                return v1 > v2 ? 'better-value' : v1 < v2 ? 'worse-value' : '';
            }
        }
        return '';
    }

    updateComparisonTable() {
        const container = this.shadowRoot.getElementById('comparisonTableContainer');
        if (this.selectedCars.length === 0) {
            container.innerHTML = '';
            return;
        }
    
        let html = `<table class="comparison-table"><thead><tr><th>Características</th>`;
    
        // Table headers
        this.selectedCars.forEach(vehiculo => {
            html += `
                <th>
                    <div class="car-header">
                        <span>${vehiculo.motor} ${vehiculo.modelo}</span>
                        <button class="remove-car" data-id="${vehiculo.id}">×</button>
                    </div>
                </th>`;
        });
        html += `</tr></thead><tbody>`;
    
        // Feature rows
        if (this.selectedCars.length > 0) {
            const features = Object.keys(this.selectedCars[0]).filter(key => 
                !['id', 'motor', 'modelo'].includes(key)
            );
    
            features.forEach(feature => {
                html += `<tr><td style="text-transform: capitalize;">${feature}</td>`;
    
                this.selectedCars.forEach((vehiculo, index) => {
                    const value = vehiculo[feature];
                    const comparisonClass = index > 0 
                        ? this.getComparisonClass(vehiculo[feature], this.selectedCars[0][feature], feature)
                        : '';
    
                    html += `<td class="${comparisonClass}">${value}</td>`;
                });
    
                html += '</tr>';
            });
        }
    
        html += '</tbody></table>';
        container.innerHTML = html;
    
        // Reattach remove car event listeners
        container.querySelectorAll('.remove-car').forEach(button => {
            button.addEventListener('click', (e) => {
                const vehiculoId = parseInt(e.target.dataset.id);
                this.removeCar(vehiculoId);
            });
        });
    }
    
    
}
customElements.define("comparar-vehiculos", CompararVehiculos);