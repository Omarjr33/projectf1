const URL_API = "http://localhost:3000";
const myHeaders = new Headers({
    "Content-Type": "application/json"
});

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
export {
    getVehiculo as getVehiculos,
    postVehiculo as postVehiculos,
    patchVehiculo as patchVehiculos,
    deleteVehiculo as deleteVehiculos
};