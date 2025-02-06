//API para almacenar datos de los circuitos
const URL_API = "http://localhost:3000";
const myHeaders = new Headers({
    "Content-Type": "application/json"
});

/**
 * Obtener la información
 * @returns 
 */
const getCircuito = async() => {
    try {
        const respuesta = await fetch(`${URL_API}/circuitos`);
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
 * @param {Object} datos //Datos del circuito
 * @returns 
 */
const postCircuito = async (datos) => {
    try {
        return await fetch(`${URL_API}/circuitos`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
    } catch (error) {
        console.error('Error en la solicitud POST:', error.message);
    }
}

/**
 * Actualizar la información de los circuitos
 * @param {object} datos //Datos circuito
 * @param  id //Id circuito
 * @returns 
 */
const patchCircuito = async (datos,id) =>{

    try {
        return await fetch(`${URL_API}/circuitos/${id}`, {
            method: "PATCH",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
    } catch (error) {
        console.error('Error en la solicitud PATCH:', error.message);
    }

}

/**
 * Eliminar información de los circuitos
 * @param id //Id del circuito
 * @returns 
 */
const deleteCircuito = async (id) =>{

    try {
        return await fetch(`${URL_API}/circuitos/${id}`, {
            method: "DELETE",
            headers: myHeaders,
        });
    } catch (error) {
        console.error('Error en la solicitud DELETE:', error.message);
    }

}

//Exportación de las funciones
export {
    getCircuito as getCircuitos,
    postCircuito as postCircuitos,
    patchCircuito as patchCircuitos,
    deleteCircuito as deleteCircuitos
};