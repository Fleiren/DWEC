import React, {useContext} from "react";
import {ContextoDiscos} from "./../context/ProveedorDiscos.jsx";
const useDiscos = () => {
    //Me ha costado un poco ver el uso del hook al principio porque lo estaba viendo como un puente un poco innecesario, ahora ya entiendo que aquí (sobre todo en aplicaciones grandes) se aplicaría lógica más específica para no saturar el contexto.
    const contexto = useContext(ContextoDiscos);

    if(!contexto){
        throw new Error("Debes utilizar useDiscos dentro de un componente englobado por <ProveedorDiscos/>");
    }

    return contexto;
}

export default useDiscos;