const URL_API = "http://localhost:3000";
const myHeaders = new Headers({
    "Content-Type": "application/json"
});

const getEquipo = async() => {
    try {
        const respuesta = await fetch(`${URL_API}/equipos`);
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
const postEquipo = async (datos) => {
    try {
        return await fetch(`${URL_API}/equipos`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
    } catch (error) {
        console.error('Error en la solicitud POST:', error.message);
    }
}
const patchEquipo = async (datos,id) =>{

    try {
        return await fetch(`${URL_API}/equipos/${id}`, {
            method: "PATCH",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
    } catch (error) {
        console.error('Error en la solicitud PATCH:', error.message);
    }

}
const deleteEquipo = async (id) =>{

    try {
        return await fetch(`${URL_API}/equipos/${id}`, {
            method: "DELETE",
            headers: myHeaders,
        });
    } catch (error) {
        console.error('Error en la solicitud POST:', error.message);
    }

}
export {
    getEquipo as getEquipos,
    postEquipo as postEquipos,
    patchEquipo as patchEquipos,
    deleteEquipo as deleteEquipos
};