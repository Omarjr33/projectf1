//API para almacenar datos de los usuarios
const URL_API = "http://localhost:3000";
const myHeaders = new Headers({
    "Content-Type": "application/json"
});

/**
 * Obtener la información
 * @returns 
 */
const getUsuario = async() => {
    try {
        const respuesta = await fetch(`${URL_API}/users`);
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
 * @param {Object} datos //Datos del usuario
 * @returns 
 */
const postUsuario = async (datos) => {
    try {
        return await fetch(`${URL_API}/users`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
    } catch (error) {
        console.error('Error en la solicitud POST:', error.message);
    }
}

/**
 * Actualizar la información de los usuarios
 * @param {object} datos //Datos usuario
 * @param  id //Id usuario
 * @returns 
 */
const patchUsuario = async (datos,id) =>{
    try {
        return await fetch(`${URL_API}/users/${id}`, {
            method: "PATCH",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
    } catch (error) {
        console.error('Error en la solicitud PATCH:', error.message);
    }
}

/**
 * Eliminar información de los usuarios
 * @param id //Id del usuario
 * @returns 
 */
const deleteUsuario = async (id) =>{
    try {
        return await fetch(`${URL_API}/users/${id}`, {
            method: "DELETE",
            headers: myHeaders,
        });
    } catch (error) {
        console.error('Error en la solicitud DELETE:', error.message);
    }
}

//Exportación de las funciones
export {
    getUsuario as getUsuarios,
    postUsuario as postUsuarios,
    patchUsuario as patchUsuarios,
    deleteUsuario as deleteUsuarios
};