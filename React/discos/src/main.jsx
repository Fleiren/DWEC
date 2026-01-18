import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ProveedorDiscos from "./context/ProveedorDiscos.jsx";
import ProveedorMensajes from "./context/ProveedorMensajes.jsx";

//Me gustaría ser más específica con los contextos pero siento que estos dos deberían estar en toda la aplicación, no se si me equivoco.
createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<ProveedorMensajes>
				<ProveedorDiscos>
					<App />
				</ProveedorDiscos>
			</ProveedorMensajes>
		</BrowserRouter>
	</StrictMode>,
);
