export class mainFormula extends HTMLElement{
    constructor(){
        super();
        this.render();
    }
    render(){
        this.innerHTML= /*html*/ `
        <div class="checkerboard-border left"></div>
        <div class="checkerboard-border right"></div>
        
        <div class="container">
            <nav>
                <div class="nav-links">
                    <a href="#" class="active">Inicio</a>
                    <a href="#">Carreras</a>
                    <a href="#">Autos</a>
                    <a href="#">Contactar</a>
                </div>
                <div class="auth-buttons">
                    <button class="btn btn-primary" id="btnLogin">Iniciar sesion</button>
                </div>
            </nav>
    
            <main class="hero">
                <h1>Carreras<br>DRIVING 101</h1>
                <img class="carf1" src="src/img/image 1efwef.png" alt="carf1">
            </main>
    
            <footer class="footer">
                <div class="contact-info">
                    <p>Gasdfgsdfg</p>
                    <p>Cco: +123-456-789 / +123-456-789</p>
                    <p>ciudad</p>
                </div> 
            </footer>
        </div>
        `;
        this.addEventListener();
    }

    addEventListener(){
        document.querySelector('#btnLogin').addEventListener('click', () => {
            this.logIn(); 
        });
    }

    logIn(){
        this.innerHTML= /*html*/ `
        <login-formula></login-formula>
        `;
    }

}
customElements.define("main-formula", mainFormula);
        