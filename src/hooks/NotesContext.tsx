import React, { createContext, useContext, useEffect, useState } from "react";
import { getAllRows, Nota } from "./SQLiteHooks";
import { useSettings } from "./SettingsContext";
import { useSQLiteContext } from "expo-sqlite";

interface NotesContextType {
    notes: Nota[];
    cargarNotas: () => Promise<void>;
    setNotes: React.Dispatch<React.SetStateAction<Nota[]>>; // use State (hook)
    setCargando: React.Dispatch<React.SetStateAction<boolean>>;
    cargando: boolean;
    // setCargando: React.Dispatch<React.SetStateAction<boolean>>;
}

const NotesContext = createContext<NotesContextType>(null); // inicial vacío

export const useNotes = () => {
    const context = useContext(NotesContext);
    if (!context) throw new Error("useNotes debe usarse dentro de NotesProvider");
    return context;
}

export function NotesProvider( {children}: {children: React.ReactNode} ){
    const [notes, setNotes] = useState<Nota[]>([]);
    const [cargando, setCargando] = useState(true);
    const { orderBy } = useSettings();
    const db = useSQLiteContext();

    const cargarNotas = async () => {
        // SETEA TODAS LAS NOTAS DESDE LA BD AL STATE
        setCargando(true);    // set
        const allNotas = await getAllRows(db, orderBy.value);
        setNotes(allNotas);
        setCargando(false);    // set
    };

    useEffect( () => {
        cargarNotas();
    }, [orderBy.value]); // recargar cuando cambia el orden


    return (
        <NotesContext.Provider 
        value={{ notes, cargarNotas, setNotes, cargando, setCargando }}
        >
            {children}
        </NotesContext.Provider>
    );
};