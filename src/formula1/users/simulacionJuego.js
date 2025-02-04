import { getUsuarios } from "../../Apis/usuariosApis";

export class SimulacionJuego extends HTMLElement{
    constructor(){
        super();
        this.render();
        this.attachShadow({ mode: 'open' });
    }

    render(){
        this.shadowRoot.innerHTML = `
       <h1>Juego</h1> 
        `;
    }

    obtenerDataUsuario(id) {
        const id = window.idUser;
        fetch('../../../db.json')
            .then(response => response.json()) // Convertimos la respuesta en un objeto JSON
            .then(data => {
                // Buscamos el usuario con el id que coincida
                const user = data.users.find(user => user.id === id);
                if (user) {
                    console.log("Usuario encontrado:", usuario);
                } else {
                    console.log("Usuario no encontrado con id:", id);
                }
            })
            .catch(error => {
                console.error('Error al cargar el archivo JSON:', error);
            });
    }
}

customElements.define("simulacion-juego", SimulacionJuego)