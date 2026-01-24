import { useState } from "react";
import useMessage from "./hooks/useMessage.js";
import Header from "./components/structure/Header.jsx";
import Footer from "./components/structure/Footer.jsx";
import Content from "./components/structure/Content.jsx";
import Container from "./components/structure/Container.jsx";
import Router from "./routes/Router.jsx";
import MessageApp from "./components/MessageApp.jsx";
import Menu from "./components/menu/Menu.jsx";
import "./App.css";

function App() {
	const { isActive } = useMessage();
	//Las páginas están sin diseñar aún pero la estructura básica ya está lista.
	return (
		<>
			<Container>
				<Header />
				<Menu />
				<Content>
					{isActive && <MessageApp />}
					<Router />
				</Content>
				<Footer />
			</Container>
		</>
	);
}

export default App;
