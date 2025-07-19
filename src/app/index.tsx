import { StyleSheet, Text, View } from "react-native"
import { Colors } from "../constants/colors"
import { useEffect, useState } from "react"
import { getAllRows, initDB, insertNote, Nota} from "../hooks/SQLiteHooks";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FlatListX from "../components/FlatListX";
import { useSettings } from "../hooks/SettingsContext";
import TopAppBar from "../components/TopAppBar";

// https://docs.expo.dev/versions/latest/sdk/sqlite/

export default function Index(){
    const insets = useSafeAreaInsets();
    const { orderBy } = useSettings();      // context
    const [notes, setNotes] = useState<Nota[]>([]);     // state de Notas
    
    const [selecting, setSelecting] = useState(true);   // state para manejar el "selecting" de notas
    const [deletingList, setDeletingList] = useState<number[]>([]);

    useEffect( () => {
        const welcome = async () => {
            await initDB();
            // deleteALL();
            // deleteNote(11);

            // ejemplosNotas.forEach( (nota) => {
            //     insertNote({
            //         title: nota.title, value: nota.value, created_at: nota.created_at})
            // })
            // insertNote({title: "Lorem ipsum 2", value: `Lorem ipsum dolor sit amet, 
            //     consectetur adipiscing elit. Vivamus facilisis fermentum metus, 
            //     at congue augue malesuada ac.`, 
            //     created_at: new Date("2025-04-09").toString(),
            // })
            const allNotas = await getAllRows(orderBy.value);            
            setNotes(allNotas);
            // console.log("length:",allNotas.length);
        }

        welcome();
    }, []);

    const handleToggleDeleteOne = (id: number) => {
        // funct que para usar el useState y pasarlo al <FlatListX />
        setDeletingList(prev => 
            prev.includes(id)
                ? prev.filter(itemId => itemId !== id)  // mantiene todos los que son !== id
                : [...prev, id]             // agrega el nuevo id
        );
    };

    const handleToggleAllNotes = () => {
        if (deletingList.length === notes.length) {
        // Si ya están todos seleccionados, deselecciona todos
            setDeletingList([]);
        } else {
            // Si no, selecciona todos
            const allIds = notes.map(note => note.id);  // agarra todos los id
            setDeletingList(allIds);    // los agrega a la lista
        }
    }

    return(
        <View style={[styles.container, {paddingTop: insets.top}]}>
            
            {/* HEADER */}
            <TopAppBar 
            selectState={selecting} 
            cantNotas={notes.length}
            deletingList={deletingList.length}
            onToggleAll={handleToggleAllNotes}
            />

            {/* BODY */}
            <FlatListX 
                listaNotas={notes}  
                deletingList={deletingList}
                handleToggleDeleteOne={handleToggleDeleteOne}
            />
            
        </View>            
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,         
        backgroundColor: Colors.light.background
        // backgroundColor: "#140A00", //FFE4B5
    },
    
    body:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    footer:{},

    text: {
        textAlign: "center",
        color: Colors.light.text,
        fontSize: 30,
        fontWeight: "bold",
        height: 400
    }
})