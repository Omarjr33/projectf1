export class perfilUsers extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.userData = null;
        this.render();
        this.loadData();
    }

    async loadData() {
        try {
            const response = await fetch('./db.json');
            const data = await response.json();
            console.log("Datos cargados:", data);

            let usuarioActual = localStorage.getItem('usuario');

            // Si no hay usuario en localStorage, tomar el primer usuario del JSON
            if (!usuarioActual && data.users.length > 0) {
                usuarioActual = data.users[0].usuario;
                localStorage.setItem('usuario', usuarioActual); // Guardar en localStorage
                console.log("Usuario por defecto guardado:", usuarioActual);
            }

            console.log("Usuario actual en localStorage:", usuarioActual);

            const usuario = data.users.find(user => user.usuario === usuarioActual);

            if (usuario) {
                this.userData = usuario;
                this.updateInfo();
            } else {
                this.showError(`Usuario "${usuarioActual}" no encontrado`);
            }
        } catch (error) {
            console.error('Error cargando datos:', error);
            this.showError('Error al cargar los datos');
        }
    }

    updateInfo() {
        if (!this.userData) {
            console.error("No hay datos de usuario para actualizar");
            return;
        }

        console.log("Actualizando información con:", this.userData);
        const username = this.shadowRoot.querySelector('#username');
        const tbody = this.shadowRoot.querySelector('tbody');
        
        if (this.userData) {
            // Actualizar nombre de usuario
            username.textContent = this.userData.usuario;
            
            // Actualizar tabla con configuraciones
            const config = this.userData.configuracion;
            tbody.innerHTML = Object.entries(config)
                .map(([key, value], index) => `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${this.formatKey(key)}</td>
                        <td>${value}</td>
                    </tr>
                `).join('');
        }
    }

    formatKey(key) {
        return key
            .replace(/([A-Z])/g, ' $1') // Agrega espacio antes de mayúsculas
            .split(/(?=[A-Z])/).join(' ') // Separa camelCase
            .replace(/^./, str => str.toUpperCase()) // Primera letra mayúscula
            .replace('Kmh', 'KM/H'); // Caso especial para KM/H
    }

    showError(message) {
        console.error("Error mostrado:", message);
        const tbody = this.shadowRoot.querySelector('tbody');
        if (tbody) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="3" class="error-message">
                        ${message}
                    </td>
                </tr>`;
        }
    }

    render() {
        this.shadowRoot.innerHTML = `    
        <div class="perfil-container">
            <div class="content" id="info">
                <p>Bienvenido, <span id="username">Usuario</span></p>
                <h3>Configuración del Juego</h3>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Parámetro</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="3" style="text-align: center;">
                                Cargando datos...
                            </td>
                        </tr>
                    </tbody>
                </table>         
            </div>
        </div>`;
    }
}

customElements.define("perfil-users", perfilUsers);
