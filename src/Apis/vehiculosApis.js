//API para almacenar datos de los vehiculos
const URL_API = "http://localhost:3000";
const myHeaders = new Headers({
    "Content-Type": "application/json"
});

/**
 * Obtener la información
 * @returns 
 */
const getVehiculo = async() => {
    try {
        const respuesta = await fetch(`${URL_API}/vehiculos`);
		// Si la respuesta es correcta
		if(respuesta.status === 200){
			const datos = await respuesta.json();
            return datos;
		} else if(respuesta.status === 401){
            console.log('La url no es correcta');
		} else if(respuesta.status === 404){
            console.log('El el contacto  no existe');
		} else {
            console.log('Se presento un error en la peticion consulte al Administrador');
		} 
	} catch(error){
        console.log(error);
	}
    
}


/**
 * Crear la información
 * @param {Object} datos //Datos del vehiculo
 * @returns 
 */
const postVehiculo = async (datos) => {
    try {
        return await fetch(`${URL_API}/vehiculos`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
    } catch (error) {
        console.error('Error en la solicitud POST:', error.message);
    }
}

/**
 * Actualizar la información de los vehiculoss
 * @param {object} datos //Datos vehiculos
 * @param  id //Id vehiculos
 * @returns 
 */
const patchVehiculo = async (datos,id) =>{

    try {
        return await fetch(`${URL_API}/vehiculos/${id}`, {
            method: "PATCH",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
    } catch (error) {
        console.error('Error en la solicitud PATCH:', error.message);
    }

}

/**
 * Eliminar información de los vehiculos
 * @param id //Id del vehiculo
 * @returns 
 */
const deleteVehiculo = async (id) =>{

    try {
        return await fetch(`${URL_API}/vehiculos/${id}`, {
            method: "DELETE",
            headers: myHeaders,
        });
    } catch (error) {
        console.error('Error en la solicitud POST:', error.message);
    }

}

//Exportación de las funciones
export {
    getVehiculo as getVehiculos,
    postVehiculo as postVehiculos,
    patchVehiculo as patchVehiculos,
    deleteVehiculo as deleteVehiculos
};