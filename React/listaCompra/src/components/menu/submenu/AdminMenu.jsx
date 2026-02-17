const AdminMenu = () => {
	return (
		<div>
			<button
				onClick={() => {
					getAllData();
				}}
			>
				Actualizar datos
			</button>
			<button>Productos</button>
		</div>
	);
};
export default AdminMenu;
