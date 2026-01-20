import { useState } from "react";
import Header from "./components/structure/Header.jsx";
import Footer from "./components/structure/footer.jsx";
import Content from "./components/structure/Content.jsx";
import Container from "./components/structure/Container.jsx";
import Routes from "./routes/Routes.jsx";
import Menu from "./components/menu/Menu.jsx";
import "./App.css";

function App() {
	return (
		<>
			<Container>
				<Header />
				<Menu />
				<Content>
					<Routes />
				</Content>
				<Footer />
			</Container>
		</>
	);
}

export default App;
