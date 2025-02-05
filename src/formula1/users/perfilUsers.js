import { getJuegos } from "../../Apis/juegoApis.js";

export class perfilUsers extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  // Método para obtener el nombre del usuario a partir del idUser
  getUserName(userId, juegos) {
    // Buscar el juego para obtener el nombre del usuario desde el idUser
    const juego = juegos.find(game => game.idUser === userId);
    if (juego) {
      // Puedes devolver el id o lo que necesites, por ejemplo, si en el JSON hay un campo "nombrePiloto" dentro de "resultados"
      return juego.resultados[0].driverName; // o el campo correspondiente para el nombre
    }
    return "Usuario no encontrado"; // En caso de que no se encuentre el usuario
  }

  async fetchJuegoData() {
    try {
      // Obtener los juegos
      const juegos = await getJuegos();

      // Simulamos que el usuario logueado tiene el id "31cd"
      const userId = "31cd"; // Aquí debería ir tu lógica de autenticación

      // Buscar el nombre del usuario logueado
      const userName = this.getUserName(userId, juegos);

      // Filtrar el juego correspondiente al usuario logueado
      const juegoData = juegos.find(game => game.idUser === userId);
      if (!juegoData) {
        this.shadowRoot.innerHTML = '<p>No se encontraron datos para este usuario.</p>';
        return;
      }

      const { configuracion, resultados } = juegoData;

      // Generar las tablas con los datos del juego
      this.shadowRoot.innerHTML = `
        <h2>Bienvenido, ${window.user}</h2> <!-- Mostrar el nombre del usuario -->
        <h2>Configuración del Juego</h2>
        <table border="1">
          <tr>
            <th>Circuito</th>
            <th>Vehículo</th>
            <th>Vueltas</th>
            <th>Longitud</th>
            <th>Aceleración</th>
            <th>Velocidad Máxima</th>
            <th>Velocidad</th>
            <th>Consumo</th>
            <th>Desgaste</th>
            <th>Motor</th>
          </tr>
          <tr>
            <td>${configuracion[0].circuitoSelect}</td>
            <td>${configuracion[0].vehiculoSelect}</td>
            <td>${configuracion[0].vueltas}</td>
            <td>${configuracion[0].longitud}</td>
            <td>${configuracion[0].aceleracion}</td>
            <td>${configuracion[0].velocidadMaximaKmh}</td>
            <td>${configuracion[0].velocidad}</td>
            <td>${configuracion[0].consumo}</td>
            <td>${configuracion[0].desgaste}</td>
            <td>${configuracion[0].motor}</td>
          </tr>
        </table>

        <h2>Resultados del Piloto</h2>
        <table border="1">
          <tr>
            <th>Posición</th>
            <th>Nombre Piloto</th>
            <th>Tiempo Total</th>
          </tr>
          <tr>
            <td>${resultados[0].number}</td>
            <td>${resultados[0].driverName}</td>
            <td>${resultados[0].totalTime}</td>
          </tr>
        </table>

        <h3>Tiempos por Vuelta</h3>
        <table border="1">
          <tr>
            <th>Vuelta</th>
            <th>Tiempo</th>
          </tr>
          ${resultados[0].lapTimes.map(lap => `
            <tr>
              <td>${lap.lap}</td>
              <td>${lap.time}</td>
            </tr>
          `).join('')}
        </table>
      `;
    } catch (error) {
      this.shadowRoot.innerHTML = '<p>Error al obtener los datos del juego.</p>';
    }
  }

  render() {
    // Inicializar el Web Component
    this.shadowRoot.innerHTML = `<p>Cargando los resultados...</p>`;
    this.fetchJuegoData();
  }
}

customElements.define("perfil-users", perfilUsers);
