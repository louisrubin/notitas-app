import { BackHandler, StyleSheet, View } from "react-native"
import { Colors } from "../constants/colors"
import { useEffect, useState } from "react"
import { deleteALL, getAllRows, insertNote, setDeleteNote} from "../hooks/SQLiteHooks";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FlatListX from "../components/FlatListX";
import { useSettings } from "../hooks/SettingsContext";
import TopAppBar from "../components/TopAppBar";
import BottomBar from "../components/BottomBar";
import BottomBarButton from "../components/BottomBarButton";
import { useNotes } from "../hooks/NotesContext";

// https://docs.expo.dev/versions/latest/sdk/sqlite/

export default function Index(){
    const insets = useSafeAreaInsets();
    const { orderBy } = useSettings();      // context
    const { notes, setNotes } = useNotes(); // context
    
    const [selecting, setSelecting] = useState(false);   // state para manejar el "selecting" de notas
    const [deletingList, setDeletingList] = useState<number[]>([]);
    const [showBottomBar, setShowBottomBar] = useState(false);

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
    },[selecting]);

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

    const deleteFunction = async () => {
        // método para SETEAR 'delete_date' a notas seleccionadas
        if (deletingList.length > 0) {
            await setDeleteNote(deletingList);    // set atributo 'delete_date' = hoy
            const newNotesList = await getAllRows(orderBy.value);   // get nueva lista
            setNotes(newNotesList); // setear nueva lista para el index
            exitSelecting();    // salir modo selecting y limpiar lista deleting
        }
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
                        visible={selecting}
                        onHidden={ () => setShowBottomBar(false)}
                    >
                        <BottomBarButton 
                            name="Papelera" 
                            iconName="trash" 
                            cantSelected={deletingList.length}
                            onPress={deleteFunction}
                        />
                    </BottomBar>
                )
            }            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,         
        backgroundColor: Colors.light.background,
    },
})