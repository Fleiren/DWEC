import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./app.css";
import Interprete from "./components/practica2.03/Interprete.jsx";
import Pelicula from "./components/practica2.03/Pelicula.jsx";
import Contenedor from "./components/practica2.03/Contenedor.jsx";

function App() {
	const [count, setCount] = useState(0);
	//He visto que se puede hacer un array con todos los datos estilo JSON y luego mapearlos (No lo he hecho porque en el ejercicio no se pide).
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
						
						
							<Interprete nombre="Johnny Depp" foto="https://www.lavanguardia.com/peliculas-series/images/profile/1963/6/w1280/z4wuEcnTW4hlICMYPGn5W8bK2zh.jpg">
								<div>Actor, productor y músico estadounidense (1963). Alcanzó la fama en los 80 con 21 Jump Street y se consolidó con Cry-Baby (1990) y Eduardo Manostijeras. Conocido por su versatilidad y su colaboración con Tim Burton, ha interpretado papeles icónicos como Jack Sparrow en Piratas del Caribe. Ha recibido múltiples nominaciones al Óscar y Globos de Oro.</div>
							</Interprete>
							<Interprete nombre="Amy Locane" foto="https://m.media-amazon.com/images/M/MV5BMjg4NTQyMzEtNzM3Ny00N2U4LTgwODUtMDg4ZDNmMzEwM2E1XkEyXkFqcGc@._V1_.jpg">
								<div>Actriz estadounidense (1971). Debutó en cine a finales de los 80 y logró notoriedad como protagonista femenina en Cry-Baby (1990) junto a Johnny Depp. También apareció en series como Melrose Place y en películas como Carried Away (1996). Su carrera se interrumpió por problemas legales en la década de 2010.</div>
							</Interprete>
							<Interprete nombre="Susan Tyrrell" foto="https://m.media-amazon.com/images/M/MV5BMTM5NTI2NzQ4NV5BMl5BanBnXkFtZTcwOTA2MTUzOA@@._V1_.jpg">
								<div>Actriz estadounidense (1945–2012). Reconocida por sus papeles intensos y poco convencionales, fue nominada al Óscar como mejor actriz de reparto por Fat City (1972). Participó en filmes de culto como Cry-Baby (1990) y Flesh+Blood. Su estilo excéntrico y magnético la convirtió en una actriz de culto en Hollywood.</div>
							</Interprete>
						
						
					</Pelicula>
				</Contenedor>
				<Contenedor>
					<Pelicula
						titulo="Sombras Tenebrosas"
						cartelera="https://images.justwatch.com/poster/240462902/s718/sombras-tenebrosas.jpg"
						direccion="Tim Burton"
						sinopsis='En el siglo XVIII, Barnabas Collins, heredero de una poderosa familia en Maine, rompe el corazón de la bruja Angelique Bouchard. Ella, incapaz de soportar el rechazo, lanza una maldición que lo convierte en vampiro y lo condena a ser enterrado vivo durante dos siglos. Cuando Barnabas despierta en 1972, descubre un mundo totalmente diferente, donde su antigua mansión está en ruinas y su familia ha perdido prestigio y fortuna. Aun así, decide ayudar a los Collins a recuperar el poder, enfrentándose de nuevo a Angelique, que sigue viva y ahora es la mujer más influyente del pueblo. Entre humor oscuro, estética gótica y un choque cultural con los años 70, la historia mezcla terror, romance y comedia excéntrica.'
					>
						
						
							<Interprete nombre="Johnny Depp" foto="https://www.lavanguardia.com/peliculas-series/images/profile/1963/6/w1280/z4wuEcnTW4hlICMYPGn5W8bK2zh.jpg">
								<div>Actor, productor y músico estadounidense (1963). Alcanzó la fama en los 80 con 21 Jump Street y se consolidó con Cry-Baby (1990) y Eduardo Manostijeras. Conocido por su versatilidad y su colaboración con Tim Burton, ha interpretado papeles icónicos como Jack Sparrow en Piratas del Caribe. Ha recibido múltiples nominaciones al Óscar y Globos de Oro.</div>
							</Interprete>
							<Interprete nombre="Helena Bonham Carter" foto="https://i.pinimg.com/736x/78/82/3c/78823c39563bedfafbd2cddc1d040de6.jpg">
								<div>Reconocida actriz británica, comenzó en cine de época (Una habitación con vistas). Conocida por su versatilidad, ha trabajado con Tim Burton en múltiples películas (El cadáver de la novia, Alicia en el País de las Maravillas). Fue Bellatrix Lestrange en Harry Potter.</div>
							</Interprete>
							<Interprete nombre="Eva Green" foto="https://m.media-amazon.com/images/M/MV5BMTQ0MDA2ODE2Ml5BMl5BanBnXkFtZTcwMjI0Nzc3Nw@@._V1_FMjpg_UX1000_.jpg">
								<div>Actriz francesa (1980). Reconocida por su belleza exótica y su talento actoral, ha trabajado en películas como "El sueño de una noche de verano" y "Casino Royale". Su estilo único y su presencia magnética la han convertido en un ícono del cine contemporáneo.</div>
							</Interprete>
						
						
					</Pelicula>
				</Contenedor>
				<Contenedor>
					<Pelicula
						titulo="Sweeney Todd: El barbero diabólico de la calle Fleet"
						cartelera="https://m.media-amazon.com/images/M/MV5BMTg3NjUxMzM5NV5BMl5BanBnXkFtZTcwMzQ1NjQzMw@@._V1_FMjpg_UX1000_.jpg"
						direccion="Tim Burton"
						sinopsis='Benjamin Barker, un barbero de Londres, lleva una vida feliz con su esposa y su hija pequeña… hasta que el corrupto juez Turpin lo acusa falsamente y lo envía al exilio para quedarse con su mujer. Tras años de sufrimiento, Barker logra escapar y regresa bajo el nombre de Sweeney Todd, un hombre consumido por la sed de venganza. Con la ayuda de la señora Lovett, dueña de una ruinosa pastelería, reabre su barbería. Allí, Todd atrae a sus víctimas con afeitados perfectos, pero en realidad las asesina para saciar su odio. Los cuerpos acaban convertidos en relleno de empanadas que pronto se vuelven populares en Londres. La película combina tragedia, musical y horror gótico, mostrando el descenso de Todd hacia la locura, su obsesión por la venganza y las consecuencias fatales de la corrupción y el deseo desmedido de justicia.'
					>
							<Interprete nombre="Johnny Depp" foto="https://www.lavanguardia.com/peliculas-series/images/profile/1963/6/w1280/z4wuEcnTW4hlICMYPGn5W8bK2zh.jpg">
								<div>Actor, productor y músico estadounidense (1963). Alcanzó la fama en los 80 con 21 Jump Street y se consolidó con Cry-Baby (1990) y Eduardo Manostijeras. Conocido por su versatilidad y su colaboración con Tim Burton, ha interpretado papeles icónicos como Jack Sparrow en Piratas del Caribe. Ha recibido múltiples nominaciones al Óscar y Globos de Oro.</div>
							</Interprete>
							<Interprete nombre="Helena Bonham Carter" foto="https://i.pinimg.com/736x/78/82/3c/78823c39563bedfafbd2cddc1d040de6.jpg">
								<div>Reconocida actriz británica, comenzó en cine de época (Una habitación con vistas). Conocida por su versatilidad, ha trabajado con Tim Burton en múltiples películas (El cadáver de la novia, Alicia en el País de las Maravillas). Fue Bellatrix Lestrange en Harry Potter.</div>
							</Interprete>
							<Interprete nombre="Alan Rickman" foto="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1hNoH1nErMiuUHq3iVHGq7tttCEMEcHp5HQ&s">
								<div>Actor británico (1946–2016). Reconocido por sus papeles intensos y poco convencionales, fue nominado al Óscar como mejor actor de reparto por Fat City (1972). Participó en filmes de culto como Cry-Baby (1990) y Flesh+Blood. Su estilo excéntrico y magnético lo convirtió en un actor de culto en Hollywood.</div>
							</Interprete>	
					</Pelicula>
				</Contenedor>
			
		</>
	);
}

export default App;
