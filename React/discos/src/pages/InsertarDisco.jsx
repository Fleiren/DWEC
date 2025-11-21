import React, { useEffect, useState } from "react";
import { validarCampo } from "./../libraries/ultilFormularios.js";
import "./insertarDisco.css";
const InsertarDisco = () => {
	const errores = {
		nombre: "El nombre debe tener al menos 5 caracteres.",
		caratula: "La URL de la carátula debe ser válida.",
		grupo: "El nombre del grupo / intérprete debe tener al menos 5 caracteres.",
		anyo: "El año debe ser de 4 cifras.",
		genero: "Debes seleccionar un género.",
		localizacion:
			"La localización debe tener el formato ES-123AA. (ES, guión medio, tres números y dos letras mayúsculas).",
	};
	const formularioInicial = {
		nombre: "",
		caratula: "",
		grupo: "",
		anyo: "",
		genero: "",
		localizacion: "",
	};
	const erroresActivosInicial = {
		nombre: "",
		caratula: "",
		grupo: "",
		anyo: "",
		genero: "",
		localizacion: "",
	};

	const [formulario, setFormulario] = useState(formularioInicial);
	const [erroresActivos, setErroresActivos] = useState(erroresActivosInicial);
	const formRef = useRef();
	const revisarDatos = (evento) => {
		validarCampo(evento.target)
			? evento.target.classList.remove("error")
			: evento.target.classList.add("error");
	};
	const revisarFormulario = () => {
		let valido = true;
		limpiarErrores(formulario);
		if (!validarNombre(formulario.nombre)) {
			setErroresActivos({ ...erroresActivos, [nombre]: errores.nombre });
			valido = false;
		}
		if (!validarCaratula(formulario.caratula)) {
			setErroresActivos({ ...erroresActivos, [caratula]: errores.caratula });
			valido = false;
		}
		if (!validarGrupo(formulario.grupo)) {
			setErroresActivos({ ...erroresActivos, [grupo]: errores.grupo });
			valido = false;
		}
		if (!validarAnyo(formulario.anyo)) {
			setErroresActivos({ ...erroresActivos, [anyo]: errores.anyo });
			valido = false;
		}
		if (!validarGenero(formulario.genero)) {
			setErroresActivos({ ...erroresActivos, [genero]: errores.genero });
			valido = false;
		}
		if (!validarLocalizacion(formulario.localizacion)) {
			setErroresActivos({
				...erroresActivos,
				[localizacion]: errores.localizacion,
			});
			valido = false;
		}
	};

	useEffect(() => {}, [formulario]);

	return (
		<>
			<div className="contenedor_insertarDisco">
				<fieldset id="formularioDisco">
					<legend>Agregar disco</legend>

					<form name="agregarDisco" id="agregarDisco" ref={formRef}>
						<label htmlFor="inputNombre">Nombre:</label>
						<input
							type="text"
							id="inputNombre"
							name="nombre"
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
							pattern="^[A-Z]{2}-\d{3}[A-Z]{2}$"
							onInput={revisarDatos}
						/>
						{erroresActivos.localizacion !== "" && (
							<MensajeError
								mensajeError={erroresActivos.localizacion}
							></MensajeError>
						)}
						<label htmlFor="inputPrestado">Prestado: </label>
						<input type="checkbox" id="inputPrestado" name="prestado" />
						<input
							type="button"
							id="guardar"
							value="Guardar"
							onClick={revisarFormulario}
						/>
					</form>
				</fieldset>
			</div>
		</>
	);
};

export default InsertarDisco;
