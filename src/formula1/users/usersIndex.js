import './buscarCircuitos.js'
import './buscarEquipos.js'
import './buscarPilotos.js'
import './buscarVehiculos.js'

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
            <div class="container" id="equipos" style="display:block;">
            <buscar-equipos></buscar-equipos>
            </div>
            <div class="container" id="pilotos" style="display:none;">
            <buscar-pilotos></buscar-pilotos>
            </div>
            <div class="container" id="circuitos" style="display:none;">
            <buscar-circuitos></buscar-circuitos>
            </div>
            <div class="container" id="vehiculos" style="display:none;">
            <buscar-vehiculos></buscar-vehiculos>
            </div>
        `;
    
        // Agregar event listeners a los enlaces de navegación
        this.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                // Remover clase 'active' de todos los enlaces
                this.querySelectorAll('.nav-link').forEach(navLink => {
                    navLink.classList.remove('active');
                });

                // Añadir clase 'active' al enlace clickeado
                e.target.classList.add('active');

                // Obtener la sección a mostrar
                const section = e.target.dataset.section;

                // Ocultar todos los contenedores
                ['equipos', 'pilotos', 'circuitos', 'vehiculos'].forEach(containerName => {
                    const container = this.querySelector(`#${containerName}`);
                    container.style.display = containerName === section ? 'block' : 'none';
                });

                // Cerrar el menú móvil si está abierto
                const collapse = this.querySelector('.navbar-collapse');
                collapse.classList.remove('show');
            });
        });
        // Agregar toggle para menú móvil
        const toggler = this.querySelector('.navbar-toggler');
        const collapse = this.querySelector('.navbar-collapse');
        
        toggler?.addEventListener('click', () => {
            collapse.classList.toggle('show');
        });
    }

}
customElements.define('users-index', usersIndex);