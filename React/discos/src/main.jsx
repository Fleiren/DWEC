import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ProveedorDiscos from "./context/ProveedorDiscos.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<ProveedorDiscos>
				<App />
			</ProveedorDiscos>
		</BrowserRouter>
	</StrictMode>
);
