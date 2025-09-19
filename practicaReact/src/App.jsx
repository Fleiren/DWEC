import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Interprete from "./components/practica2.03/Interprete";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<div>
				<Contenedor>
					<Pelicula
						titulo="Cry-Baby"
						cartelera="https://l1nq.com/uoAsZ"
						direccion="John Waters"
					>
						<div>
							Baltimore, años 50. Dos grupos enfrentados: los "Drapes" y los
							"Squares". Wade Walker (de los "Drapes"), apodado Cry-Baby o "El
							lágrima", es un chico malo y rebelde que trata de aparentar más de
							lo que realmente es. Su vida cambia cuando se enamora de Allison
							Vernon-Williams (perteneciente a los "Squares"), una compañera de
							instituto guapa, rica, respetable y buena. Características
							totalmente contrarias a las suyas. Wade, acabará dándose cuenta de
							que su pasión por hacer lo incorrecto y actuar de malas formas le
							puede llevar a presenciar situaciones trágicas e irreparables.
						</div>
						<Interprete></Interprete>
						<Interprete></Interprete>
						<Interprete></Interprete>
					</Pelicula>
				</Contenedor>
			</div>
		</>
	);
}

export default App;
