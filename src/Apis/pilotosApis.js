const URL_API = "http://localhost:3000";
const myHeaders = new Headers({
    "Content-Type": "application/json"
});

const getPilotos = async() => {
    try {
        const respuesta = await fetch(`${URL_API}/pilotos`);
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
const postPilotos = async (datos) => {
    try {
        return await fetch(`${URL_API}/pilotos`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
    } catch (error) {
        console.error('Error en la solicitud POST:', error.message);
    }
}
const patchPilotos = async (datos,id) =>{

    try {
        return await fetch(`${URL_API}/pilotos/${id}`, {
            method: "PATCH",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
    } catch (error) {
        console.error('Error en la solicitud PATCH:', error.message);
    }

}
const deletePilotos = async (id) =>{

    try {
        return await fetch(`${URL_API}/pilotos/${id}`, {
            method: "DELETE",
            headers: myHeaders,
        });
    } catch (error) {
        console.error('Error en la solicitud POST:', error.message);
    }

}
export {
    getPiloto as getPilotos,
    postPiloto as postPilotos,
    patchPiloto as patchPilotos,
    deletePiloto as deletePilotos
};