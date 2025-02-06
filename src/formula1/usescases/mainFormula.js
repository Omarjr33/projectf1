//Importar login usuario
import "../users/usersAccess.js";
export class mainFormula extends HTMLElement{
    constructor(){
        super();
        this.render();
    }
    render(){
        this.innerHTML= /*html*/ `
        <div class="container">
        <!--Navbar página principal-->
        <nav>
            <img class="logo" src="src/img/f1.png" alt="logo">
            <div class="nav-links" id="nav-links">
                <a href="#inicio" class="nav-link active" data-section="inicio">Inicio</a>
                <a href="#carreras" class="nav-link" data-section="carreras">Carreras</a>
                <a href="#autos" class="nav-link" data-section="autos">Autos</a>
            </div>
            <div class="auth-buttons">
                <!--Botón para inciar sesión como administrador-->
                <button class="btn btn-primary" id="btnLogin">Iniciar sesión</button>
            </div>
            <div class="burger" id="burger">
                <div class="burger-icon"></div>
                <div class="burger-icon"></div>
                <div class="burger-icon"></div>
            </div>
        </nav>

        <!-- Sección Inicio -->
        <section id="inicio" class="section active">
            <div class="hero-section">
                <div class="content-wrapper">
                    <div class="text-content">
                        <h1 class="pilot-title" id="pilot-name">Lewis Hamilton</h1>
                        <p class="pilot-description" id="pilot-description">
                            Piloto británico, siete veces campeón del mundo. Un ícono del deporte que ha redefinido 
                            los límites de la Fórmula 1 con su extraordinaria habilidad y determinación inquebrantable.
                        </p>
                    </div>
                    <div class="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active" data-name="Max Verstappen" data-description="Piloto neerlandés de Fórmula 1. Compite para el equipo Red Bull Racing y es reconocido por su agresividad en pista, talento natural y habilidades excepcionales para adelantar.">
                                <img src="src/img/im1.png" alt="Max Verstappen">
                            </div>
                            <div class="carousel-item" data-name="Alex Albon" data-description="Piloto británico, corre para el equipo Williams Racing y es conocido por su talento en pista, consistencia y capacidad de defensa en carrera.">
                                <img src="src/img/im2.png" alt="Max Verstappen">
                            </div>
                            <div class="carousel-item" data-name="Liam Lawson" data-description="Piloto neozelandés, es parte del programa de jóvenes pilotos de Red Bull y ha competido en diversas categorías de monoplazas, incluyendo la Fórmula 2 y la Super Fórmula japonesa.">
                                <img src="src/img/liam-lawson.b09c773d.png" alt="Charles Leclerc">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Sección Carreras -->
        <section id="carreras" class="section">
            <div class="hero-section">
                <div class="content-wrapper">
                    <div class="text-content">
                        <h1 class="pilot-title">Grandes Premios</h1>
                        <p class="pilot-description">
                            Descubre los circuitos más emblemáticos del mundo de la Fórmula 1.
                        </p>
                    </div>
                    <div class="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active" data-name="Mónaco" data-description="El circuito más prestigioso y desafiante del calendario de F1, donde la precisión y el control son fundamentales.">
                                <img src="src/img/cir3.jpg" alt="Circuito de Mónaco">
                            </div>
                            <div class="carousel-item" data-name="Silverstone" data-description="Hogar del automovilismo británico, un circuito histórico conocido por sus curvas de alta velocidad.">
                                <img src="src/img/cir1.jpg" alt="Circuito de Silverstone">
                            </div>
                            <div class="carousel-item" data-name="Spa-Francorchamps" data-description="El legendario circuito belga, famoso por su icónica curva Eau Rouge y condiciones climáticas impredecibles.">
                                <img src="src/img/cir2.jpg" alt="Circuito de Spa">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Sección Autos -->
        <section id="autos" class="section">
            <div class="hero-section">
                <div class="content-wrapper">
                    <div class="text-content">
                        <h1 class="pilot-title">Monoplazas F1</h1>
                        <p class="pilot-description">
                            Los autos más rápidos y tecnológicamente avanzados del mundo.
                        </p>
                    </div>
                    <div class="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active" data-name="Mercedes W12" data-description="El dominante monoplaza de Mercedes, una obra maestra de la ingeniería moderna.">
                                <img src="src/img/mercedes.png" alt="Mercedes W12">
                            </div>
                            <div class="carousel-item" data-name="Red Bull RB16B" data-description="Una máquina de precisión diseñada para maximizar la eficiencia aerodinámica.">
                                <img src="src/img/redbull.png" alt="Red Bull RB16B">
                            </div>
                            <div class="carousel-item" data-name="Ferrari SF21" data-description="El legendario Cavallino Rampante, combinando potencia y elegancia italiana.">
                                <img src="src/img/ferrari.png" alt="Ferrari SF21">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <footer class="footer">
            <div class="contact-info">
                <section class="botao-2">
                    <div class="conteudo__interno">
                        <button id="btnLoginUser">Simulador de carreras</button>
                    </div>
                </section>
            </div>
        </footer>
    </div>
        `;
         // Variables globales
         const carouselItems = document.querySelectorAll('.carousel-item');
         const navLinks = document.querySelectorAll('.nav-link');
         const sections = document.querySelectorAll('.section');
         let currentIndex = 0;
 
         // Fondos para cada sección
         const sectionBackgrounds = {
             inicio: [
                 'src/img/formula-nurburgring.avif',
                 'src/img/R.jpg',
                 'src/img/Circuit-de-Spa-Francorchamps-e1396511831156.jpg'
             ],
             carreras: [
                 'src/img/monc.jpg',
                 'src/img/silv.jpg',
                 'src/img/spa.jpg'
             ],
             autos: [
                 'src/img/f1.webp',
                 'src/img/f2.jpg',
                 'src/img/f3.webp'
             ]
         };
 
         // Función para actualizar el carrusel
         function updateCarousel(section) {
             const items = section.querySelectorAll('.carousel-item');
             items.forEach((item, index) => {
                 const offset = (index - currentIndex + items.length) % items.length;
                 
                 item.classList.remove('active', 'prev', 'next');
                 
                 if (index === currentIndex) {
                     item.classList.add('active');
                     const name = item.getAttribute('data-name');
                     const description = item.getAttribute('data-description');
                     const titleEl = section.querySelector('.pilot-title');
                     const descEl = section.querySelector('.pilot-description');
                     
                     if (titleEl && name) titleEl.textContent = name;
                     if (descEl && description) descEl.textContent = description;
                     
                     // Actualizar fondo
                     const backgrounds = sectionBackgrounds[section.id];
                     if (backgrounds && backgrounds[index]) {
                         section.querySelector('.hero-section').style.backgroundImage = `url(${backgrounds[index]})`;
                     }
                 }
 
                 const yPos = offset > items.length / 2 ? offset - items.length : offset;
                 
                 if (index === ((currentIndex - 1 + items.length) % items.length)) {
                     item.classList.add('prev');
                     item.style.transform = `scale(0.8) translateY(${yPos * 100}%)`;
                 } else if (index === ((currentIndex + 1) % items.length)) {
                     item.classList.add('next');
                     item.style.transform = `scale(0.8) translateY(${yPos * 100}%)`;
                 } else if (item.classList.contains('active')) {
                     item.style.transform = 'scale(1.2) translateY(0)';
                 } else {
                     item.style.transform = `scale(0.7) translateY(${yPos * 100}%)`;
                 }
             });
         }
 
         // Función para cambiar de sección
         function switchSection(sectionId) {
             sections.forEach(section => {
                 section.classList.remove('active');
                 section.classList.remove('fade-enter');
                 section.classList.remove('fade-exit');
             });
             
             navLinks.forEach(link => {
                 link.classList.remove('active');
             });
 
             const targetSection = document.getElementById(sectionId);
             const targetLink = document.querySelector(`[data-section="${sectionId}"]`);
 
             targetSection.classList.add('fade-enter');
             setTimeout(() => {
                 targetSection.classList.add('active');
                 targetSection.classList.remove('fade-enter');
                 // Reiniciar el carrusel para la nueva sección
                 currentIndex = 0;
                 updateCarousel(targetSection);
             }, 50);
 
             targetLink.classList.add('active');
         }
 
         // Event listeners
         navLinks.forEach(link => {
             link.addEventListener('click', (e) => {
                 e.preventDefault();
                 const sectionId = link.getAttribute('data-section');
                 switchSection(sectionId);
             });
         });
 
         document.getElementById('burger').addEventListener('click', function() {
             const navLinks = document.getElementById('nav-links');
             navLinks.classList.toggle('active');
         });
 
         // Inicializar carruseles
         sections.forEach(section => {
             if (section.classList.contains('active')) {
                 updateCarousel(section);
             }
         });
 
         // Autoplay para los carruseles
         setInterval(() => {
             sections.forEach(section => {
                 if (section.classList.contains('active')) {
                     currentIndex = (currentIndex + 1) % section.querySelectorAll('.carousel-item').length;
                     updateCarousel(section);
                 }
             });
         }, 4000);
        this.addEventListener();
    }

    /**
     * Manejo de eventos en los ingresos
     */
    addEventListener(){
        //Ingreso administrados
        document.querySelector('#btnLogin').addEventListener('click', () => {
            this.logIn(); 
        });

        //Ingreso usuario
        document.querySelector('#btnLoginUser').addEventListener('click', () => {
            this.logInUser(); 
        });
    }

    /**
     * Ingreso administrador
     */
    logIn(){
        this.innerHTML= /*html*/ `
        <login-formula></login-formula>
        `;
    }

    /**
     * Ingreso usuario
     */
    logInUser(){
        this.innerHTML= /*html*/ `
        <users-access></users-access>
        `;
    }

}
customElements.define("main-formula", mainFormula);
        