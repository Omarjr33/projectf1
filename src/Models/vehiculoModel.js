const VehiculoModel = {
    equipo: '',
    modelo: '',
    motor: '',
    velocidad_maxima_kmh: '',
    aceleracion_0_100: '',
    pilotos: ['', ''],
    rendimiento: {
      conduccion_normal: {
        velocidad_promedio_kmh: '',
        consumo_combustible: { seco: '', lluvioso: '', extremo: '' },
        desgaste_neumaticos: { seco: '', lluvioso: '', extremo: '' }
      },
      conduccion_agresiva: {
        velocidad_promedio_kmh: '',
        consumo_combustible: { seco: '', lluvioso: '', extremo: '' },
        desgaste_neumaticos: { seco: '', lluvioso: '', extremo: '' }
      },
      ahorro_combustible: {
        velocidad_promedio_kmh: '',
        consumo_combustible: { seco: '', lluvioso: '', extremo: '' },
        desgaste_neumaticos: { seco: '', lluvioso: '', extremo: '' }
      }
    },
    imagen: ''
}

export default VehiculoModel;