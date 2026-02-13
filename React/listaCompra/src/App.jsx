import ProductProvider from "./context/ProductProvider.jsx";
import ShoppingListProvider from "./context/ShoppingListProvider.jsx";
import Header from "./components/structure/Header.jsx";
import Footer from "./components/structure/Footer.jsx";
import Content from "./components/structure/Content.jsx";
import Container from "./components/structure/Container.jsx";
import Router from "./routes/Router.jsx";
import MessageApp from "./components/MessageApp.jsx";
import Menu from "./components/menu/Menu.jsx";
import "./App.css";

function App() {
	//Esta entrega, la 6.10 ha sido desesperante porque me he puesto tiquismiquis con cosas y no me ha dado tiempo, quería hacer muchas comprobaciones y eso me generaba mucho lag, cambiaba el diseño todo el rato porque no me convencía la dinámica de la página... espero no haberla liado mucho.
	return (
		<>
			<Container>
				<Header />
				{/** He tenido que meter el menú en el proveedor de productos ya que para mostrar la lista de la compra necesitaba usarlo, cambiará cuando haga un contexto para la lista de la compra. */}
				<ProductProvider>
					<ShoppingListProvider>
						<Menu />
						<Content>
							<MessageApp />
							<Router />
						</Content>
					</ShoppingListProvider>
				</ProductProvider>
				<Footer />
			</Container>
		</>
	);
}

export default App;

//Código de las funciones y los triggers:
/**
 * 
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.roles (id_rol, email, rol)
  VALUES (
    new.id,          
    new.email,        
    'usuario'         
  );
  RETURN new;
END;
$$;
 */
