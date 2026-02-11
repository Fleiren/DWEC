import "./shoppingListProduct.css";
//Quería reutilizar el componente Product pero no puedo ya que el diseño y el contenido no es del todo igual por lo que me ha tocado crear otro componente para mostrar los productos de la lista pero con menos iformación.
const ShoppingListProduct = ({ product }) => {
	const { name, image } = product.products;
	const { amount } = product;
	return (
		<div className="shopping_list_item_card">
			<div className="shopping_list_item_img_container">
				<img src={image} alt={name} />
			</div>
			<p>{name}</p>
			<p>Cantidad: {amount}</p>
		</div>
	);
};

export default ShoppingListProduct;
