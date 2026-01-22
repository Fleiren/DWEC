import {useState} from "react";
import { supabaseConexion } from "../supabase/supabase.js";

const useAuth = () => {

    const createAccount = async(credentials) => {
        try{
            if(credentials){
                 const {data, error} = await supabaseConexion.auth.signUp({
                email: credentials.email,
                password: credentials.password
                });
            }else{
                throw new Error("Debes introducir los datos para registrarte.");
            }

            if(error){
                throw error;
            }
               
        }catch (error){
            throw error;
        }
    }

    const signIn = async (credentials) => {
        try{
            if(credentials){
                 const {data, error} = await supabaseConexion.auth.signInWithPassword({
                email: credentials.email,
                password: credentials.password
                //Se puede hacer una redirección.
                });
            }else{
                throw new Error("Debes introducir los datos para iniciar sesión.");
            }

            if(error){
                throw error;
            }

           
           
        }catch(error){
            throw error;
        }
    }

    return {
        createAccount,
        signIn
    }
}

export default useAuth;