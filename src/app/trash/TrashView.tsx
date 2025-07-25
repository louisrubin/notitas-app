import { BackHandler, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { deleteNotesManual, deleteNoteVencidas, diasParaDelete, getAllRows, Nota, undoNotesFromTrash } from "../../hooks/SQLiteHooks";
import { useSettings } from "../../hooks/SettingsContext";
import FlatListX from "../../components/FlatListX";
import BottomBar from "../../components/BottomBar";
import BottomBarButton from "../../components/BottomBarButton";
import { useNotes } from "../../hooks/NotesContext";

export default function TrashView(){
    const { orderBy } = useSettings();     // context del setting actual 
    const { cargarNotas } = useNotes();    // context

    const [selecting, setSelecting] = useState(false);
    const [notesTrash, setNotesTrash] = useState<Nota[]>([]);
    const [deletingList, setDeletingList] = useState<number[]>([]);
    const [showBottomBar, setShowBottomBar] = useState(false);

    useEffect( () => {
        // AL MONTAR LA VISTA
        const cargarNotasTrash = async () => {
            deleteNoteVencidas();   // elimina las notas vencidas al montar la vista
            const allNotes = await getAllRows(orderBy.value, true); // true --> get eliminados
            setNotesTrash(allNotes);
            // console.log(allNotes);            
        };
        cargarNotasTrash();
    }, []);

    useEffect( () => {
        // PARA SALIR DEL MODO SELECCION A TRAVES DEL BOTON O GESTO VOLVER ATRAS
        if (selecting) {
            setShowBottomBar(true); // Monta <BottomBar> al activar selecting
        }

        const volverAction = () => {
            if (selecting) {
                exitSelectingMode(); // sale del modo selecting y limpia la lista actual
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

    const handleSelectingMode = () => {
        // manejar el Selecting Mode para pasar como parametro
        setSelecting(!selecting);
    }

    const handleToggleDeleteOne = (id: number) => {
        // funct que para usar el useState y pasarlo al <FlatListX />
        setDeletingList(prev => 
            prev.includes(id)
                ? prev.filter(itemId => itemId !== id)  // mantiene todos los que son !== id
                : [...prev, id]             // agrega el nuevo id
        );
    };

    const exitSelectingMode = () => {
        setSelecting(false);
        setDeletingList([]);    // limpiar lista
    }

    const undoFunction = async () => {
        // método para SETEAR 'delete_date' = NULL
        try {
            if (deletingList.length > 0) {
                await undoNotesFromTrash(deletingList);    // set atributo 'delete_date' = NULL
                const newNotesList = await getAllRows(orderBy.value, true);   // get nueva lista
                setNotesTrash(newNotesList); // setear nueva lista para el FlatList
                exitSelectingMode();    // salir modo selecting y limpiar lista deleting
                await cargarNotas();    // recarga la lista para el INDEX
            }
        } catch (error) {
            throw new Error("error al restaurar notas:",error);
        }
        
    }

    const deletePermantente = async () => {
        try {
            if (deletingList.length > 0) {
                await deleteNotesManual(deletingList);
                const newNotesList = await getAllRows(orderBy.value, true);   // get nueva lista
                setNotesTrash(newNotesList); // setear nueva lista para el FlatList
                exitSelectingMode();    // salir modo selecting y limpiar lista deleting
            }
        } catch (error) {
            throw new Error("error al eliminar notas:",error);
        }
    }

    return(
        <View style={{flex: 1}}>
            <Text style={{
                textAlign: "center", fontWeight: 500, color: "#4B5563",
                marginBottom: 10, paddingHorizontal: 70,
            }}>
                Las notas serán borradas de forma permanente pasados {diasParaDelete} días de su eliminación.
            </Text>
            
            <FlatListX 
                listaNotas={notesTrash}
                selectingMode={selecting}
                setSelectingMode={handleSelectingMode}
                deletingList={deletingList}
                handleToggleDeleteOne={handleToggleDeleteOne}

                navigationOnPress={false}   // al hacer clic no puede ir a esa nota
                trashView={true}    // vista: Papelera
            />
            {
                showBottomBar && (
                    <BottomBar 
                    visible={selecting}
                    onHidden={ () => setShowBottomBar(false) }
                    >
                        <BottomBarButton 
                            name="Restaurar"
                            iconName="rotate-ccw"
                            onPress={undoFunction}
                        />
                        <BottomBarButton 
                            name="Eliminar"
                            iconName="trash"
                            onPress={deletePermantente}
                        />
                    </BottomBar>
                )
            }
        </View>
    )
}