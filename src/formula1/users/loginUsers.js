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
            <input type="text" id="usernames" id="usuario" required>
            <label for="password">Contraseña:</label>
            <input type="password" id="passwords" name="contraseña" required>
            <button type="submit" id="btnIngresar">Ingresar</button>
        </form>
        `;
        this.addEventListeners();
    }

    addEventListeners() {
        this.querySelector('#btnIngresar').addEventListener('click', async (e) => {
            e.preventDefault();

            const username = this.querySelector('#usernames').value;
            const password = this.querySelector('#passwords').value;

            if (!username || !password) {
                Swal.fire({
                    icon: "info",
                    title: "Oops...",
                    text: "Complete todos los campos!",
                });
                return;
            }

            try {
                const response = await getUsuarios();

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }

                const users = await response.json();

                // Verificar si el usuario existe en la base de datos (JSON)
                const user = users.find(user => user.usuario === username);

                if (!user) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Usuario no registrado!",
                    });
                    return;
                }

                // Verificar si la contraseña es correcta
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
                console.log('Usuario autenticado:', user);
                
                // Aquí podrías redirigir a otra página o guardar el usuario en sesión
            } catch (error) {
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