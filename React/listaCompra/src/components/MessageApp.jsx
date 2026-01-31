import React from "react";
import useMessageContext from "../hooks/useMessageContext.js";
import "./messageApp.css";

const MensajeApp = () => {
	const { message, messageType, isActive } = useMessageContext();

	return (
		isActive && (
			<div className={`messageApp_container ${messageType.toLowerCase()}`}>
				<p>{message}</p>
			</div>
		)
	);
};

export default MensajeApp;
