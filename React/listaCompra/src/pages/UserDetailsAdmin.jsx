import { useParams } from "react-router-dom";
const UserDetailsAdmin = () => {
	const { id } = useParams();
	return (
		<>
			<h1>{id}</h1>
		</>
	);
};

export default UserDetailsAdmin;
