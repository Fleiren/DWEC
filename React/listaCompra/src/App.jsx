import ProductProvider from "./context/ProductProvider.jsx";
import Header from "./components/structure/Header.jsx";
import Footer from "./components/structure/Footer.jsx";
import Content from "./components/structure/Content.jsx";
import Container from "./components/structure/Container.jsx";
import Router from "./routes/Router.jsx";
import MessageApp from "./components/MessageApp.jsx";
import Menu from "./components/menu/Menu.jsx";
import "./App.css";

function App() {
	//Las páginas están sin diseñar aún pero la estructura básica ya está lista.
	//Lo siento, no me gusta nada el diseño pero estoy en ello, te prometo que quedará una página bonita, además que se me ha ocurrido una idea para usar el peso de los libros.
	//Si, el css lo ha hecho la IA porque me cuesta muchísimo, no me daría tiempo (pero quiero conseguir hacer yo el diseño de esta si me da tiempo).
	return (
		<>
			<Container>
				<Header />
				<Menu />
				{/** El ProductProvider engloba todas las páginas ya que el header y el menú no van a hacer uso de los productos. */}
				<ProductProvider>
					<Content>
						<MessageApp />
						<Router />
					</Content>
				</ProductProvider>
				<Footer />
			</Container>
		</>
	);
}

export default App;
