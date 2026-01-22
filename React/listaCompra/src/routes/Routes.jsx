import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home.jsx";
import { Login } from "../pages/Login.jsx";
import { ProductList } from "../pages/ProductList.jsx";
import { Register } from "../pages/Register.jsx";
import { ShoppingList } from "../pages/ShoppingList.jsx";
import { Error } from "../pages/Error.jsx";

const Routes = () => {
	return (
		<Routes>
			<Route Path="/" element={<Home />} />
			<Route Path="/login" element={<Login />} />
			<Route Path="/productList" element={<ProductList />} />
			<Route Path="/register" element={<Register />} />
			<Route Path="/shoppingList" element={<ShoppingList />} />
			<Route Path="*" element={<Error />} />
		</Routes>
	);
};
