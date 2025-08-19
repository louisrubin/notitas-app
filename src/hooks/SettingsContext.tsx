import React, { createContext, useContext, useEffect, useState } from "react";
import { designByList, DropDownItem, fontSizeList, orderByList, themeList 
} from "../constants/DropDownLists";
import { storage } from "../Storage/storage";

interface Props {
    children: React.ReactNode;
}

// mapa de tipos que asocie cada clave con el tipo de valor que debe tener
export type SettingsValueMap = {
    fontSize: DropDownItem;
    orderBy: DropDownItem;
    designBy: DropDownItem;
    theme: DropDownItem;
    saveAuto: boolean;
}

export type KeyType = keyof SettingsValueMap;   // KeyType --> SettingsValueMap

interface SettingsContextProp {
    fontSize: DropDownItem;
    orderBy: DropDownItem;
    designBy: DropDownItem;
    theme: DropDownItem;
    saveAuto: boolean;
    cambiarSetting: <K extends KeyType>(
        key: K, newConfig: SettingsValueMap[K]
    ) => Promise<void>;
    getSavedSettingValue: <K extends KeyType>(
        key: K
        // condición de lo que retorna depende de KeyType
    ) => SettingsValueMap[K] extends DropDownItem ? string : SettingsValueMap[K];
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
    const [orderBy, setOrder] = useState<DropDownItem>(orderByList[1]);// fecha de creación --> [0]
    const [designBy, setDesign] = useState<DropDownItem>(designByList[1]);// Ver en cuadrícula --> [1]
    const [theme, setTheme] = useState<DropDownItem>(themeList[0]);     // tema Claro --> [0]
    const [saveAuto, setSaveAuto] = useState(true); // guardado automatico de notas

    useEffect( () => {
        const cargarSettingsLocal = async () =>{

            // await Promise.all([
            //     await storage.remove("designBy"),
            //     await storage.remove("fontSize"),
            //     await storage.remove("orderBy"),
            //     await storage.remove("theme"),
            //     await storage.remove("saveAuto"),
            // ])

            // obtener datos desde el AsyncStorage --> 1 sola llamada en paralelo
            const [ savedFontSize, savedOrder, savedDesign, savedTheme, savedSaveAuto ] = 
                await Promise.all([
                    storage.get("fontSize"),
                    storage.get("orderBy"),
                    storage.get("designBy"),
                    storage.get("theme"),
                    storage.get("saveAuto"),
                ]
            );
             
            // verif si hay valores guardados y setear
            if (savedFontSize !== null) setFontSize(savedFontSize);
            if (savedOrder !== null) setOrder(savedOrder);
            if (savedDesign !== null) setDesign(savedDesign);
            if (savedTheme !== null) setTheme(savedTheme);
            if (savedSaveAuto !== null) setSaveAuto(savedSaveAuto);
        };
        
        cargarSettingsLocal();
    }, [] );

    const cambiarSetting = async <K extends KeyType>(key: K, newConfig: SettingsValueMap[K]) => {
        const functionMap: { [Sett in KeyType]: (value: SettingsValueMap[Sett]) => void } = {
            // mapa de funciones para setear el State
            fontSize: setFontSize,
            orderBy: setOrder,
            designBy: setDesign,
            theme: setTheme,
            saveAuto: setSaveAuto,
        };  
        // ejecutar funct desde el map
        functionMap[key](newConfig);   // actualizar el estado
        await storage.set(key, newConfig);  // guarda la config en AsyncStorage
    }      

    const getSavedSettingValue = <K extends KeyType>(key: K): 
    SettingsValueMap[K] extends DropDownItem ? string : SettingsValueMap[K] => {
        // get string para mostrar en el DropDown desde el Context Settings
        const settingMap : SettingsValueMap = {
            fontSize,   // 
            orderBy,    // 
            designBy,   // 
            theme,
            saveAuto
        }       
        const setting = settingMap[key];
        
        // Si es un objeto DropDownItem, devolvemos solo el value
        if (typeof setting === "object" && setting !== null && "value" in setting) {
            return setting.value as any;
        }
        
        // Si es boolean u otro tipo, lo devolvemos tal cual
        return setting as any;
    }

    return(
        <SettingsContext.Provider 
            value={{ fontSize, orderBy, designBy, theme, saveAuto,
                cambiarSetting, getSavedSettingValue,
            }}
        >
            { children }
        </SettingsContext.Provider>
    )
}
