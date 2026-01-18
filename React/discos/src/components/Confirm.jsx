import "./confirm.css";

const Confirm = ({ mensaje, accionAceptar, accionCancelar }) => {
	//Recibimos por parámetro el mensaje a mostrar y las acciones que realizará cada botón para que sea un componente reutilizable.
	return (
		<div className="contenedor_confirm">
			<div className="confirmar_eliminacion">
				<p>{mensaje}</p>
				<button className="boton_confirm" onClick={accionAceptar}>
					Aceptar
				</button>
				<button className="boton_confirm" onClick={accionCancelar}>
					Cancelar
				</button>
			</div>
		</div>
	);
};
export default Confirm;
