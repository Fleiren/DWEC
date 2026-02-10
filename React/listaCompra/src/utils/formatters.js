const formatCurrency = (amount) => {
	//La idea de devolver un "-" si no hay número me parece muy buena, así no salta un error y queda bonito ya que puede ser que a veces recorramos una lista de objetos y no todos tengan por ejemplo el peso... No creo que esté bien que falle.
	if (!amount) return "-";
	const formated = Intl.NumberFormat("es-ES", {
		style: "currency",
		currency: "EUR",
		useGrouping: true,
	}).format(amount);

	return formated;
};

const formatNumberEs = (number) => {
	if (!number) return "-";
	const formated = Intl.NumberFormat("es-ES", { useGrouping: true }).format(
		number,
	);
	return formated;
};

/**
 * Sirve para pasar a formato universal un número decimal y no tener problemas con la base de datos.
 * @param {String} value
 * @returns {Float}
 */
const cleanNumber = (value) => {
	if (value === null || value === undefined || value === "") return NaN;
	const stringValue = String(value).replace(",", ".");
	return parseFloat(stringValue);
};

export { formatCurrency, formatNumberEs, cleanNumber };
