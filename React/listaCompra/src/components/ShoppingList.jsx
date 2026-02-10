const ShoppingList = ({ list }) => {
	return (
		<div name="list" value={list.id}>
			<h3>{list.name}</h3>
		</div>
	);
};

export default ShoppingList;
