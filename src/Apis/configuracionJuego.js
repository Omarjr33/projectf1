const URL_API = "http://localhost:3000";
const myHeaders = new Headers({
    "Content-Type": "application/json"
});

const getConfiguracion = async() => {
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
export {
    getCircuito as getCircuitos,
    postCircuito as postCircuitos,
    patchCircuito as patchCircuitos,
    deleteCircuito as deleteCircuitos
};