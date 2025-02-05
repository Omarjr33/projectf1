import { getJuegos } from "../../Apis/juegoApis.js";

export class perfilUsers extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.styles = `
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      .f1-profile-container {
        background: linear-gradient(135deg, #000000, #1a1a1a, #4a0000);
        min-height: 100vh;
        color: #ffffff;
        font-family: Arial, sans-serif;
        padding: 2rem;
        perspective: 1000px;
      }
      .f1-loading {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background: linear-gradient(135deg, #000000, #1a1a1a, #4a0000);
      }
      .f1-loader {
        font-size: 3rem;
        color:rgb(255, 255, 255);
        text-transform: uppercase;
        letter-spacing: 0.2rem;
        animation: 
          pulse 1.5s infinite,
          drift 3s ease-in-out infinite alternate;
      }
      .f1-profile-title {
        text-align: center;
        color:rgb(255, 255, 255);
        font-size: 2.5rem;
        margin-bottom: 2rem;
        text-transform: uppercase;
        letter-spacing: 0.2rem;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
      }
      .f1-race-card {
        background-color: rgba(30, 30, 30, 0.8);
        border-radius: 10px;
        margin-bottom: 1rem;
        overflow: hidden;
        border: 1px solid rgba(255, 0, 0, 0.3);
        transition: all 0.3s ease;
        transform-style: preserve-3d;
      }
      .f1-race-card:hover {
        transform: scale(1.02) rotateX(5deg);
        box-shadow: 0 10px 20px rgba(255,0,0,0.2);
      }
      .f1-race-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background-color: rgba(255, 0, 0, 0.1);
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }
      .f1-race-header::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(120deg, transparent, rgba(255,255,255,0.1), transparent);
        transition: all 0.5s ease;
      }
      .f1-race-header:hover::before {
        left: 100%;
      }
      .f1-race-header h2 {
        color:rgb(255, 255, 255);
        margin: 0;
        transition: transform 0.3s ease;
      }
      .f1-race-header:hover h2 {
        transform: scale(1.05);
      }
      .f1-dropdown-icon {
        color: #ff0000;
        transition: transform 0.3s ease;
      }
      .f1-race-card.active .f1-dropdown-icon {
        transform: rotate(180deg);
      }
      .f1-race-details {
        padding: 1rem;
        display: none;
        animation: slideDown 0.4s ease;
      }
      .f1-race-card.active .f1-race-details {
        display: block;
        animation: expandDetail 0.5s ease;
      }
      .f1-section {
        margin-bottom: 1.5rem;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.5s ease;
      }
      .f1-race-card.active .f1-section {
        opacity: 1;
        transform: translateY(0);
      }
      .f1-section h3 {
        color: #ff0000;
        border-bottom: 2px solid rgba(255, 0, 0, 0.3);
        padding-bottom: 0.5rem;
        margin-bottom: 1rem;
      }
      .f1-config-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
      }
      .f1-config-item {
        background-color: rgba(50, 50, 50, 0.5);
        padding: 1rem;
        border-radius: 5px;
        transition: transform 0.3s ease;
      }
      .f1-config-item:hover {
        transform: scale(1.03);
      }
      .f1-result-card {
        background-color: rgba(50, 50, 50, 0.5);
        padding: 1rem;
        border-radius: 5px;
        transition: transform 0.3s ease;
      }
      .f1-result-card:hover {
        transform: scale(1.02);
      }
      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes expandDetail {
        from {
          max-height: 0;
          opacity: 0;
        }
        to {
          max-height: 1000px;
          opacity: 1;
        }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      @keyframes drift {
        from { transform: translateX(-10px) rotate(-2deg); }
        to { transform: translateX(10px) rotate(2deg); }
      }
      @media (max-width: 600px) {
        .f1-config-grid {
          grid-template-columns: 1fr;
        }
      }
    `;
  }

  async fetchJuegoData() {
    try {
      const juegos = await getJuegos();

      if (!window.idUser) {
        this.shadowRoot.innerHTML = `
          <style>${this.styles}</style>
          <div class="f1-loading">
            <div class="f1-loader">Sin Usuario</div>
          </div>
        `;
        return;
      }

      // Filtrar los juegos por el idUser
      const juegosUsuario = juegos.filter(game => game.idUser === window.idUser);

      if (juegosUsuario.length === 0) {
        this.shadowRoot.innerHTML = `
          <style>${this.styles}</style>
          <div class="f1-loading">
            <div class="f1-loader">Sin Datos</div>
          </div>
        `;
        return;
      }

      // Generar HTML para cada juego del usuario
      const juegosHTML = juegosUsuario.map((juego, index) => `
        <div class="f1-race-card" data-index="${index}">
          <div class="f1-race-header">
            <h2>Carrera ${index + 1}</h2>
            <div class="f1-dropdown-icon">▼</div>
          </div>
          <div class="f1-race-details">
            <div class="f1-section">
              <h3>Configuración de Carrera</h3>
              <div class="f1-config-grid">
                ${juego.configuracion.map(config => `
                  <div class="f1-config-item">
                    <p><span>Circuito:</span> ${config.circuitoSelect}</p>
                    <p><span>Vehículo:</span> ${config.vehiculoSelect}</p>
                    <p><span>Vueltas:</span> ${config.vueltas}</p>
                    <p><span>Piloto:</span> ${config.nombrePiloto}</p>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="f1-section">
              <h3>Resultados de Carrera</h3>
              ${juego.resultados.map(resultado => `
                <div class="f1-result-card">
                  <div class="f1-result-item">
                    <span>Posición:</span>
                    <span>${resultado.number}</span>
                  </div>
                  <div class="f1-result-item">
                    <span>Piloto:</span>
                    <span>${resultado.driverName}</span>
                  </div>
                  <div class="f1-result-item">
                    <span>Tiempo Total:</span>
                    <span>${resultado.totalTime}</span>
                  </div>
                </div>
              `).join('')}
            </div>

            <div class="f1-section">
              <h3>Tiempos por Vuelta</h3>
              ${juego.resultados.map(resultado => `
                <div class="f1-lap-times">
                  <h4>${resultado.driverName}</h4>
                  <div class="f1-lap-grid">
                    ${resultado.lapTimes.map(lap => `
                      <div class="f1-lap-item">
                        <span>Vuelta ${lap.lap}:</span>
                        <span>${lap.time}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `).join('');

      this.shadowRoot.innerHTML = `
        <style>${this.styles}</style>
        <div class="f1-profile-container">
          <h1 class="f1-profile-title">${window.user || 'Perfil de Carreras'}</h1>
          <div class="f1-races-wrapper">
            ${juegosHTML}
          </div>
        </div>
      `;

      // Add event listeners after rendering
      this.addEventListeners();
    } catch (error) {
      console.error("Error al obtener los datos del juego:", error);
      this.shadowRoot.innerHTML = `
        <style>${this.styles}</style>
        <div class="f1-loading">
          <div class="f1-loader">Error de Carga</div>
        </div>
      `;
    }
  }

  addEventListeners() {
    const raceCards = this.shadowRoot.querySelectorAll('.f1-race-header');
    raceCards.forEach(card => {
      card.addEventListener('click', () => {
        const raceCard = card.closest('.f1-race-card');
        raceCard.classList.toggle('active');
      });
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <div class="f1-loading">
        <div class="f1-loader">CARRERA F1</div>
      </div>
    `;
    this.fetchJuegoData();
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("perfil-users", perfilUsers);