import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import ProveedorDiscos from "../../discos/src/context/proveedorDiscos.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			{/**Como toda la aplicación está basada en los discos siento que es mejor práctica que toda la aplicación tenga acceso a ellos en este caso. */}
			<ProveedorDiscos>
				<App />
			</ProveedorDiscos>
		</BrowserRouter>
	</StrictMode>
);
