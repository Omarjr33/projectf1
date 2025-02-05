import { getUsuarios } from "../../Apis/usuariosApis.js";

import Swal from 'sweetalert2';
import "./usersIndex.js";

export class loginUser extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    render() {
        this.innerHTML = `
        <style>
            .login-container {
                background-color: #1c1c1c;
                border-radius: 10px;
                padding: 30px;
                max-width: 400px;
                margin: 100px auto;
                box-shadow: 0 0 30px rgba(255, 0, 0, 0.1);
                border: 1px solid #333;
            }

            h2 {
                color: #ffffff;
                text-align: center;
                font-size: 28px;
                margin-bottom: 30px;
                text-transform: uppercase;
                letter-spacing: 2px;
                text-shadow: 2px 2px 4px rgba(255, 0, 0, 0.3);
            }

            form {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }

            label {
                color: #ffffff;
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 5px;
                display: block;
            }

            input {
                width: 100%;
                padding: 12px;
                background-color: #2d2d2d;
                border: 2px solid #333;
                border-radius: 5px;
                color: #ffffff;
                font-size: 16px;
                transition: all 0.3s ease;
                box-sizing: border-box;
            }

            input:focus {
                outline: none;
                border-color: #ff0000;
                box-shadow: 0 0 10px rgba(255, 0, 0, 0.3);
            }

            button {
                background: linear-gradient(45deg, #ff0000, #cc0000);
                color: white;
                padding: 15px;
                border: none;
                border-radius: 5px;
                font-size: 16px;
                text-transform: uppercase;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            }

            button:before {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: rgba(255, 255, 255, 0.1);
                transform: rotate(45deg);
                transition: 0.5s;
            }

            button:hover:before {
                left: 100%;
            }

            button:hover {
                transform: translateY(-3px);
                box-shadow: 0 7px 20px rgba(255, 0, 0, 0.3);
            }

            button:active {
                transform: translateY(-1px);
            }
        </style>
        <div class="login-container">
            <h2>Ingresar</h2>
            <form id="loginForm">
                <div>
                    <label for="username">Usuario:</label>
                    <input type="text" id="usernames" name="usuario" required>
                </div>
                <div>
                    <label for="password">Contraseña:</label>
                    <input type="password" id="passwords" name="contraseña" required>
                </div>
                <button type="button" id="btnIngresar">Ingresar</button>
            </form>
        </div>
        `;
        this.addEventListeners();
    }

    addEventListeners() {
        const loginForm = this.querySelector('#loginForm');
        this.querySelector('#btnIngresar').addEventListener('click', async (e) => {
            e.preventDefault();

            const username = this.querySelector('#usernames').value.trim().toUpperCase();
            const password = this.querySelector('#passwords').value.trim();

            if (!username || !password) {
                Swal.fire({
                    icon: "info",
                    title: "Oops...",
                    text: "Complete todos los campos!",
                });
                return;
            }

            try {
                const users = await getUsuarios(); // Ahora devuelve directamente el JSON

                if (!Array.isArray(users)) {
                    throw new Error("Los datos de usuarios no son válidos.");
                }

                // Verificar si el usuario existe
                const user = users.find(user => user.usuario.toUpperCase() === username);

                if (!user) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Usuario no registrado!",
                    });
                    return;
                } else if (user.contraseña !== password) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Contraseña Incorrecta!",
                    });
                    return;
                } else {
                    Swal.fire({
                        icon: "success",
                        title: "Bienvenido!",
                        text: "Ingreso Exitoso",
                    });
                    window.idUser = user.id;
                    window.user = user.usuario;
                    this.adminUsers();
                    loginForm.reset();
                    //console.log('Usuario autenticado:', user);
                }
            } catch (error) {
                //console.error("Error al iniciar sesión:", error.message);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error al iniciar sesión!",
                });
            }
        });
    }

    adminUsers() {
        //Component Página Pilotos
        this.innerHTML = `
        <users-index></users-index>
        `;
    }
}

customElements.define("login-user", loginUser);