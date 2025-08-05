import React, { createContext, useContext, useEffect, useState } from "react";
import { designByList, DropDownItem, fontSizeList, 
    KeyType, orderByList, themeList 
} from "../constants/DropDownLists";
import { storage } from "../Storage/storage";

interface Props {
    children: React.ReactNode;
}

interface SettingsContextProp {
    fontSize: DropDownItem;
    orderBy: DropDownItem;
    designBy: DropDownItem;
    theme: DropDownItem;
    cambiarSetting: (key: KeyType, newConfig: DropDownItem) => Promise<void>;
    getSavedSettingValue: (key: KeyType) => string;
}

// creando el contexto de tipo 'SettingsContextProp'
const SettingsContext = createContext<SettingsContextProp | undefined>(undefined);

// funct para obtener los valores del contexto
export const useSettings = () => {
    const context = useContext(SettingsContext);
    // VALIDACION PARA USAR SOLO DENTRO DE 'SettingsProvider'
    if(!context) {
        throw new Error("useSettings debe usarse dentro de un <SettingsProvider>");
    }
    return context;
}

export function SettingsProvider( {children}: Props ) {
    const [fontSize, setFontSize] = useState<DropDownItem>(fontSizeList[1]); // Mediana --> [1]
    const [orderBy, setOrder] = useState<DropDownItem>(orderByList[0]);// fecha de creación --> [0]
    const [designBy, setDesign] = useState<DropDownItem>(designByList[1]);// Ver en cuadrícula --> [1]
    const [theme, setTheme] = useState<DropDownItem>(themeList[0]);     // tema Claro --> [0]

    useEffect( () => {
        const cargarSettingsLocal = async () =>{

            // await storage.remove("designBy");
            // await storage.remove("fontSize");
            // await storage.remove("orderBy");
            // await storage.remove("theme");

            // obtener datos desde el AsyncStorage
            const savedFontSize = await storage.get("fontSize");
            const savedOrder = await storage.get("orderBy");
            const savedDesign = await storage.get("designBy");
            const savedTheme = await storage.get("theme");
             
            // verif si hay valores guardados y setear
            savedFontSize !== null ? setFontSize(savedFontSize) : null;
            savedOrder !== null ? setOrder(savedOrder) : null;
            savedDesign !== null ? setDesign(savedDesign) : null;
            savedTheme !== null ? setTheme(savedTheme) : null;
            
        }
        cargarSettingsLocal();
    }, [] );

    const cambiarSetting = async ( key: KeyType, newConfig: DropDownItem) => {
        const functionMap: Record<KeyType, (value: DropDownItem) => void> = {
            // mapa de funciones para setear el State
            fontSize: (value) => setFontSize(value),
            orderBy: (value) => setOrder(value),
            designBy: (value) => setDesign(value),
            theme: (value) => setTheme(value),
        };  
        // ejecutar funct desde el map
        functionMap[key](newConfig);   // actualizar el estado
        await storage.set(key, newConfig);  // guarda la config en AsyncStorage
    }      

    const getSavedSettingValue = (key: KeyType) : string => {
        // get string para mostrar en el DropDown desde el Context Settings
        const settingMap : Record<KeyType, string> = {
            "fontSize": fontSize.value, // Cuando encuentra coincidencia
            "orderBy": orderBy.value,   // item.value === props.value
            "designBy": designBy.value,  // muestra el 'item.label' asociado
            "theme": theme.value,
        }        
        return settingMap[key] ?? "SettingsContext [key]"; // return label(string) del setting
    }

    return(
        <SettingsContext.Provider 
            value={{ fontSize, orderBy, designBy, theme,
                cambiarSetting, getSavedSettingValue, 
            }}
        >
            { children }
        </SettingsContext.Provider>
    )
}
