"use strict";

const crearLienzo = (celdas) => {
	const lienzo = document.getElementsByClassName("lienzo")[0];
	console.log(lienzo);
	const tabla = document.createElement("table");
	for (let i = 0; i < celdas; i++) {
		const tr = document.createElement("tr");
		tabla.appendChild(tr);
		for (let j = 0; j < celdas; j++) {
			const td = document.createElement("td");
			tr.appendChild(td);
		}
	}

	lienzo.appendChild(tabla);
};

export { crearLienzo };
