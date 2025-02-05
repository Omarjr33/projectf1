import { getJuegos } from "../../Apis/juegoApis.js";

export class perfilUsers extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  async fetchJuegoData() {
    try {
      const juegos = await getJuegos();

      if (!window.idUser) {
        this.shadowRoot.innerHTML = '<p>No hay usuario logueado.</p>';
        return;
      }

      // Filtrar los juegos por el idUser
      const juegosUsuario = juegos.filter(game => game.idUser === window.idUser);

      if (juegosUsuario.length === 0) {
        this.shadowRoot.innerHTML = '<p>No se encontraron datos para este usuario.</p>';
        return;
      }

      // Generar HTML para cada juego del usuario
      const juegosHTML = juegosUsuario.map((juegoData, index) => {
        const { configuracion, resultados } = juegoData;

        const configuracionesHTML = configuracion.map(config => `
          <tr>
            <td>${config.circuitoSelect}</td>
            <td>${config.vehiculoSelect}</td>
            <td>${config.vueltas}</td>
            <td>${config.longitud}</td>
            <td>${config.aceleracion}</td>
            <td>${config.velocidadMaximaKmh}</td>
            <td>${config.velocidad}</td>
            <td>${config.consumo}</td>
            <td>${config.desgaste}</td>
            <td>${config.nombrePiloto}</td>
            <td>${config.motor}</td>
          </tr>
        `).join('');

        const resultadosHTML = resultados.map(resultado => `
          <tr>
            <td>${resultado.number}</td>
            <td>${resultado.driverName}</td>
            <td>${resultado.totalTime}</td>
          </tr>
        `).join('');

        const tiemposPorVueltaHTML = resultados.map(resultado => `
          <div class="lap-times">
            <h3>Tiempos por Vuelta del Piloto: ${resultado.driverName}</h3>
            <table>
              <tr>
                <th>Vuelta</th>
                <th>Tiempo</th>
              </tr>
              ${resultado.lapTimes.map(lap => `
                <tr>
                  <td>${lap.lap}</td>
                  <td>${lap.time}</td>
                </tr>
              `).join('')}
            </table>
          </div>
        `).join('');

        return `
          <div class="juego-container">
            <h2>Partida ${index + 1}</h2>
            
            <h3>Configuración</h3>
            <table>
              <tr>
                <th>Circuito</th>
                <th>Vehículo</th>
                <th>Vueltas</th>
                <th>Longitud</th>
                <th>Aceleración</th>
                <th>Velocidad Máxima (Km/h)</th>
                <th>Velocidad</th>
                <th>Consumo</th>
                <th>Desgaste</th>
                <th>Piloto</th>
                <th>Motor</th>
              </tr>
              ${configuracionesHTML}
            </table>

            <h3>Resultado Final</h3>
            <table>
              <tr>
                <th>Posición</th>
                <th>Piloto</th>
                <th>Tiempo Total</th>
              </tr>
              ${resultadosHTML}
            </table>

            ${tiemposPorVueltaHTML}
          </div>
        `;
      }).join('');

      this.shadowRoot.innerHTML = `
        <h2>Perfil de Usuario: ${window.user}</h2>
        ${juegosHTML}
      `;
    } catch (error) {
      console.error("Error al obtener los datos del juego:", error);
      this.shadowRoot.innerHTML = '<p>Error al obtener los datos del juego.</p>';
    }
  }

  render() {
    this.shadowRoot.innerHTML = '<p>Cargando los resultados...</p>';
    this.fetchJuegoData();
  }
}

customElements.define("perfil-users", perfilUsers);