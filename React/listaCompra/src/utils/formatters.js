const formatCurrency = (amount) => {
    //La idea de devolver un "-" si no hay número me parece muy buena, así no salta un error y queda bonito ya que puede ser que a veces recorramos una lista de objetos y no todos tengan por ejemplo el peso... No creo que esté bien que falle.
    if(!amount) return "-";
		const formated = Intl.NumberFormat("es-ES", {
			style: "currency",
			currency: "EUR",
		}).format(amount);

		return formated;
	};

const formatNumberEs = (number)=>{
     if(!number) return "-";
		const formated = Intl.NumberFormat("es-ES").format(number);
		return formated;
}

    export {formatCurrency, formatNumberEs};