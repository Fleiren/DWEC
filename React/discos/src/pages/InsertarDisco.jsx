import React, { useState } from "react";
import {
	validarCampo,
	crearDiscoJSON,
	validarNombre,
	validarAnyo,
	validarCaratula,
	validarGenero,
	validarGrupo,
	validarLocalizacion,
} from "./../libraries/ultilFormularios.js";
import MensajeError from "./../components/MensajeError.jsx";
import "./insertarDisco.css";
const InsertarDisco = (props) => {
	//Obtenemos las variables necesarias para modificar y obtener los datos de los discos.
	const { discos, setDiscos } = props;
	//Declaramos los mensajes de error según el campo del formulario.
	const errores = {
		nombre: "El nombre debe tener al menos 5 caracteres.",
		caratula: "La URL de la carátula debe ser válida.",
		grupo: "El nombre del grupo / intérprete debe tener al menos 5 caracteres.",
		anyo: "El año debe ser de 4 cifras y debe tener sentido.",
		genero: "Debes seleccionar un género.",
		localizacion:
			"La localización debe tener el formato ES-123AA. (ES, guión medio, tres números y dos letras mayúsculas).",
	};
	//Declaramos el estado inicial del objeto disco.
	const formularioInicial = {
		nombre: "",
		caratula: "",
		grupo: "",
		anyo: "",
		genero: "",
		localizacion: "",
		prestado: false,
	};

	//Declaramos el estado inicial de los errores que están activos.
	const erroresActivosInicial = {
		nombre: "",
		caratula: "",
		grupo: "",
		anyo: "",
		genero: "",
		localizacion: "",
	};
	//Declaramos los estados.
	const [formulario, setFormulario] = useState(formularioInicial);
	const [erroresActivos, setErroresActivos] = useState(erroresActivosInicial);
	const [exito, setExito] = useState(false);

	//En este método actualizamos el estado formulario y revisamos si es correcto (¿Hace muchas cosas? a veces modularizar se hace difícil).
	/**
	 * Actualiza el objeto formulario.
	 * @param {HTMLElement} evento
	 */
	const revisarDatos = (evento) => {
		if (evento.target.name === "prestado") {
			setFormulario({ ...formulario, prestado: evento.target.checked });
		} else {
			validarCampo(evento.target)
				? evento.target.classList.remove("error")
				: evento.target.classList.add("error");
			setFormulario({
				...formulario,
				[evento.target.name]: evento.target.value,
			});
		}
	};

	//Validamos el formulario para saber si se puede enviar o no.
	/**
	 * Valida el objeto formulario para ver si es correcto y actualiza el estado de errores activos si los hay.
	 */
	const validarFormulario = () => {
		let erroresActivos = { ...erroresActivosInicial };
		let valido = true;
		setErroresActivos(erroresActivosInicial);
		if (!validarNombre(formulario.nombre)) {
			erroresActivos.nombre = errores.nombre;
			valido = false;
		}
		if (!validarCaratula(formulario.caratula)) {
			erroresActivos.caratula = errores.caratula;
			valido = false;
		}
		if (!validarGrupo(formulario.grupo)) {
			erroresActivos.grupo = errores.grupo;
			valido = false;
		}
		if (!validarAnyo(formulario.anyo)) {
			erroresActivos.anyo = errores.anyo;
			valido = false;
		}
		if (!validarGenero(formulario.genero)) {
			erroresActivos.genero = errores.genero;
			valido = false;
		}
		if (!validarLocalizacion(formulario.localizacion)) {
			erroresActivos.localizacion = errores.localizacion;
			valido = false;
		}
		setErroresActivos(erroresActivos);
		//Si sigue siendo válido podemos enviar el formulario.
		if (valido) {
			enviarFormulario();
		}
	};

	/**
	 * Actualiza los discos y resetea el formulario.
	 */
	const enviarFormulario = () => {
		const disco = crearDiscoJSON(formulario);
		mensajeExito();
		setDiscos([...discos, disco]);
		setFormulario(formularioInicial);
	};

	/**
	 * Maneja el estado Exito para mostrar el mensaje.
	 */
	const mensajeExito = () => {
		setExito(true);
		//Lo del timeout ha sido idea de la IA, no me aclaraba para quitar el mensaje, no me gustaban las soluciones que se me ocurrían, sinceramente no me acordaba de que existía timeout.
		setTimeout(() => {
			setExito(false);
		}, 3000);
	};

	return (
		<>
			<div className="contenedor_insertarDisco">
				{exito && <div className="exito">Disco registrado con éxito.</div>}
				<fieldset id="formularioDisco">
					<legend>Agregar disco</legend>

					<form name="agregarDisco" id="agregarDisco">
						<label htmlFor="inputNombre">Nombre:</label>
						<input
							type="text"
							id="inputNombre"
							name="nombre"
							value={formulario.nombre}
							placeholder="Introduce el nombre del disco"
							pattern=".{5,}"
							onInput={revisarDatos}
							required
						/>
						{erroresActivos.nombre !== "" && (
							<MensajeError mensajeError={erroresActivos.nombre}></MensajeError>
						)}

						<label htmlFor="inputCaratula">Carátula:</label>
						<input
							type="url"
							id="inputCaratula"
							name="caratula"
							value={formulario.caratula}
							placeholder="Coloca la URL de la carátula del disco"
							onInput={revisarDatos}
						/>
						{erroresActivos.caratula !== "" && (
							<MensajeError
								mensajeError={erroresActivos.caratula}
							></MensajeError>
						)}
						<label htmlFor="inputGrupo">Nombre del grupo/intérprete:</label>
						<input
							type="text"
							id="inputGrupo"
							name="grupo"
							value={formulario.grupo}
							placeholder="Introduce el grupo / intérprete"
							pattern=".{5,}"
							onInput={revisarDatos}
							required
						/>
						{erroresActivos.grupo !== "" && (
							<MensajeError mensajeError={erroresActivos.grupo}></MensajeError>
						)}
						<label htmlFor="inputAnyo">Año de publicación:</label>
						<input
							type="text"
							id="inputAnyo"
							name="anyo"
							value={formulario.anyo}
							pattern="\d{4}"
							placeholder="Introduce el año de publicación"
							onInput={revisarDatos}
						/>
						{erroresActivos.anyo !== "" && (
							<MensajeError mensajeError={erroresActivos.anyo}></MensajeError>
						)}
						<label htmlFor="selectGenero">Género:</label>
						<select
							id="selectGenero"
							name="genero"
							value={formulario.genero}
							onChange={revisarDatos}
							required
						>
							<option value="">Selecciona un género</option>
							<option value="pop">Pop</option>
							<option value="sadpop">Sad pop</option>
							<option value="alternativePop">Alternative pop</option>
							<option value="rock">Rock</option>
							<option value="r&b">R&B</option>
							<option value="metal">Metal</option>
							<option value="techno">Techno</option>
							<option value="house">House</option>
							<option value="dubstep">Dubstep</option>
							<option value="bachata">Bachata</option>
							<option value="flamenco">Flamenco</option>
							<option value="musicaClasica">Música clásica</option>
							<option value="opera">Ópera</option>
							<option value="jazz">Jazz</option>
							<option value="blues">Blues</option>
							<option value="gospel">Gospel</option>
							<option value="afrobeat">Afrobeat</option>
							<option value="bollywood">Bollywood</option>
							<option value="worship">Worship</option>
						</select>
						{erroresActivos.genero !== "" && (
							<MensajeError mensajeError={erroresActivos.genero}></MensajeError>
						)}
						<label htmlFor="inputLocalizacion">Localización:</label>
						<input
							type="text"
							id="inputLocalizacion"
							name="localizacion"
							value={formulario.localizacion}
							pattern="^[A-Z]{2}-\d{3}[A-Z]{2}$"
							onInput={revisarDatos}
						/>
						{erroresActivos.localizacion !== "" && (
							<MensajeError
								mensajeError={erroresActivos.localizacion}
							></MensajeError>
						)}
						<label htmlFor="inputPrestado">Prestado: </label>
						<input
							type="checkbox"
							id="inputPrestado"
							name="prestado"
							onChange={revisarDatos}
							value={formulario.prestado}
						/>
						<input
							type="button"
							id="guardar"
							value="Guardar"
							onClick={validarFormulario}
						/>
					</form>
				</fieldset>
			</div>
		</>
	);
};

export default InsertarDisco;
