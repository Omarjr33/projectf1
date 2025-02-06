import Swal from 'sweetalert2';

//Componente de ingreso administrados
export class LoginFormula extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = /*html*/ `
            <style>
                :host {
                    display: block;
                    font-family: 'Arial', sans-serif;
                }

                .login-container {
                    background: white;
                    border-radius: 16px;
                    padding: 2rem;
                    width: 100%;
                    max-width: 400px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }

                .night-bg {
                    background: linear-gradient(180deg,#430707 0%,#0c0101 100%);
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 1rem;
                    position: relative;
                    overflow: hidden;
                }

                .stars {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                }

                .welcome {
                    color: #0c0101;
                    font-size: 2rem;
                    font-weight: bold;
                    margin-bottom: 1rem;
                    text-align: center;
                }

                .form-group {
                    margin-bottom: 1.5rem;
                }

                .input-field {
                    width: 92%;
                    padding: 0.75rem 1rem;
                    border: none;
                    border-radius: 25px;
                    background: rgba(102, 45, 94, 0.1);
                    font-size: 1rem;
                    color: #333;
                    transition: background 0.3s ease;
                }

                .input-field:focus {
                    outline: none;
                    background: rgba(102, 45, 45, 0.15);
                }

                .login-btn, .reload-btn {
                    width: 100%;
                    padding: 0.75rem;
                    border: none;
                    border-radius: 25px;
                    background: #430707;
                    color: white;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: background 0.3s ease;
                    margin-bottom: 0.5rem;
                }

                .reload-btn {
                    background: #43070794;
                }

                .login-btn:hover {
                    background: rgba(195, 9, 58, 0.71);
                }

                .reload-btn:hover {
                    background: rgba(0, 0, 0, 0.8);
                }
            </style>
            <!--Formulario de inicio de sesión-->
            <div class="night-bg">
                <div class="stars"></div>
                <div class="login-container">
                    <h1 class="welcome">INICIAR SESION</h1>
                    <form id="loginForm">
                        <div class="form-group">
                        <!--Nombre usuario-->
                            <input type="text" class="input-field" id="userAdmin" placeholder="Username">
                        </div>
                        <div class="form-group">
                        <!--Contraseña-->
                            <input type="password" class="input-field" id="passwordAdmin" placeholder="Password">
                        </div>
                        <!--Botón de login-->
                        <button type="submit" class="login-btn">LOGIN</button>
                        <!--Botón de regreso al principal-->
                        <button type="button" class="reload-btn" id="reloadButton">Regresar</button>
                    </form>
                </div>
            </div>
        `;

        this.addStars();
        this.addEventListener();
    }

    addStars() {
        const starsContainer = this.shadowRoot.querySelector('.stars');
        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: white;
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.8 + 0.2};
                animation: twinkle ${Math.random() * 4 + 2}s infinite ease-in-out;
            `;
            starsContainer.appendChild(star);
        }

        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @keyframes twinkle {
                0%, 100% { opacity: 0.2; }
                50% { opacity: 0.8; }
            }
        `;
        this.shadowRoot.appendChild(styleSheet);
    }

    addEventListener() {
        const form = this.shadowRoot.querySelector('#loginForm');
        const reloadButton = this.shadowRoot.querySelector('#reloadButton');
        
         //Manejo de eventos al hacer click en el botón de login
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.ingresoAdmin(); //Se llama la función de ingreso
        });

        reloadButton.addEventListener('click', () => {
            window.location.reload();
        });
    }

    //Validación de ingreso usuario
    ingresoAdmin() {
        //Se toman los valores del usuario y su contraseña
        const usuario = this.shadowRoot.querySelector("#userAdmin").value;
        const contraseña = this.shadowRoot.querySelector("#passwordAdmin").value;
        
        //Se verifica si el usuario y contraseña son correctos
        if (usuario === "admin" && contraseña === "admin123") {
            Swal.fire({
                icon: "success",
                title: "Welcome!",
                text: "Login successful",
            });
            this.adminIndex(); //Función para la página principal
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Incorrect username or password!",
            });
        }
    }

    /**
     * Función para la página principal
     */
    adminIndex() {
        this.shadowRoot.innerHTML = `
        <admin-index></admin-index>
        `;
    }
}

customElements.define("login-formula", LoginFormula);