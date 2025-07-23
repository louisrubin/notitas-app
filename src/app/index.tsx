import { BackHandler, StyleSheet, Text, View } from "react-native"
import { Colors } from "../constants/colors"
import { useEffect, useState } from "react"
import { deleteALL, getAllRows, initDB, insertNote, Nota} from "../hooks/SQLiteHooks";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FlatListX from "../components/FlatListX";
import { useSettings } from "../hooks/SettingsContext";
import TopAppBar from "../components/TopAppBar";
import BottomBar from "../components/BottomBar";

// https://docs.expo.dev/versions/latest/sdk/sqlite/

export default function Index(){
    const insets = useSafeAreaInsets();
    const { orderBy } = useSettings();      // context
    const [notes, setNotes] = useState<Nota[]>([]);     // state de Notas
    
    const [selecting, setSelecting] = useState(false);   // state para manejar el "selecting" de notas
    const [deletingList, setDeletingList] = useState<number[]>([]);
    const [showBottomBar, setShowBottomBar] = useState(false);

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
            // insertNote({title: "Implementación de app notas📝", 
            //     value: "1️⃣ Buscador en tiempo real en SQLite\n2️⃣ Redireccionar al detalle de la nota\n3️⃣ Implementar soporte Markdown", 
            //     created_at: new Date().toDateString()})
            const allNotas = await getAllRows(orderBy.value);
            setNotes(allNotas);
            // const futureDate = new Date(new Date().setDate(new Date().getDate() + 7));
            // console.log(futureDate);
            
            // console.log("length:",allNotas.length);
            // console.log(notes.at(2));
            
        }

        welcome();
    }, []);

    useEffect( () => {
        // PARA SALIR DEL MODO SELECCION A TRAVES DEL BOTON O GESTO VOLVER ATRAS
        if (selecting) {
            setShowBottomBar(true); // Monta <BottomBar> al activar selecting
        }

        const volverAction = () => {
            if (selecting) {
                exitSelecting(); // sale del modo selecting y limpia la lista actual
                return true; // bloquea el volver y evita salir de la app
            }
            return false; // permite comportamiento normal si no está seleccionando
        };
        const volverHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            volverAction
        );
        return () => volverHandler.remove();
    },[selecting])

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
    const exitSelecting = () => {
        setSelecting(false);    // salir del modo Selecting
        setDeletingList([]);    // limpia la lista para limpiar los state de <ButtonCheck>
    }
    const handleSelectingMode = () => {
        setSelecting(!selecting);        
    }

    return(
        <View style={[styles.container, {paddingTop: insets.top}]}>
            <TopAppBar 
                selectState={selecting} 
                handleSelectState={exitSelecting}
                cantNotas={notes.length}
                deletingCount={deletingList.length}
                onToggleAll={handleToggleAllNotes}
            />
            <FlatListX 
                listaNotas={notes}  
                selectingMode={selecting}
                setSelectingMode={handleSelectingMode}
                deletingList={deletingList}
                handleToggleDeleteOne={handleToggleDeleteOne}
            />
            {
                showBottomBar && (
                    <BottomBar
                        cantSelect={deletingList.length}
                        visible={selecting}
                        onHidden={ () => setShowBottomBar(false) }
                    />
                )
            }
            
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