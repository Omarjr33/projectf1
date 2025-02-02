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
            <button type="submit">Ingresar</button>
        </form>
        `
    }
}
customElements.define("login-user", loginUser);