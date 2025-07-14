import React, { createContext, useContext, useEffect, useState } from "react";
import { designByList, DropDownItem, fontSizeList, KeyType, orderByList } from "../constants/DropDownLists";
import { storage } from "../Storage/storage";

interface Props {
    children: React.ReactNode;
}

interface SettingsContextProp {
    fontSize: DropDownItem;
    orderBy: DropDownItem;
    designBy: DropDownItem;
    cambiarSetting: (key: KeyType, newConfig: DropDownItem) => Promise<void>;
}

// creando el contexto
const SettingsContext = createContext<SettingsContextProp>({
    // valores default del contexto
    fontSize: fontSizeList[1],   // Mediana --> [1]
    orderBy: orderByList[0],      // Por fecha de creación --> [0]
    designBy: designByList[1],     // Ver en cuadrícula --> [1]
    cambiarSetting: null,
})

// funct para obtener los valores del contexto
export const useSettings = () => useContext(SettingsContext);

export function SettingsProvider( {children}: Props ) {
    const [fontSize, setFontSize] = useState<DropDownItem>(fontSizeList[1]); // valores default
    const [orderBy, setOrder] = useState<DropDownItem>(orderByList[0]);
    const [designBy, setDesign] = useState<DropDownItem>(designByList[1]);

    useEffect( () => {
        const cargarSettingsLocal = async () =>{
            const savedFontSize = await storage.get("fontSize");
            const savedOrder = await storage.get("orderBy");
            const savedDesign = await storage.get("designBy");        

            if (savedFontSize !== null) {
                setFontSize(savedFontSize);
            } else cambiarSetting("fontSize", fontSize);    // la primera vez guarda

            if (savedOrder !== null) {
                setOrder(savedOrder);
            } else cambiarSetting("orderBy", orderBy);

            if (savedDesign !== null) {
                setDesign(savedDesign);
            } else cambiarSetting("designBy", designBy);
        }
        cargarSettingsLocal();
    }, [] );

    const cambiarSetting = async ( key: KeyType, newConfig: DropDownItem) => {
        if(key === "fontSize") setFontSize(newConfig);    // set estado
        if(key === "orderBy") setOrder(newConfig);
        if(key === "designBy") setDesign(newConfig);

        await storage.set(key, newConfig);  // guarda la config en AsyncStorage
    }

    return(
        <SettingsContext.Provider value={{ fontSize, orderBy, designBy, cambiarSetting }}>
            { children }
        </SettingsContext.Provider>
    )
}
