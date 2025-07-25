import React, { createContext, useContext, useEffect, useState } from "react";
import { getAllRows, Nota } from "./SQLiteHooks";
import { useSettings } from "./SettingsContext";

interface NotesContextType {
    notes: Nota[];
    cargarNotas: () => Promise<void>;
    setNotes: React.Dispatch<React.SetStateAction<Nota[]>>; // use State (hook)
}

const NotesContext = createContext<NotesContextType>(null); // inicial vacío

export const useNotes = () => {
    const context = useContext(NotesContext);
    if (!context) throw new Error("useNotes debe usarse dentro de NotesProvider");
    return context;
}

export function NotesProvider( {children}: {children: React.ReactNode} ){
    const [notes, setNotes] = useState<Nota[]>([]);
    const { orderBy } = useSettings();

    const cargarNotas = async () => {
        // SETEA TODAS LAS NOTAS DESDE LA BD AL STATE
        const allNotas = await getAllRows(orderBy.value);
        setNotes(allNotas);
    };

    useEffect( () => {
        cargarNotas();
    }, [orderBy.value]); // recargar cuando cambia el orden


    return (
        <NotesContext.Provider value={{ notes, cargarNotas, setNotes }}>
            {children}
        </NotesContext.Provider>
    );
};