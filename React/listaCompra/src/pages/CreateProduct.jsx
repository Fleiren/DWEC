import "./createProduct.css";
import { useEffect } from "react";
import useProductContext from "../hooks/useProductContext.js";
import useMessageContext from "../hooks/useMessageContext.js";
const CreateProduct = () => {
	const {
		validateProduct,
		updateDataProduct,
		resetSelectedProduct,
		selectedProduct,
		createProduct,
	} = useProductContext();

	const { showMessage } = useMessageContext();
	const validate = async () => {
		const validProduct = validateProduct();
		if (validProduct) {
			try {
				await createProduct(validProduct);
				showMessage("El producto se ha creado con éxito.", "ok");
				resetSelectedProduct();
			} catch (error) {
				showMessage(error.message, "error");
			}
		}
	};
	useEffect(() => {
		//Cuando se monta el componente se actualiza el estado del producto seleccionado para asegurarnos de que está vacío.
		resetSelectedProduct();
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
				<input type="button" onClick={validate} value="Crear" />
			</form>
		</>
	);
};

export default CreateProduct;
