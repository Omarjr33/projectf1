
export class perfilUsers extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
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
                <th>Nombre</th>
                <th>Edad</th>
                <th>País</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>Ana</td>
                <td>22</td>
                <td>Colombia</td>
            </tr>
        </tbody>
    </table>         
                </div>
            `;

    }
}
customElements.define("perfil-users", perfilUsers)
