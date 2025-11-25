import { useState, useEffect } from "react";
import "./App.css";
import Contenedor from "./components/estructura/Contenedor.jsx";
import Cabecera from "./components/estructura/Cabecera.jsx";
import Contenido from "./components/estructura/Contenido.jsx";
import Pie from "./components/estructura/Pie.jsx";
import Rutas from "./routes/Rutas.jsx";
import Menu from "./components/menu/Menu.jsx";
function App() {
	let error = false;
	//No puedo meter useEffect y estados en una condición (eso me ha dicho la IA al ver que no me funcinaba el código así que coloco un return extra por si no soporta localStorage, no sabía que se podía hacer).
	if (typeof Storage === "undefined") error = true;
	if (error) {
		return (
			<>
				<div className="mensaje_error">
					El navegador no soporta localStorage
				</div>
			</>
		);
	}
	//Este código lo tenía en el componente InsertarDisco pero al empezar a organizar listarDisco me he dado cuenta de que necesitaba obviamente los todos los discos y actualizados,
	//No me parecía buena práctica hacerlo en cada componente por el tema de "consultar a la base de datos" tantas veces, por lo que he pensado en hacer la lógica aquí.
	//Luego he tenido el problema de que si pasaba los discos en una variable y la pasaba por props solo iba a tener los discos iniciales. Estaba a punto de volver a mover la lógica y hacer solo una carga de los datos
	//al montar los componentes para tener la lista actualizada hasta que se me ha ocurrido pasarle un estado por props y por lo visto si se puede hacer pero no se si es buena práctica.
	const discosIniciales = localStorage.getItem("discos")
		? JSON.parse(localStorage.getItem("discos"))
		: [];

	const [discos, setDiscos] = useState(discosIniciales);
	useEffect(() => {
		localStorage.setItem("discos", JSON.stringify(discos));
		//QUITA EL CONSOLE LOG.
		console.log(discos);
	}, [discos]);

	return (
		<>
			<Contenedor>
				<Cabecera></Cabecera>
				<Menu></Menu>
				<Contenido>
					<Rutas discos={discos} setDiscos={setDiscos}></Rutas>
				</Contenido>
				<Pie className="contenedor_pie"></Pie>
			</Contenedor>
		</>
	);
}

export default App;
