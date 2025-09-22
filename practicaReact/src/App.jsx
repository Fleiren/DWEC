import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Interprete from "./components/practica2.03/Interprete.jsx";
import Pelicula from "./components/practica2.03/Pelicula.jsx";
import Contenedor from "./components/practica2.03/Contenedor.jsx";

function App() {
	const [count, setCount] = useState(0);
	//He visto que se puede hacer un array con todos los datos estilo JSON y luego mapearlos.

	//He colocado la sinopsis dentro de props porque si lo añadía como children no podía colocarlo como quería.
	return (
		<>
			<h1>Películas</h1>
			<Contenedor>
				<Pelicula
					titulo="Cry-Baby"
					cartelera="https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p12228_p_v10_an.jpg"
					direccion="John Waters"
					sinopsis='Baltimore, años 50. Dos grupos enfrentados: los "Drapes" y los
						"Squares". Wade Walker (de los "Drapes"), apodado Cry-Baby o "El
						lágrima", es un chico malo y rebelde que trata de aparentar más de
						lo que realmente es. Su vida cambia cuando se enamora de Allison
						Vernon-Williams (perteneciente a los "Squares"), una compañera de
						instituto guapa, rica, respetable y buena. Características
						totalmente contrarias a las suyas. Wade, acabará dándose cuenta de
						que su pasión por hacer lo incorrecto y actuar de malas formas le
						puede llevar a presenciar situaciones trágicas e irreparables.'
				>
					<Interprete
						nombre="Johnny Depp"
						foto="https://www.lavanguardia.com/peliculas-series/images/profile/1963/6/w1280/z4wuEcnTW4hlICMYPGn5W8bK2zh.jpg"
					>
						<p>
							Actor, productor y músico estadounidense (1963). Alcanzó la fama
							en los 80 con 21 Jump Street y se consolidó con Cry-Baby (1990) y
							Eduardo Manostijeras. Conocido por su versatilidad y su
							colaboración con Tim Burton, ha interpretado papeles icónicos como
							Jack Sparrow en Piratas del Caribe. Ha recibido múltiples
							nominaciones al Óscar y Globos de Oro.
						</p>
					</Interprete>
					<Interprete
						nombre="Amy Locane"
						foto="https://m.media-amazon.com/images/M/MV5BMjg4NTQyMzEtNzM3Ny00N2U4LTgwODUtMDg4ZDNmMzEwM2E1XkEyXkFqcGc@._V1_.jpg"
					>
						<p>
							Actriz estadounidense (1971). Debutó en cine a finales de los 80 y
							logró notoriedad como protagonista femenina en Cry-Baby (1990)
							junto a Johnny Depp. También apareció en series como Melrose Place
							y en películas como Carried Away (1996). Su carrera se interrumpió
							por problemas legales en la década de 2010.
						</p>
					</Interprete>
					<Interprete
						nombre="Susan Tyrrell"
						foto="https://m.media-amazon.com/images/M/MV5BMTM5NTI2NzQ4NV5BMl5BanBnXkFtZTcwOTA2MTUzOA@@._V1_.jpg"
					>
						<p>
							Actriz estadounidense (1945–2012). Reconocida por sus papeles
							intensos y poco convencionales, fue nominada al Óscar como mejor
							actriz de reparto por Fat City (1972). Participó en filmes de
							culto como Cry-Baby (1990) y Flesh+Blood. Su estilo excéntrico y
							magnético la convirtió en una actriz de culto en Hollywood.
						</p>
					</Interprete>
				</Pelicula>
			</Contenedor>
		</>
	);
}

export default App;
