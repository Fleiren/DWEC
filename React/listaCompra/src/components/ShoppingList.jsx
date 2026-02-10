import "./shoppingList.css";
const ShoppingList = ({ list }) => {
	return (
		<div>
			<h3 data-id={list.id} className="name_list">
				{list.name}
			</h3>
		</div>
	);
};

export default ShoppingList;
