"use strict";

const mensajesError = {
    name: "El nombre debe tener 5 o más caracteres.",
    climate: "Debes seleccionar un clima",
    diameter: "Debe tener al menos 1000km de diámetro.",
    imagen: "Debe ser una URL válida.",
    elementos: "Debes seleccionar al menos un elemento.",
    lunas: "Debes seleccionar una cantidad de lunas."
}

let errores = []; 

const patrones = {
    name: /.{5,}/,
    diameter: /^\d{4,}$/,
    imagen: /^https?:\/\// 
}

const obtenerDatosFormulario = (formulario) => {
    return {
        name: formulario[0].value,
        climate : formulario[1].value,
        diameter: formulario[2].value,
        imagen: formulario[3].value,
        elementos : obtenerElementos(formulario.elementos),
        lunas : obtenerLunas(formulario.lunas),
        habitable: formulario.habitable.checked
    }
}

const obtenerElementos = (elementos) => {
    let elementosSeleccionadosPorElUsuario = [];
    for (let e of elementos){
        if(e.checked){
            elementosSeleccionadosPorElUsuario = [...elementosSeleccionadosPorElUsuario, e.value];
        }    
    }
    
    return elementosSeleccionadosPorElUsuario;
}

const obtenerLunas = (lunas) => {
    let elementoSeleccionado = "";
    for (let elemento of lunas){
        if(elemento.checked) elementoSeleccionado = elemento.value;
    }
    return elementoSeleccionado;
}

const validarFormulario = (datos) => {
    errores = []; 
    let valido = true;
    if(!validarNombre(datos.name)){
     errores = [...errores, mensajesError.name];
     valido = false;
    } 
    if(datos.climate === "") {
        errores = [...errores, mensajesError.climate]; 
        valido = false;
    }
    if(!validarDiametro(datos.diameter)) {
        errores = [...errores, mensajesError.diameter]; 
        valido=false;
    }
    if(!validarImagen(datos.imagen)) {
        errores = [...errores, mensajesError.imagen]; 
        valido = false;
    }
    if(datos.elementos.length === 0) {
        errores = [...errores, mensajesError.elementos]; 
        valido=false;
    }  
    if(datos.lunas === ""){ 
        errores = [...errores, mensajesError.lunas]; 
        valido = false;
    }
    return valido;
}


const validarNombre = (name) => {
    if(name === "" || !patrones.name.test(name)) return false;
    return true;
}

const validarDiametro = (diameter) => {
    if(diameter === "" || !patrones.diameter.test(diameter)) return false;
    return true;
}

const validarImagen = (imagen) => {
    if(imagen !== ""  && !patrones.imagen.test(imagen)) return false;
    return true;
}

const crearPlaneta = (datosPlaneta) => {
    if(datosPlaneta.lunas === "mas"){
        datosPlaneta.lunas = "Tiene más de 4 lunas";
    }
    return{
        id: crypto.randomUUID(),
        name: datosPlaneta.name,
        climate: datosPlaneta.climate,
        diameter: datosPlaneta.diameter,
        imagen: datosPlaneta.imagen,
        elementos: datosPlaneta.elementos,
        lunas: datosPlaneta.lunas,
        habitable: datosPlaneta.habitable
    }
}

const insertarContenedorInformacion = (formulario) => {
    const contenedorInfo = document.createElement("div");
    contenedorInfo.classList = "ocultar";
    formulario.insertAdjacentElement("afterend", contenedorInfo);
    return contenedorInfo;
}


const mostrarMensajeExito = (contenedor) => {
    contenedor.classList = "";
    contenedor.style = "background-color: lightgreen; border: 2px solid green;";
    contenedor.innerHTML = "Planeta registrado con éxito";
}

const mostrarErrores = (contenedor) => {
    contenedor.style = "";
    contenedor.classList = "error";
    let mensaje = "";
    for(let error of errores){
        mensaje += error + "<br>";
    }
    contenedor.innerHTML = mensaje;
}

const resetearContenedorInformacion = (contenedor) => {
    contenedor.classList = "ocultar";
    contenedor.innerHTML="";
    contenedor.style = "";
}

const limpiarFormulario = (formulario) => {
    formulario.reset();
}

const generarPlantilla = (planetas) => {
    let plantilla = "";
    for(let planeta of planetas){     
        plantilla += plantillaPlaneta(planeta);
    }
    return plantilla;
}

const plantillaPlaneta = (planeta) => {
   
    let plantilla = "<div>";
    plantilla += `<h4>${planeta.name}</h4>`;

    if(planeta.imagen && planeta.imagen !== "") plantilla += `<img src=${planeta.imagen} alt="Imagen del planeta"/>`;

    plantilla += `<p>Clima: ${planeta.climate}</p><p>Diámetro: ${planeta.diameter}</p>`;

    if(planeta.elementos) plantilla += `<p>Elementos del planeta: ${planeta.elementos}</p>`;
    if(planeta.lunas) plantilla += `<p>Lunas: ${planeta.lunas}</p>`;
    plantilla += `<button value="eliminar" id=${planeta.name}>Eliminar</button>`
    if(planeta.residents) plantilla += `<button value="residentes" id=${planeta.name}>Residentes</button>`
    plantilla += "</div>";
    return plantilla;  
}

const plantillaResidentes = (residentes) => {
     let plantilla = "<div>";
    for(let residente of residentes){     
        plantilla += plantillaResidente(residente);
    }
    plantilla += "</div>"
    return plantilla;
}

const plantillaResidente = (residente) => {
    return `<p>${residente.name}</p>`
}


export {obtenerDatosFormulario, validarFormulario, crearPlaneta, insertarContenedorInformacion, mostrarMensajeExito, mostrarErrores, resetearContenedorInformacion, limpiarFormulario, generarPlantilla, plantillaResidentes}