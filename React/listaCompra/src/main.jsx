import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AuthProvider from "./context/AuthProvider.jsx";
import MessageProvider from "./context/MessageProvider.jsx";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<MessageProvider>
				<AuthProvider>
					<App />
				</AuthProvider>
			</MessageProvider>
		</BrowserRouter>
	</StrictMode>,
);
