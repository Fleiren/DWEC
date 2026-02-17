const MiniUser = ({ user }) => {
	console.log(user);
	return (
		<>
			<h1>{user.name}</h1>
		</>
	);
};

export default MiniUser;
