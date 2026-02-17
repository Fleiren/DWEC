import { useState, useEffect } from "react";
import useAuthContext from "../hooks/useAuthContext";
import useMessageContext from "../hooks/useMessageContext";
import MiniUser from "../components/MiniUser.jsx";

const AdminPage = () => {
	const { getAllUsers } = useAuthContext();
	const { showMessage } = useMessageContext();
	const [users, setUsers] = useState([]);
	const getAllData = async () => {
		const users = await getAllUsers();
		if (users) {
			setUsers(users);
			console.log(users);
		}
	};
	useEffect(() => {
		//Sería ideal hacer una subscripción para que con cada cambio en la base de datos o en los usuarios se cambie automáticamente, según la IA es cambiar una cosa en supabase pero puede afectar al rendimiento, no se si para este caso sería buena opción como diseño.
		//He decidido hacer un botón para refrescar la página... siento que de esta manera no afecto al rendimiento y es el propio admin el que decide si quiere actualizar lo que está viendo o no le hace falta.
		getAllData();
	}, []);
	return (
		<div>
			<h1>Panel de control</h1>
			{/**Los botones estos van en un submenú */}
			<button
				onClick={() => {
					getAllData();
				}}
			>
				Actualizar datos
			</button>
			<button>Productos</button>
			{users.length > 0 ? (
				<div>
					{users.map((user) => {
						return <MiniUser key={user.user_id} user={user} />;
					})}
				</div>
			) : (
				<h1>No hay usuarios.</h1>
			)}
		</div>
	);
};

export default AdminPage;
