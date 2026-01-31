import { useContext } from "react";
import { messageContext } from "../context/MessageProvider.jsx";

const useMessageContext = () => {
	const context = useContext(messageContext);
	if (!context) {
		throw new Error(
			"Para poder utilizar el hook de mensajes el componente debe estar dentro de MessageProvider",
		);
	}
	return context;
};

export default useMessageContext;
