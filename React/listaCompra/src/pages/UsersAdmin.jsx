import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext.js";
import useMessageContext from "../hooks/useMessageContext.js";
import MiniUser from "../components/MiniUser.jsx";
import Loading from "../components/Loading.jsx";

const UsersAdmin = () => {
	const { getAllUsers, loadingProfiles } = useAuthContext();
	const { showMessage } = useMessageContext();
	const [users, setUsers] = useState([]);
	const nv = useNavigate();
	//Este método lo he pasado por props... no se si es la mejor opción, aún me cuesta ver buenas prácticas en estos casos.
	const getAllData = async () => {
		const users = await getAllUsers();
		if (users) {
			setUsers(users);
			console.log(users);
		}
	};

	const goToUserDetails = (evento) => {
		if (evento.target.name === "inspect") {
			nv(`/userDetailsAdmin/${evento.target.dataset.id}`);
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

			{loadingProfiles ? (
				<Loading />
			) : users.length > 0 ? (
				<div
					onClick={(evento) => {
						goToUserDetails(evento);
					}}
				>
					{users.map((user) => (
						<MiniUser key={user.user_id} user={user} />
					))}
				</div>
			) : (
				<h1>No hay usuarios.</h1>
			)}
		</div>
	);
};

export default UsersAdmin;
