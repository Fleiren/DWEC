import "./editProduct.css";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useProductContext from "../hooks/useProductContext.js";
const EditProduct = () => {
	const { id } = useParams();
	const nv = useNavigate();
	const {
		products,
		validateProduct,
		updateDataProduct,
		updateSelectedProduct,
		selectedProduct,
		updateProduct,
	} = useProductContext();

	const product = [...products].find((p) => p.id === id);

	const editProduct = {
		id: product.id,
		name: product.name,
		weight: product.weight,
		price: product.price,
		image: product.image,
		description: product.description,
		category: product.category,
	};

	const validate = async () => {
		const validProduct = validateProduct();
		if (validProduct) {
			try {
				await updateProduct(validProduct);
				nv("/productList");
			} catch (error) {
				showMessage(error.message, "error");
			}
		}
	};

	useEffect(() => {
		//Cuando se monta el componente se actualiza el estado del producto seleccionado para poder tenerlo ya con los datos del producto que vamos a editar.
		updateSelectedProduct(editProduct);
	}, []);
	return (
		<>
			<form>
				<label htmlFor="name">Nombre:</label>
				<input
					type="text"
					id="name"
					name="name"
					value={selectedProduct.name}
					onChange={updateDataProduct}
					required
				/>
				<label htmlFor="weight">Peso:</label>
				<input
					type="number"
					id="weight"
					name="weight"
					value={selectedProduct.weight}
					onChange={updateDataProduct}
					required
				/>
				<label htmlFor="price">Precio:</label>
				<input
					type="number"
					id="price"
					name="price"
					value={selectedProduct.price}
					onChange={updateDataProduct}
					required
				/>
				<label htmlFor="image">Url de la imagen:</label>
				<input
					type="url"
					id="image"
					name="image"
					value={selectedProduct.image}
					onChange={updateDataProduct}
				/>
				<label htmlFor="category">Categoría:</label>
				<select
					id="category"
					name="category"
					value={selectedProduct.category || "books"}
					onChange={updateDataProduct}
				>
					<option value="books">Libros</option>
					<option value="stationery">Papelería</option>
				</select>
				<label htmlFor="description">Descripción:</label>
				<textarea
					id="description"
					name="description"
					value={selectedProduct.description}
					onChange={updateDataProduct}
				/>
				<input type="button" onClick={validate} value="Editar" />
			</form>
		</>
	);
};
export default EditProduct;
