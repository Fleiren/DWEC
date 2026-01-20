import React from "react";
import { Routes, Route } from "react-router-dom";

const Routes = () => {
	return (
		<Routes>
			<Route Path="/" element={<Home />} />
			<Route Path="/login" element={<Login />} />
			<Route Path="/productList" element={<ProductList />} />
			<Route Path="*" element={<Error />} />
		</Routes>
	);
};
