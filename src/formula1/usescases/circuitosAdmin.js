export class circuitosAdmin extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render() {
        let idCircuito = Date.now();
        const styles = `
            :host {
                display: block;
                font-family: 'Segoe UI', system-ui, sans-serif;
            }

            .card {
                background: #1a1a1a;
                border-radius: 12px;
                padding: 2rem;
                box-shadow: 0 8px 24px rgba(0,0,0,0.2);
                color: #ffffff;
                transition: transform 0.2s ease;
            }

            .card:hover {
                transform: translateY(-2px);
            }

            .form-group {
                margin-bottom: 1.5rem;
            }

            .row {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 2rem;
                margin-bottom: 1rem;
            }

            label {
                display: block;
                margin-bottom: 0.5rem;
                font-size: 0.9rem;
                color: #9ca3af;
            }

            input {
                width: 100%;
                padding: 0.75rem;
                border: 1px solid #374151;
                background: #27272a;
                border-radius: 6px;
                color: #ffffff;
                font-size: 1rem;
                transition: border-color 0.2s ease;
            }

            input:focus {
                outline: none;
                border-color:rgb(132, 0, 0);
                box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
            }

            input:disabled {
                background: #374151;
                cursor: not-allowed;
            }

            button {
                background:rgb(183, 16, 16);
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 6px;
                font-weight: 500;
                cursor: pointer;
                transition: background-color 0.2s ease;
            }

            button:hover {
                background:rgb(93, 8, 8);
            }

            @media (max-width: 640px) {
                .card {
                    padding: 1.5rem;
                }
            }
        `;

        this.shadowRoot.innerHTML = `
            <style>${styles}</style>
            <div class="card">
                <form id="formCrearCircuito">
                    <div class="form-group">
                        <label for="idCircuito">ID</label>
                        <input type="number" id="idCircuito" name="idCircuito" value="${idCircuito}" disabled>
                    </div>

                    <div class="row">
                        <div class="form-group">
                            <label for="nombreCircuito">Nombre Circuito</label>
                            <input type="text" id="nombreCircuito" name="nombreCircuito" placeholder="Ingrese nombre del circuito">
                        </div>
                        <div class="form-group">
                            <label for="paisCircuito">País</label>
                            <input type="text" id="paisCircuito" name="paisCircuito" placeholder="Ingrese país">
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group">
                            <label for="vueltas">Vueltas</label>
                            <input type="number" id="vueltas" name="vueltas" placeholder="Número de vueltas">
                        </div>
                        <div class="form-group">
                            <label for="longitud">Longitud KM</label>
                            <input type="number" id="longitud" name="longitud" placeholder="Longitud en kilómetros">
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group">
                            <label for="imageCircuito">Imagen</label>
                            <input type="url" id="imageCircuito" name="imageCircuito" placeholder="URL de la imagen">
                        </div>
                        <div class="form-group">
                            <label for="descripcion">Descripción</label>
                            <input type="text" id="descripcion" name="descripcion" placeholder="Descripción del circuito">
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group">
                            <button id="btnRegistrarCircuito" type="submit">Registrar Circuito</button>
                        </div>
                    </div>
                </form>
            </div>
        `;
    }
}

customElements.define("circuitos-admin", circuitosAdmin);