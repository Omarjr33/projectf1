import "./equiposAdmin.js";
import "./pilotosAdmin.js";
import "./circuitosAdmin.js";
import "./vehiculosAdmin.js";

export class adminIndex extends HTMLElement {
    constructor(){
        super();
        this.render();
    }

    render(){
        this.innerHTML= /*html*/ `
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">
            <a class="navbar-brand" href="#"><img class="img-fluid" src="../../../images/logo.png"></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link active navbar" aria-current="page" href="#" data-verocultar='["#equipos", ["#pilotos", "#circuitos", "#vehiculos"]]'>Equipos</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link navbar" aria-current="page" href="#" data-verocultar='["#pilotos", ["#equipos", "#circuitos", "#vehiculos"]]'>Pilotos</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link navbar" aria-current="page" href="#" data-verocultar='["#circuitos", ["#pilotos", "#equipos", "#vehiculos"]]'>Circuitos</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link navbar" aria-current="page" href="#" data-verocultar='["#vehiculos", ["#pilotos", "#circuitos", "#equipos"]]'>Vehículos</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div class="container" id="equipos" style="display:block;">
          <equipos-admin></equipos-admin>
        </div>
        <div class="container" id="pilotos" style="display:none;">
          <pilotos-admin></pilotos-admin>
        </div>
        <div class="container" id="circuitos" style="display:none;">
          <circuitos-admin></circuitos-admin>
        </div>
        <div class="container" id="vehiculos" style="display:none;">
          <vehiculos-admin></vehiculos-admin>
        </div>
        `;
        this.querySelectorAll(".navbar").forEach((val, id) => {
            val.addEventListener("click", (e)=>{
                let data = JSON.parse(e.target.dataset.verocultar);
                let cardVer = document.querySelector(data[0]);
                cardVer.style.display = 'block';
                data[1].forEach(card => {
                    let cardActual = document.querySelector(card);
                    cardActual.style.display = 'none';
                });
                e.stopImmediatePropagation();
                e.preventDefault();
            })
        });
    }
}
customElements.define("admin-index", adminIndex);