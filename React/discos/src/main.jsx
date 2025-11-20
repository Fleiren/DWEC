import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowseRoutes } from "react-router-dom";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowseRoutes>
			<App />
		</BrowseRoutes>
	</StrictMode>
);
