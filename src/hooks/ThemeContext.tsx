import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

type Tema = "light" | "dark";

// interface para los tipos de datos
interface TemaContextProps {
    tema: Tema;
    cambiarTema: () => void;
}

// creando el contexto
const TemaContext = createContext<TemaContextProps>({
    tema: "light",
    cambiarTema: () => {},
});

export const useTema = () => useContext(TemaContext);

// creando proveedor del context al children
export const TemaProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const systemTema = useColorScheme(); 
    const [tema, setTema] = useState<Tema>("light");

    useEffect(() => {
        const cargarTema = async () => {
            const savedTema = await AsyncStorage.getItem("theme");

            if (savedTema === "light" || savedTema === "dark") {
                setTema(savedTema);
            } else {
                setTema(systemTema === "dark" ? "dark" : "light");
            }
        }
        cargarTema();
    },[]);

    const cambiarTema = async () => {
        const newTema = tema === "light" ? "dark" : "light";
        setTema(newTema);
        await AsyncStorage.setItem("theme", newTema);        
    }

    return(
        <TemaContext.Provider value={{ tema, cambiarTema }}>
            {children}
        </TemaContext.Provider>
    )
}