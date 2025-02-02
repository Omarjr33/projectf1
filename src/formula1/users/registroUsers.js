import { postUsuarios, getUsuarios } from "../../Apis/usuariosApis.js";
import Swal from 'sweetalert2';

export class registroUser extends HTMLElement{
    constructor(){
        super();
        this.render();
    }
    render(){
        this.innerHTML = `
        <h2>Registro</h2>
        <form id="signupForm">
            <label for="username">Usuario:</label>
            <input type="text" id="username" name="usuario" required>
            <label for="password">Contraseña:</label>
            <input type="password" id="password" name="contraseña" required>
            <button id="btnRegistrarse" type="submit">Registar</button>
        </form>
        `;
        this.addEventListeners();
    }

    addEventListeners() {
        this.querySelector('#btnRegistrarse').addEventListener('click', async (event) => {
            event.preventDefault(); // Evita que el botón active el envío automático del formulario
    
            const username = this.querySelector('#username').value;
            const password = this.querySelector('#password').value;
    
            if (!username || !password) {
                Swal.fire({
                    icon: "info",
                    title: "Oops...",
                    text: "Complete todos los campos!",
                });
                return;
            }
    
            if (password.length < 8) {
                Swal.fire({
                    icon: "info",
                    title: "Oops...",
                    text: "La contraseña debe tener al menos 8 caracteres!",
                });
                return;
            }

            try {
                // Obtener lista de usuarios para verificar duplicados
                const users = await getUsuarios();

                // Verificar si el usuario ya está registrado
                const userExists = users.some(user => user.usuario === username);

                if (userExists) {
                    Swal.fire({
                        icon: "error",
                        title: "Usuario en uso",
                        text: "Usuario ya registrado. Intenta con otro.",
                    });
                    return;
                }

                // Si el usuario no existe, proceder con el registro
                const formData = new FormData(this.querySelector('#signupForm'));
                const datos = Object.fromEntries(formData.entries());

                const response = await postUsuarios(datos);

                if (!response.ok) {
                    throw new Error(`Error en el registro: ${response.status} - ${response.statusText}`);
                }

                Swal.fire({
                    icon: "success",
                    title: "Registro exitoso",
                    text: "¡Usuario registrado correctamente!",
                });

                // Limpiar formulario después de registrar
                this.querySelector('#signupForm').reset();

            } catch (error) {
                console.error("Error en el registro:", error.message);
                Swal.fire({
                    icon: "error",
                    title: "Error en el registro",
                    text: "Hubo un problema al registrar el usuario. Inténtelo de nuevo.",
                });
            }
        });
    }
    
}
customElements.define("registro-user", registroUser);