import "./shoppingList.css";
import { formatDate } from "../utils/formatters.js";
const ShoppingList = ({ list }) => {
	return (
		<div>
			<h3 data-id={list.id} className="name_list">
				{list.name}
				<p>{formatDate(list.created_at)}</p>
			</h3>
		</div>
	);
};

export default ShoppingList;
