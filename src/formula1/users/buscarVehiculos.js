import { getVehiculos } from "../../Apis/vehiculosApis.js";
import { getPilotos } from "../../Apis/pilotosApis.js";
import "./comparacion.js"

export class BuscarVehiculos extends HTMLElement {
   constructor() {
       super();
       this.attachShadow({ mode: 'open' });
       this.render();
       this.vehiculos = []; // Array para almacenar los vehículos
       this.pilotos = []; // Array para almacenar los pilotos
   }
    // Se ejecuta cuando el componente es añadido al DOM
   connectedCallback() {
       this.getData(); // Obtiene los datos de vehículos y pilotos
   }
 // Método para obtener los datos de vehículos y pilotos
   getData() {
       Promise.all([getVehiculos(), getPilotos()])
           .then(([vehiculos, pilotos]) => {
                // Al recibir los datos, los guarda en las propiedades del componente
               this.pilotos = pilotos;
               this.vehiculos = vehiculos;
               this.renderGallery(); // Renderiza la galería con los vehículos
           })
           .catch((error) => {
               console.error('Error en la solicitud GET:', error.message);
           });
   }

   render() {
       this.shadowRoot.innerHTML = /*html*/`
       <style>
           .container {
               padding: 2rem 0;
           }

           h2 {
               color: #ffffff;
               font-size: 2.5rem;
               font-weight: 600;
               margin-bottom: 2rem;
               text-transform: uppercase;
               letter-spacing: 2px;
               text-align: center;
               text-shadow: 0 0 10px rgba(237, 28, 36, 0.5);
           }

           .search-bar {
               width: 100%;
               max-width: 500px;
               margin: 0 auto 2rem;
               display: block;
               padding: 1rem 1.5rem;
               border: 2px solid rgba(237, 28, 36, 0.3);
               border-radius: 8px;
               background: rgba(30, 30, 30, 0.95);
               color: #ffffff;
               font-size: 1rem;
               transition: all 0.3s ease;
           }

           .search-bar:focus {
               outline: none;
               border-color: #ED1C24;
               box-shadow: 0 0 15px rgba(237, 28, 36, 0.3);
           }

           .row {
               display: grid;
               grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
               gap: 2rem;
               padding: 1rem;
           }

           .card {
               background: rgba(30, 30, 30, 0.95);
               border-radius: 12px;
               overflow: hidden;
               transition: all 0.3s ease;
               border: 1px solid rgba(237, 28, 36, 0.2);
               height: 450px;
               cursor: pointer;
           }

           .card:hover {
               transform: translateY(-5px);
               box-shadow: 0 10px 20px rgba(237, 28, 36, 0.2);
               border-color: #ED1C24;
           }

           .card__image-container {
               height: 200px;
               overflow: hidden;
               border-bottom: 2px solid rgba(237, 28, 36, 0.3);
               position: relative;
           }

           .card img {
               width: 100%;
               height: 100%;
               object-fit: cover;
               transition: all 0.3s ease;
           }

           .card:hover img {
               transform: scale(1.05);
           }

           .card__content {
               padding: 1.5rem;
               height: calc(100% - 200px);
               display: flex;
               flex-direction: column;
               justify-content: space-between;
           }

           .card__title {
               color: #ffffff;
               font-size: 1.5rem;
               font-weight: 600;
               margin: 0;
               text-transform: uppercase;
               letter-spacing: 1px;
           }

           .card__info {
               margin: 0.5rem 0;
               color: #cccccc;
               display: flex;
               align-items: center;
               gap: 0.5rem;
           }

           .card__button {
               background: #ED1C24;
               color: #ffffff;
               border: none;
               padding: 0.8rem;
               border-radius: 6px;
               cursor: pointer;
               transition: all 0.3s ease;
               text-transform: uppercase;
               letter-spacing: 1px;
               font-weight: 600;
               margin-top: auto;
           }

           .card__button:hover {
               background: #ff2d36;
               box-shadow: 0 0 15px rgba(237, 28, 36, 0.3);
           }

           .compare-section {
               background: rgba(30, 30, 30, 0.95);
               border-radius: 12px;
               padding: 2rem;
               margin-top: 2rem;
               text-align: center;
               border: 1px solid rgba(237, 28, 36, 0.2);
           }

           .compare-section h1 {
               color: #ffffff;
               font-size: 2rem;
               margin-bottom: 1.5rem;
               text-transform: uppercase;
               letter-spacing: 2px;
               text-shadow: 0 0 10px rgba(237, 28, 36, 0.5);
           }

           #btnListar {
               background: linear-gradient(45deg, #ED1C24, #ff4d4d);
               color: #ffffff;
               border: none;
               padding: 1rem 2.5rem;
               border-radius: 30px;
               font-size: 1.1rem;
               font-weight: 600;
               text-transform: uppercase;
               letter-spacing: 2px;
               cursor: pointer;
               transition: all 0.3s ease;
               box-shadow: 0 4px 15px rgba(237, 28, 36, 0.3);
               position: relative;
               overflow: hidden;
           }

           #btnListar:hover {
               transform: translateY(-2px);
               box-shadow: 0 6px 20px rgba(237, 28, 36, 0.4);
               background: linear-gradient(45deg, #ff2d36, #ff6666);
           }

           #btnListar::before {
               content: '';
               position: absolute;
               top: -50%;
               left: -50%;
               width: 200%;
               height: 200%;
               background: rgba(255, 255, 255, 0.1);
               transform: rotate(45deg);
               transition: all 0.3s ease;
               pointer-events: none;
           }

           #btnListar:hover::before {
               transform: rotate(45deg) translateY(-50%);
           }

           .modal {
               display: none;
               position: fixed;
               top: 0;
               left: 0;
               width: 100%;
               height: 100%;
               background: rgba(0, 0, 0, 0.8);
               backdrop-filter: blur(5px);
               z-index: 1000;
               overflow-y: auto;
               padding: 2rem 1rem;
           }

           .modal.active {
               display: flex;
               align-items: start;
               justify-content: center;
           }

           .modal__content {
               background: rgba(30, 30, 30, 0.95);
               border-radius: 12px;
               max-width: 900px;
               width: 95%;
               margin: 2rem auto;
               padding: 2rem;
               position: relative;
               border: 2px solid #ED1C24;
               box-shadow: 0 0 30px rgba(237, 28, 36, 0.3);
           }

           .modal__close {
               position: absolute;
               top: 1rem;
               right: 1rem;
               background: none;
               border: none;
               color: #ffffff;
               font-size: 1.5rem;
               cursor: pointer;
               padding: 0.5rem;
               line-height: 1;
           }

           .modal__header {
               display: flex;
               align-items: center;
               gap: 2rem;
               margin-bottom: 2rem;
               padding-bottom: 1rem;
               border-bottom: 1px solid rgba(237, 28, 36, 0.3);
           }

           .modal__car-image {
               width: 300px;
               height: 200px;
               object-fit: cover;
               border-radius: 8px;
           }

           .modal__title {
               color: #ffffff;
               font-size: 2rem;
               margin: 0;
           }

           .modal__specs {
               display: grid;
               grid-template-columns: repeat(3, 1fr);
               gap: 2rem;
               margin-top: 2rem;
           }

           .spec-section {
               background: rgba(20, 20, 20, 0.5);
               border-radius: 8px;
               padding: 1.5rem;
               border: 1px solid rgba(237, 28, 36, 0.2);
           }

           .spec-section h3 {
               color: #ED1C24;
               margin: 0 0 1rem;
               font-size: 1.2rem;
               text-transform: uppercase;
               letter-spacing: 1px;
           }

           .spec-item {
               margin: 0.8rem 0;
               color: #ffffff;
           }

           .spec-item span {
               color: #cccccc;
               display: block;
               font-size: 0.9rem;
           }

           @media (max-width: 991px) {
               .modal__specs {
                   grid-template-columns: repeat(2, 1fr);
               }
           }

           @media (max-width: 768px) {
               .modal__header {
                   flex-direction: column;
                   text-align: center;
               }

               .modal__car-image {
                   width: 100%;
                   height: 200px;
               }

               .modal__specs {
                   grid-template-columns: 1fr;
               }
           }
       </style>
       <div class="container">
           <h2>Galería Vehículos F1</h2>
           <input type="text" class="search-bar" id="search" placeholder="Buscar por motor, modelo o velocidad...">
           <div class="row" id="gallery"></div>
           <div class="compare-section">
               <h1>Compara nuestros Vehículos</h1>
               <button id="btnListar" type="button">Comparar Vehículos</button>
           </div>
       </div>
       <div class="modal" id="vehicleModal">
           <div class="modal__content">
               <button class="modal__close">×</button>
               <div id="modalContent"></div>
           </div>
       </div>
       `;
       this.addEventListener(); // Añade el evento al botón de comparar

       // Configuración de la barra de búsqueda para filtrar vehículos
       const searchBar = this.shadowRoot.getElementById("search");
       searchBar.addEventListener("input", (e) => {
           this.renderGallery(e.target.value); // Filtra y actualiza la galería al escribir
       });
       // Evento para cerrar el modal
       const modal = this.shadowRoot.getElementById("vehicleModal");
       const closeButton = this.shadowRoot.querySelector(".modal__close");
       closeButton.addEventListener("click", () => {
           modal.classList.remove("active"); // Cierra el modal
       });
       // Cierra el modal si el usuario hace clic fuera de él
       modal.addEventListener("click", (e) => {
           if (e.target === modal) {
               modal.classList.remove("active");
           }
       });
   }
    // Método para añadir el evento al botón de comparar vehículos
   addEventListener() {
       this.shadowRoot.querySelector('#btnListar').addEventListener("click", () => {
           this.comparacion();
       });
   }
   // Método que cambia el contenido para mostrar el componente de comparación
   comparacion(){
      this.shadowRoot.innerHTML= `<comparar-vehiculos> </comparar-vehiculos>`;
   }
   // Muestra el modal con las especificaciones detalladas del vehículo
   showModal(vehiculo) {
       const modal = this.shadowRoot.getElementById("vehicleModal");
       const modalContent = this.shadowRoot.getElementById("modalContent");
        // Construye el contenido del modal con los detalles del vehículo
       modalContent.innerHTML = /*html*/`
           <div class="modal__header">
               <img src="${vehiculo.imagenVehiculo}" alt="${vehiculo.motor}" class="modal__car-image">
               <div>
                   <h2 class="modal__title">${vehiculo.motor}</h2>
                   <p class="card__info">📋 Modelo: ${vehiculo.modelo}</p>
                   <p class="card__info">🏎️ ${vehiculo.equipoPiloto}</p>
                   <p class="card__info">👤 Piloto: ${vehiculo.nombrePiloto}</p>
                   <p class="card__info">⚡ ${vehiculo.velocidadMaximaKmh}</p>
                   <p class="card__info">🚀 0-100: ${vehiculo.aceleracion0a100}</p>
               </div>
           </div>
           <div class="modal__specs">
               <div class="spec-section">
                   <h3>Conducción Normal</h3>
                   <div class="spec-item">
                       Velocidad: ${vehiculo.rendimiento.conduccionNormal.velocidadNormal}
                   </div>
                   <div class="spec-item">
                       Consumo de Combustible
                       <span>Seco: ${vehiculo.rendimiento.conduccionNormal.consumoCombustible.seco}</span>
                       <span>Lluvia: ${vehiculo.rendimiento.conduccionNormal.consumoCombustible.lluvioso}</span>
                       <span>Extremo: ${vehiculo.rendimiento.conduccionNormal.consumoCombustible.extremo}</span>
                   </div>
                   <div class="spec-item">
                       Desgaste de Neumáticos
                       <span>Seco: ${vehiculo.rendimiento.conduccionNormal.desgasteNeumaticos.seco}</span>
                       <span>Lluvia: ${vehiculo.rendimiento.conduccionNormal.desgasteNeumaticos.lluvioso}</span>
                       <span>Extremo: ${vehiculo.rendimiento.conduccionNormal.desgasteNeumaticos.extremo}</span>
                   </div>
               </div>
               <div class="spec-section">
                   <h3>Conducción Agresiva</h3>
                   <div class="spec-item">
                       Velocidad: ${vehiculo.rendimiento.conduccionAgresiva.velocidadAgresiva}
                   </div>
                   <div class="spec-item">
                       Consumo de Combustible
                       <span>Seco: ${vehiculo.rendimiento.conduccionAgresiva.consumoCombustible.seco}</span>
                       <span>Lluvia: ${vehiculo.rendimiento.conduccionAgresiva.consumoCombustible.lluvioso}</span>
                       <span>Extremo: ${vehiculo.rendimiento.conduccionAgresiva.consumoCombustible.extremo}</span>
                   </div>
                   <div class="spec-item">
                       Desgaste de Neumáticos
                       <span>Seco: ${vehiculo.rendimiento.conduccionAgresiva.desgasteNeumaticos.seco}</span>
                       <span>Lluvia: ${vehiculo.rendimiento.conduccionAgresiva.desgasteNeumaticos.lluvioso}</span>
                       <span>Extremo: ${vehiculo.rendimiento.conduccionAgresiva.desgasteNeumaticos.extremo}</span>
                   </div>
               </div>
               <div class="spec-section"><div class="spec-section">
                   <h3>Ahorro de Combustible</h3>
                   <div class="spec-item">
                       Velocidad Promedio: ${vehiculo.rendimiento.ahorroCombustible.velocidadPromedio}
                   </div>
                   <div class="spec-item">
                       Consumo de Combustible
                       <span>Seco: ${vehiculo.rendimiento.ahorroCombustible.consumoCombustible.seco}</span>
                       <span>Lluvia: ${vehiculo.rendimiento.ahorroCombustible.consumoCombustible.lluvioso}</span>
                       <span>Extremo: ${vehiculo.rendimiento.ahorroCombustible.consumoCombustible.extremo}</span>
                   </div>
                   <div class="spec-item">
                       Desgaste de Neumáticos
                       <span>Seco: ${vehiculo.rendimiento.ahorroCombustible.desgasteNeumaticos.seco}</span>
                       <span>Lluvia: ${vehiculo.rendimiento.ahorroCombustible.desgasteNeumaticos.lluvioso}</span>
                       <span>Extremo: ${vehiculo.rendimiento.ahorroCombustible.desgasteNeumaticos.extremo}</span>
                   </div>
               </div>
           </div>
       `;

       modal.classList.add("active"); // Muestra el modal
   }
   // Método para renderizar la galería de vehículos filtrados por la barra de búsqueda
   renderGallery(filter = "") {
       const filteredItems = this.vehiculos.filter(item =>
           item.motor.toLowerCase().includes(filter.toLowerCase()) ||
           item.modelo.toLowerCase().includes(filter.toLowerCase()) ||
           item.velocidadMaximaKmh.toLowerCase().includes(filter.toLowerCase())
       );

       const galleryContainer = this.shadowRoot.getElementById("gallery");
       galleryContainer.innerHTML = ""; // Limpia la galería antes de agregar los vehículos filtrados
        // Crea y agrega una tarjeta para cada vehículo filtrado
       filteredItems.forEach(item => {
           const divItems = document.createElement('div');
           divItems.classList.add('col');

           divItems.innerHTML = /*html*/ `
               <div class="card">
                   <div class="card__image-container">
                       <img src="${item.imagenVehiculo}" alt="${item.motor}">
                   </div>
                   <div class="card__content">
                       <div>
                           <h1 class="card__title">${item.motor}</h1>
                           <p class="card__info">📋 Modelo: ${item.modelo}</p>
                           <p class="card__info">🏎️ ${item.equipoPiloto}</p>
                           <p class="card__info">⚡ ${item.velocidadMaximaKmh}</p>
                           <p class="card__info">🚀 0-100: ${item.aceleracion0a100}</p>
                       </div>
                       <button class="card__button">Ver Especificaciones</button>
                   </div>
               </div>
           `;

           const card = divItems.querySelector('.card');
           card.addEventListener('click', () => this.showModal(item)); // Muestra el modal al hacer clic

           galleryContainer.appendChild(divItems); // Añade la tarjeta a la galería
       });
   }
}
// Registra el nuevo elemento customizado 'buscar-vehiculos'
customElements.define("buscar-vehiculos", BuscarVehiculos);