import { View } from "react-native";
import { useEffect, useState } from "react";
import { getAllRows, Nota } from "../../hooks/SQLiteHooks";
import { useSettings } from "../../hooks/SettingsContext";
import FlatListX from "../../components/FlatListX";

export default function TrashView(){
    const { orderBy } = useSettings();     // context del setting actual 
    const [notesTrash, setNotesTrash] = useState<Nota[]>([]);

    useEffect( () => {
        // AL MONTAR LA VISTA
        const montandoVista = async () => {
            const allNotes = await getAllRows(orderBy.value, true); // true --> get eliminados
            setNotesTrash(allNotes);
            // console.log(allNotes.length);            
        };
        montandoVista();
    }, []);

    return(
        <View style={{flex: 1,}}>
            <FlatListX 
                listaNotas={notesTrash}
                navigationOnPress={false}   // al hacer clic no puede ir a esa nota
            />
        </View>
    )
}