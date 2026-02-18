import fotoGenerica from "../assets/img/perfil.jpeg";
import inspect from "../assets/img/inspect.jpeg";
import "./miniUser.css";
const MiniUser = ({ user }) => {
	console.log(user);
	return (
		<div className="user_target">
			{user.avatar ? <img src={user.avatar} /> : <img src={fotoGenerica} />}
			<h3>{user.name}</h3>
			<p>Rol: {user.user_roles.role}</p>
			<img
				src={inspect}
				data-id={user.user_id}
				name="inspect"
				alt="Inspeccionar"
			/>
		</div>
	);
};

export default MiniUser;
