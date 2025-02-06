# 🏎️ Simulación de Fórmula 1

## 📝 Descripción
Un sistema de simulación interactiva de Fórmula 1 que permite a los usuarios gestionar equipos, pilotos, circuitos y vehículos, además de participar en emocionantes simulaciones de carreras. El proyecto combina la gestión administrativa con una experiencia de usuario inmersiva en el mundo de la F1.

## ✨ Características Principales

### Gestión Completa
- 🏢 **Administración de Equipos**: Registro y gestión de escuderías de F1
- 👨‍🚀 **Gestión de Pilotos**: Control de pilotos y sus estadísticas
- 🛣️ **Circuitos**: Administración de pistas con características específicas
- 🚗 **Vehículos**: Configuración detallada de autos de F1

### Simulación
- 🎮 Sistema de simulación de carreras
- 🌦️ Condiciones climáticas variables
- ⚙️ Configuración detallada de vehículos
- 📊 Estadísticas en tiempo real

## 🛠️ Tecnologías Utilizadas

### Frontend
- HTML5 y CSS3
- JavaScript (ES6+)
- Web Components (Vanilla JS)
- SweetAlert2 para notificaciones

### Backend
- JSON Server
- RESTful APIs
- Node.js

### Almacenamiento
- Local Storage
- JSON Server para persistencia de datos

## 📋 Requisitos Previos
- Node.js (v14 o superior)
- NPM (v6 o superior)
- Navegador web moderno (Chrome, Firefox, Safari)

## 🚀 Instalación

1. Clonar el repositorio
```bash
git clone https://github.com/Omarjr33/projectf1.git
cd simulacion-formula1
```

2. Instalar dependencias
```bash
npm install
```

3. Iniciar el servidor JSON
```bash
json-server --watch db.json
```

4. Abrir el archivo index.html en tu navegador o usar un servidor local
```bash
# Si tienes instalado http-server
http-server
```

## 🏗️ Estructura del Proyecto
```
simulacion-formula1/
├── src/
│   ├── Apis/               # Integraciones con API
│   │   ├── circuitosApis.js
│   │   ├── equiposApis.js
│   │   ├── pilotosApis.js
│   │   └── vehiculosApis.js
│   ├── components/         # Web Components
│   │   ├── admin/         # Componentes administrativos
│   │   └── users/         # Componentes de usuario
│   └── utils/             # Utilidades
├── db.json                # Base de datos
└── README.md
```

## 📱 Características de Usuario
- Gestión completa de equipos y pilotos
- Configuración detallada de vehículos
- Simulación de carreras con condiciones variables
- Sistema de clasificación y resultados
- Persistencia de configuraciones y resultados

## 👥 Autores
- Mariana Vargas
- Hodeth Valentina Caballero
- Omar Cardona

## 🤝 Contribución
Si deseas contribuir al proyecto:
1. Fork el repositorio
2. Crea una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---
⌨️ con ❤️ por [Mariana Vargas, Hodeth Valentina Caballero, Omar Cardona]