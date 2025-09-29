"use strict";

/*Entiendo que al decir que por defecto las funciones trabajan con este Array, es porque debemos usarlo como si fuera una base de datos a la que se accede,
si no lo he entendido bien indícamelo por favor, porque la otra forma de hacerlo sería pasar como parámetro de entrada el array pero al decirme el enunciado que debe ser 
por defecto lo he entendido así, claro que pierde el sentido lo de añadir usuario al array ya que en realidad solo podrías añadir uno ya que no estamos añadiendo con push al array original.*/
const usuarios = [
  {
    nombre: "Luis",
    preferencias: { tema: "oscuro", idioma: "español", edad: 25 },
    contacto: {
      direccion: {
        calle: "Calle falsa, 666",
        localidad: "Elda",
        pais: "España",
      },
      correoelectronico: "correofalso@yahoo.com",
      telefono: "123456789",
    },
  },
  {
    nombre: "Marta",
    preferencias: { tema: "claro", idioma: "catalán", edad: 15 },
    contacto: {
      direccion: {
        calle: "Calle también falsa, 123",
        localidad: "Andorra la Vella",
        pais: "Andorra",
      },
      correoelectronico: "correoandorrano@gmail.com",
      telefono: "",
    },
  },
  {
    nombre: "Alberto",
    preferencias: { tema: "oscuro", idioma: "español", edad: 56 },
    contacto: {
      direccion: {
        calle: "Elm Street, 666",
        localidad: "Petrer",
        pais: "España",
      },
      correoelectronico: "correonulo@yahoo.com",
      telefono: "548632478",
    },
  },
  {
    nombre: "Jacinto",
    preferencias: { tema: "claro", idioma: "inglés", edad: 17 },
    contacto: {
      direccion: {
        calle: "Elm Street, 667",
        localidad: "Elda",
        pais: "España",
      },
      correoelectronico: "correofalso@gmail.com",
      telefono: "",
    },
  },
  {
    nombre: "Rigoberta",
    preferencias: { tema: "claro", idioma: "francés", edad: 34 },
    contacto: {
      direccion: {
        calle: "Calle inexistente, 6",
        localidad: "Burdeos",
        pais: "Francia",
      },
      correoelectronico: "correofalso@gmail.com",
      telefono: "232547859",
    },
  },
  {
    nombre: "Sandra",
    preferencias: { tema: "oscuro", idioma: "español", edad: 18 },
    contacto: {
      direccion: {
        calle: "Calle de mentira, s/n",
        localidad: "Petrer",
        pais: "España",
      },
      correoelectronico: "estecorreonoexiste@gmail.com",
      telefono: "452158697",
    },
  },
  {
    nombre: "Sandra",
    preferencias: { tema: "oscuro", idioma: "español", edad: 18 },
    contacto: {
      direccion: {
        calle: "Calle existente, 34",
        localidad: "Petrer",
        pais: "España",
      },
      correoelectronico: "correoinexistente@yahoo.com",
      telefono: "",
    },
  },
];

/**
 * 
 * @param {Object} usuario 
 * @returns {Array<Object>} con el usuario nuevo.
 */
export const insertarUsuario = (usuario) => {
    return [...usuarios, usuario];
}

// El método filter devuelve un nuevo array, por lo que no es necesario usar el spread operator.

/**
 * 
 * @returns {Array<Object>} de los usuarios mayores de edad.
 */
export const usuariosMayoresEdad = () => {
    // No sabía que se podía anidar desestructuraciones. Lo veo súper cómodo y bastante limpio. Creo que es buena práctica.

    return usuarios.filter(({preferencias: {edad}}) => edad >= 18);
}

/**
 * 
 * @returns {Array<Object>} de los usuarios que usan Yahoo.
 */
export const usuarioYahoo = () => {
    // Utilizo el método endsWith porque lo veo para este caso el más cómodo.
    return usuarios.filter(({contacto: {correoelectronico}}) => correoelectronico.endsWith("@yahoo.com"));
}

/**
 * 
 * @returns {Array<Object>} de los usuarios Españoles que usan tema claro y que son mayores de edad.
 */
export const usuariosEspañaMayorEdadTemaClaro = () => {
    //Aprovecho que ya tenemos un método que filtra a los que son mayores de edad para reutilizarlo en éste. He usado desestructuración para que sea más legible.
    return usuariosMayoresEdad().filter(({contacto: {direccion}, preferencias: {tema}}) => direccion.pais === "España" && tema === "claro");
}

/**
 * 
 * @returns {Array<Object>} de usuarios que tienen algún campo sin rellenar.
 */
export const usuariosIncompletos = () => {
    return usuarios.filter((usuario) => buscarCampoIncompleto(usuario));
}

//He dividido este método en dos para que sea más cómodo y que no se hagan tantas operaciones dentro del mismo.
/**
 * 
 * @param {Object} usuario 
 * @returns {boolean} Si el objeto tiene algún campo sin rellenar.
 */
const buscarCampoIncompleto = (usuario) => {
    //Con Object.values se recorren todos los valores del objeto y gracias a some podemos ver si alguno de los valores del objeto cumplen la condición.
    return Object.values(usuario).some((elemento) => {
        /*Si el elemento es un objeto llamamos al método de forma recursiva para que también se recorran sus valores ya que si no lo hacemos, esos valores no se 
        analizarán y ya no se filtrarían bien los usuarios. Añado elemento != null porque null es object también*/
        if(typeof elemento === "object" && elemento !== null){
            return buscarCampoIncompleto(elemento);
        }
        /*Devolverá true si encuentra algún valor que no tenga datos, es decir, cadena vacía, undefined o null.*/
        return elemento === undefined || elemento === null || elemento === "";          
        }
    )
}

/**
 * 
 * @returns {Array<Object>} de los usuarios con apellido como nuevo campo.
 */
export const añadirApellidos = () => {
    //Con este me he liado un poco, pero en realidad es sencillo, por cada objeto usuario hacemos una copia de el mismo y añadimos una nueva propiedad.
    return usuarios.map((usuario) => ({
        ...usuario,
        apellidos:"No indicado"
    }));
}

/**
 * 
 * @returns {Array<Object>} de los usuarios con un campo nuevo llamado código en la dirección.
 */
export const añadirCodigoDireccion = () => {
    /*Este método si que me ha costado porque anidar copias lo veo dificil de ver, al menos ahora.
    Es más difícil que el método anterior porque tienes que añadir un campo nuevo a un objeto del objeto. Quería usar desestructuración y en el map acceder solo al campo de dirección para añadir el nuevo campo pero eso 
    creaba usuarios con solo el campo dirección.*/
    
    return usuarios.map((usuario) => ({
        ...usuario,
        contacto: {
            ...usuario.contacto,
            direccion : {
                ...usuario.contacto.direccion,
                codigo: "00000"
            }
        }
    }));
}





