import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import ProductList from "../pages/ProductList.jsx";
import Register from "../pages/Register.jsx";
import ShoppingLists from "../pages/ShoppingLists.jsx";
import Error from "../pages/Error.jsx";
import CreateProduct from "../pages/CreateProduct.jsx";
import EditProduct from "../pages/EditProduct.jsx";
import AdminPage from "../pages/AdminPage.jsx";

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/productList" element={<ProductList />} />
			<Route path="/editProduct/:id" element={<EditProduct />} />
			<Route path="/createProduct" element={<CreateProduct />} />
			<Route path="/register" element={<Register />} />
			<Route path="/shoppingLists" element={<ShoppingLists />} />
			<Route path="/admin" element={<AdminPage />} />
			<Route path="*" element={<Error />} />
		</Routes>
	);
};

export default Router;
