
export class usersIndex extends HTMLElement {
    constructor(){
        super();
        this.render();
    }

    render(){
        this.innerHTML = `
        <h2> Principal Usuarios</h2>
         <nav class="navbar navbar-expand-lg bg-body-tertiary">
     <div class="container-fluid">
         <a class="navbar-brand" href="#"><img class="img-fluid" src="src/img/f1.png" alt="F1 Logo"></a>
         <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="nabarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">

         gt
             <span class="navbar-toggler-icon"></span>
         </button>
         <div class="navbar-collapse" id="navbarSupportedContent">
             <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                 <li class="nav-item">
                     <a class="nav-link active" href="#" data-section="equipos">Equipos</a>
                 </li>
                 <li class="nav-item">
                     <a class="nav-link" href="#" data-section="pilotos">Pilotos</a>
                 </li>
                 <li class="nav-item">
                     <a class="nav-link" href="#" data-section="circuitos">Circuitos</a>
                 </li>
                 <li class="nav-item">
                     <a class="nav-link" href="#" data-section="vehiculos">Vehículos</a>
                 </li>
             </ul>
         </div>
     </div>
 </nav>
        `;
    }

}
customElements.define('users-index', usersIndex);