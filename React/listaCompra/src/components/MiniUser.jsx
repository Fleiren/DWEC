const MiniUser = ({ user }) => {
	console.log(user);
	return (
		<div className="user_target">
			<h3>{user.name}</h3>
			<p>Rol: {user.role}</p>
		</div>
	);
};

export default MiniUser;
