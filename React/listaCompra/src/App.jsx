//Código de las funciones y los triggers:
/**
 * 
He creado un enum para los roles, así evitamos que se registre un rol que no hemos definido.
create type roles as enum ('user', 'admin');

Controlo con la función que también se inserte el usuario en la tabla profile para que ya tenga un perfil.

create or replace function public.handle_new_user()
RETURNS trigger as $$
begin

  insert into public.user_roles (id_role, email, role)
  values (new.id, new.email, 'user');

  insert into public.profile (user_id, name)
  values (new.id, new.raw_user_meta_data->>'display_name');
  return new;
end;
$$ language plpgsql security definer;


create OR REPLACE trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();




  create or replace function public.check_is_admin()
returns boolean as $$
begin
  return exists (
    select 1
    from public.user_roles
    where id_role = auth.uid() 
    and role = 'admin'         
  );
end;
$$ language plpgsql security definer set search_path = public;


 */

import ProductProvider from "./context/ProductProvider.jsx";
import ShoppingListProvider from "./context/ShoppingListProvider.jsx";
import Header from "./components/structure/Header.jsx";
import Footer from "./components/structure/Footer.jsx";
import Content from "./components/structure/Content.jsx";
import Container from "./components/structure/Container.jsx";
import Router from "./routes/Router.jsx";
import MessageApp from "./components/MessageApp.jsx";
import Menu from "./components/menu/Menu.jsx";
import AdminMenu from "./components/menu/submenu/AdminMenu.jsx";
import "./App.css";
import useAuthContext from "./hooks/useAuthContext.js";
function App() {
	const { adminIsActive } = useAuthContext();
	return (
		<>
			<Container>
				<Header />
				{/** He tenido que meter el menú en el proveedor de productos ya que para mostrar la lista de la compra necesitaba usarlo, cambiará cuando haga un contexto para la lista de la compra. */}
				<ProductProvider>
					<ShoppingListProvider>
						{adminIsActive ? <AdminMenu /> : <Menu />}
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
