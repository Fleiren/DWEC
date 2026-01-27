import { useContext, useState, useEffect } from "react-router-dom";
import useSupabase from "./../hooks/useSupabase.js";
import useMessage from "../hooks/useMessage.js";

const productContext = useContext();

const ProductProvider = () => {
	const emptyProduct = {
		name: "",
		description: "",
		price: null,
		weight: null,
		image: "",
	};
	const [selectedProduct, setSelectedProduct] = useState();
	const [products, setProducts] = useState();
};
