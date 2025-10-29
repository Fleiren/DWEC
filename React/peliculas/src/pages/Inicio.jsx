import React from "react";
import "./inicio.css";

const Inicio = () => {
	return (
		<>
			<div className="inicio_contenedor">
				<h1 className="inicio_titulo">Inicio</h1>
				<p className="inicio_frase">
					"Todo parece mágico cuando la noche cae."
				</p>
				<div className="inicio_imagen">
					<img src="/src/assets/img/TimBurton.jpg" alt="Tim Burton" />
				</div>
				<p className="inicio_explorar" id="explorar">
					Explora nuestra colección de películas con ese toque sombrío y
					soñador.
				</p>
				<p id="nota">
					NOTA PARA EL PROFESOR: El css es la gran mayoría de la IA, he dejado
					los comentarios para aprender, he ido fatal de tiempo.
				</p>
			</div>
		</>
	);
};

export default Inicio;
