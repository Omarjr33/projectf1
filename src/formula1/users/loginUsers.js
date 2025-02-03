import { getUsuarios } from "../../Apis/usuariosApis.js";
import Swal from 'sweetalert2';

export class loginUser extends HTMLElement {
    constructor(){
        super();
        this.render();
    }

    render(){
        this.innerHTML = `
        <h2>Ingresar</h2>
        <form id="loginForm">
            <label for="username">Usuario:</label>
            <input type="text" id="usernames" name="usuario" required>
            <label for="password">Contraseña:</label>
            <input type="password" id="passwords" name="contraseña" required>
            <button type="button" id="btnIngresar">Ingresar</button>
        </form>
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
                }

                // Verificar la contraseña
                if (user.contraseña !== password) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Contraseña Incorrecta!",
                    });
                    return;
                }

                Swal.fire({
                    icon: "success",
                    title: "Bienvenido!",
                    text: "Ingreso Exitoso",
                });
                loginForm.reset();
                console.log('Usuario autenticado:', user);

            } catch (error) {
                console.error("Error al iniciar sesión:", error.message);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error al iniciar sesión!",
                });
            }
        });
    }
}

customElements.define("login-user", loginUser);
