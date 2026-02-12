import "./prompt.css";
import { useState } from "react";
const Prompt = ({ message, onSubmit, onCancel }) => {
	//Recibimos por parámetro el mensaje a mostrar y las acciones que realizará cada botón,  cuando el usuario le de a acepar se le pasará por parámetro a la función el valor del input.
	const [inputValue, setInputValue] = useState("");
	const changeInputValue = (evento) => {
		setInputValue(evento.target.value);
	};
	//Imagino que sería ideal validar que el método onSubmit tenga un parámetro de entrada definido para evitar errores pero no se me ocurre como validarlo o como avisar al propio programador que para usar este componente ese método necesita recibir un parámetro, se me ocurre un try catch pero no se si es la mejor opción.
	const submit = () => {
		if (inputValue.trim() !== "") {
			onSubmit(inputValue);
		}
	};

	return (
		<div className="contenedor_prompt">
			<div className="prompt">
				<p>{message}</p>
				<input
					type="text"
					name="prompt"
					value={inputValue}
					onChange={changeInputValue}
					autoFocus
				/>
				<div className="botones_prompt">
					<button className="boton_prompt" onClick={submit}>
						Aceptar
					</button>
					<button className="boton_prompt" onClick={onCancel}>
						Cancelar
					</button>
				</div>
			</div>
		</div>
	);
};
export default Prompt;
