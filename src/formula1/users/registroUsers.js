import { postUsuarios } from "../../Apis/usuariosApis.js";

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
        this.addEventListener();
    }

    addEventListener(){
        document.getElementById('signupForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form from submitting the default way
      
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
      
            // Validate fields are not empty
            if (!username || !password) {
                alert('Campos requeridos');
                return;
            }
      
            // Validate password length
            if (password.length < 8) {
                alert('La contraseña debe tener al menos 8 caracteres');
                return;
            }

            const formData = new FormData(signupForm);
            const datos = Object.fromEntries(formData.entries());
            postUsuarios(datos)
            .then(response => {
                // Verificar si la solicitud fue exitosa (código de respuesta en el rango 200)
                if (response.ok) {
                    return response.json(); // Devolver la respuesta como JSON
                } else {
                    // Si la respuesta no fue exitosa, lanzar una excepción
                    throw new Error(`Error en la solicitud POST: ${response.status} - ${response.statusText}`);
                }
            })
            .then(responseData => {
                // Hacer algo con la respuesta exitosa si es necesario
                console.log('Respuesta exitosa:', responseData);
            })
            .catch(error => {
                console.error('Error en la solicitud POST:', error.message);
                // Puedes manejar el error de otra manera si es necesario
            });
            e.stopImmediatePropagation();
            e.preventDefault();
        })
    }

}
customElements.define("registro-user", registroUser);