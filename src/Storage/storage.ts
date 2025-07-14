import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyType } from "../constants/DropDownLists";

export const storage = {
    // LEER DATOS STORAGE
    async get( key: KeyType ){
        try{
            const item = await AsyncStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        }catch(err){
            console.error("Error al LEER datos Storage:", err);
            return null;
        }
    },

    // GUARDAR DATOS STORAGE
    async set( key: KeyType, value: any ){
        try{
            const stringifiedValue = JSON.stringify(value); // a string
            await AsyncStorage.setItem(key, stringifiedValue);
            return true;
        }catch(err){
            console.error("Error al GUARDAR Storage:", err);
            return null;
        }
    },

    // ELIMINAR DATOS STORAGE
    async remove( key: KeyType ){
        try{
            await AsyncStorage.removeItem(key);
        }catch(err){
            console.error("Error al BORRAR Storage:", err);
            return null;
        }
    },
}