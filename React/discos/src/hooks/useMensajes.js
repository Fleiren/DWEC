import React, {useContext} from "react";
import {ContextoMensajes} from "./../context/ProveedorMensajes.jsx";

const useMensajes = () =>{
    const contexto = useContext(ContextoMensajes);

    if(!contexto){
        throw new Error("Para utilizar useMensajes debe estar el componente englobado por el contexto ProveedorMensajes");
    }

    return contexto
};

export default useMensajes;