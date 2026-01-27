import { useState } from "react";

const useMessage = () => {
	const [message, setMessage] = useState("");
	const MESSAGE_TYPES = {
		OK: "OK",
		ERROR: "ERROR",
		INFO: "INFO",
		WARNING: "WARNING",
	};
	// Se utilizaría de manera opcional para el diseño del mensaje.
	const [messageType, setMessageType] = useState(MESSAGE_TYPES.INFO);
	const [isActive, setIsActive] = useState(false);

	//Como es opcional la función de añadir un tipo de mensaje, por defecto sera INFO.
	const showMessage = (newMensaje, type = "info") => {
		setMessage(newMensaje);
		switch (type.toLowerCase()) {
			case "exito":
				setMessageType(MESSAGE_TYPES.OK);
				break;
			case "error":
				setMessageType(MESSAGE_TYPES.ERROR);
				break;
			case "warning":
				setMessageType(MESSAGE_TYPES.WARNING);
				break;
			default:
				setMessageType(MESSAGE_TYPES.INFO);
		}
		setIsActive(true);
		setTimeout(() => {
			hideMessage();
		}, 3000);
	};

	const hideMessage = () => {
		setMessage("");
		setMessageType(MESSAGE_TYPES.INFO);
		setIsActive(false);
	};

	return {
		message,
		messageType,
		isActive,
		showMessage,
		hideMessage,
	};
};

export default useMessage;
