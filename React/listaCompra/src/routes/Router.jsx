import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import ProductList from "../pages/ProductList.jsx";
import Register from "../pages/Register.jsx";
import ShoppingList from "../pages/ShoppingList.jsx";
import Error from "../pages/Error.jsx";

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/productList" element={<ProductList />} />
			<Route path="/register" element={<Register />} />
			<Route path="/shoppingList" element={<ShoppingList />} />
			<Route path="*" element={<Error />} />
		</Routes>
	);
};

export default Router;
