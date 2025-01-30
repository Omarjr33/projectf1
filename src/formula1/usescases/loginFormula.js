import Swal from 'sweetalert2'

export class loginFormula extends HTMLElement{
    constructor(){
        super();
        this.render();
    }
    render(){
        //Login Admin
        this.innerHTML= /*html*/ `
        <form>
            <div class="form-group">
                <label for="userAdmin">Administrador</label>
                <input type="text" class="form-control" id="userAdmin" placeholder="Ingrese su usuario">
            </div>
            <div class="form-group">
                <label for="passwordAdmin">Contraseña</label>
                <input type="password" class="form-control" id="passwordAdmin" placeholder="Ingrese su contraseña">
            </div>
            <button id="btnIngresar" type="submit" class="btn btn-primary">Ingresar</button>
            </form>
        `;
        this.addEventListener();
    }

    addEventListener(){
        document.querySelector('#btnIngresar').addEventListener('click', () => {
            this.ingresoAdmin(); 
        });
    }

    ingresoAdmin(){
        let usuario = this.querySelector("#userAdmin").value;
        let contraseña = this.querySelector("#passwordAdmin").value;
        if(usuario === "admin" && contraseña === "admin123"){
            //window.location.hash = "#/admin";
            alert("Bienvenido Admin");
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Usuario o contraseña incorrecto!",
            });
        }
    }
}

customElements.define("login-formula", loginFormula);