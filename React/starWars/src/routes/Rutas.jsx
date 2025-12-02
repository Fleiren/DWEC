import { Routes, Route } from "react-router-dom";

const Rutas = () => {
	return (
		<>
			<Routes>
				<Route path="/*" element={<Error />}></Route>
				<Route path="/" element={<Inicio />}></Route>
			</Routes>
		</>
	);
};

export default Rutas;
