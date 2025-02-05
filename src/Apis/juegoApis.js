const URL_API = "http://localhost:3000";
const myHeaders = new Headers({
    "Content-Type": "application/json"
});
const getJuego = async() => {
    try {
        const respuesta = await fetch(`${URL_API}/juego`);
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
const postJuego = async (datos) => {
    try {
        return await fetch(`${URL_API}/juego`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
    } catch (error) {
        console.error('Error en la solicitud POST:', error.message);
    }
}
const patchJuego = async (datos,id) =>{
    try {
        return await fetch(`${URL_API}/juego/${id}`, {
            method: "PATCH",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
    } catch (error) {
        console.error('Error en la solicitud PATCH:', error.message);
    }
}
const deleteJuego = async (id) =>{
    try {
        return await fetch(`${URL_API}/juego/${id}`, {
            method: "DELETE",
            headers: myHeaders,
        });
    } catch (error) {
        console.error('Error en la solicitud DELETE:', error.message);
    }
}
export {
    getJuego as getJuegos,
    postJuego as postJuegos,
    patchJuego as patchJuegos,
    deleteJuego as deleteJuegos
};