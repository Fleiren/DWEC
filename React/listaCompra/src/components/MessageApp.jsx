import React from "react";
import useMessage from "../hooks/useMessage.js";
import "./messageApp.css";

const MensajeApp = () => {
	const { message, messageType, isActive } = useMessage();

	return (
		isActive && (
			<div className={`messageApp_container ${messageType.toLowerCase()}`}>
				<p>{message}</p>
			</div>
		)
	);
};

export default MensajeApp;
