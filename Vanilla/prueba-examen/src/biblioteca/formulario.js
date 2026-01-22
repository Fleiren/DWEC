"use strict";

const patrones = {
    nombre: /.{5,}/,
    imagen: /^https?:\/\//
}

const mensajesError = {
    nombre: "El nombre debe tener 5 caracteres como mínimo.",
    prioridad: "Debes indicar la prioridad de la misión.",
    equipo: "Debes selecionar el equipamiento.",
    planeta: "Debes seleccionar un planeta destino.",
    imagen: "La imagen debe ser una url válida.",

}

let errores = [];

const generarContenedorInformacion = (elementoReferencia) => {
    let div = `<div style="display:none;" id="informacion"></div>`;
    elementoReferencia.insertAdjacentHTML("beforebegin", div);
    let divInfo = elementoReferencia.previousElementSibling;
    return divInfo;
}

const recogerDatosFormulario = (formulario) => {
    return {
        nombre: formulario[0].value,
        prioridad: obtenerPrioridad(formulario.prioridad),
        equipo: obtenerEquipo(formulario.equipo),
        planeta: formulario[7].value,
        imagen: formulario[8].value
    }
}

const crearMision = (datosMision) => {
    return {
        id: crypto.randomUUID(),
        nombre: datosMision.nombre,
        prioridad: datosMision.prioridad,
        equipo: datosMision.equipo,
        planeta:datosMision.planeta,
        imagen: datosMision.imagen
    }
}

const obtenerPrioridad = (prioridades) => {
    let prioridadSeleccionada = "";
    for(let prioridad of prioridades){
        if(prioridad.checked) prioridadSeleccionada = prioridad.value;
    }
    return prioridadSeleccionada;
}

const obtenerEquipo = (equipos) => {
    let equipoSeleccionado = [];
    for(let equipo of equipos){
        if(equipo.checked) equipoSeleccionado = [...equipoSeleccionado, equipo.value];
    }
    return equipoSeleccionado;
}

const validarFormulario = (datos) => {
    let valido = true;
    //reiniciamos la variable errores por si acaso.
    errores = [];
    if(!validarNombre(datos.nombre)){
        valido = false;
        errores = [...errores, mensajesError.nombre];
    }
    if(datos.prioridad === ""){
        valido = false;
        errores = [...errores, mensajesError.prioridad];
    }
    if(datos.equipo.length === 0){
        valido = false;
        errores = [...errores, mensajesError.equipo];
    }
    if(datos.planeta === ""){
        valido = false;
        errores = [...errores, mensajesError.planeta];
    }
    if(!validarImagen(datos.imagen)){
        valido = false;
        errores = [...errores, mensajesError.imagen];
    }

    return valido;
}

const validarNombre = (datoNombre) => {
    if(datoNombre === "" || !patrones.nombre.test(datoNombre)) return false;
    return true;
}

const validarImagen = (datoImagen) => {
    if(datoImagen !== "" && !patrones.imagen.test(datoImagen)) return false;
    return true;
}

const mostrarError = (contenedor) => {
    contenedor.style = "";
    contenedor.classList = "error";
    contenedor.innerHTML = generarPlantillaError();
}

const generarPlantillaError = () => {
    let plantilla = "";
    for(let error of errores){
        plantilla += `<p>${error}</p>`;
    }
    return plantilla;
}

const mostrarExito = (contenedor) => {
    contenedor.style = "";
    contenedor.classList = "exito";
    contenedor.innerHTML = "<p>Se ha registrado la misión con éxito.</p>";
}

const resetearInformacion = (contenedor) => {
    contenedor.style = "display:none;";
    contenedor.classList = "";
    contenedor.innerHTML = "";
}

const mostrarMisiones = (contenedor, misiones) => {
    let contenido = crearPlantillaMisiones(misiones);
    if(contenido === ""){
        contenedor.innerHTML = "No hay misiones para mostrar.";
    }else{
        contenedor.innerHTML = contenido;
    }   
}

const crearPlantillaMisiones = (misiones) => {
    let plantilla = "";
    for (let mision of misiones){
        plantilla += crearPlantillaMision(mision);
    }
    return plantilla;
}

const crearPlantillaMision = (mision) => {
    let plantilla = "<div>";
    if(mision.imagen) plantilla += `<img src="${plantilla.imagen}" alt="Imagen de la misión" />`;
    plantilla += `
    <h3>${mision.nombre}</h3>
    <p>Prioridad: ${mision.prioridad}</p>
    <p>Equipamiento: ${mision.equipo}</p>
    <p>Planeta: ${mision.planeta}</p>
    <button id="${mision.id}" value="eliminar">Eliminar</button>
    </div>
    `;
    return plantilla;
}   

const filtrarMisionesPorNombre = (busqueda, misiones) => {  
    
    busqueda = busqueda.toLowerCase();
    let resultado = misiones.filter((mision)=>{
        let nombre = mision.nombre.toLowerCase(); 
        return nombre.includes(busqueda);
    });
    return resultado;
    

}

const eliminarMisionPorId = (id, misiones) => {
    return misiones.filter((mision) => {return mision.id !== id});
}
export {generarContenedorInformacion, recogerDatosFormulario, crearMision, validarFormulario, mostrarError, mostrarExito, resetearInformacion, mostrarMisiones, filtrarMisionesPorNombre, eliminarMisionPorId}