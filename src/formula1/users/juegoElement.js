export class JuegoElement extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render(){

    }
}
customElements.define("juego-element", JuegoElement)