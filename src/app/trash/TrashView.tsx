import { BackHandler, StyleSheet, Text, ToastAndroid, View } from "react-native";
import { useEffect, useState } from "react";
import { deleteNotesManual, deleteNoteVencidas, 
    diasParaDelete, getAllRows, Nota, 
    undoNotesFromTrash, 
} from "../../hooks/SQLiteHooks";
import { useSettings } from "../../hooks/SettingsContext";
import FlatListX from "../../components/FlatListX";
import BottomBar from "../../components/BottomBar";
import BottomBarButton from "../../components/BottomBarButton";
import { useNotes } from "../../hooks/NotesContext";
import { useSQLiteContext } from "expo-sqlite";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Animated, { FadeInUp } from "react-native-reanimated";
import { Colors } from "../../constants/colors";
import ModalConfirmacion from "../../components/ModalConfirmacion";

export default function TrashView(){
    const { orderBy, theme } = useSettings();     // context del setting actual 
    const { cargarNotas, cargando, setCargando } = useNotes();    // context
    const db = useSQLiteContext();

    const [selecting, setSelecting] = useState(false);
    const [notesTrash, setNotesTrash] = useState<Nota[]>([]);
    const [deletingList, setDeletingList] = useState<number[]>([]);
    const [showBottomBar, setShowBottomBar] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);

    useEffect( () => {
        // AL MONTAR LA VISTA
        const cargarNotasTrash = async () => {
            setCargando(true);  // ACTUALIZA EL CONTEXT 'CARGANDO'
            deleteNoteVencidas(db);   // elimina las notas vencidas al montar la vista
            const allNotes = await getAllRows(db, orderBy.value, true); // true --> get eliminados
            setNotesTrash(allNotes);
            setCargando(false);  // ACTUALIZA EL CONTEXT 'CARGANDO'
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
                await undoNotesFromTrash(db, deletingList);    // set atributo 'delete_date' = NULL
                const newNotesList = await getAllRows(db, orderBy.value, true);   // get nueva lista
                setNotesTrash(newNotesList); // setear nueva lista para el FlatList
                exitSelectingMode();    // salir modo selecting y limpiar lista deleting
                await cargarNotas();    // recarga la lista para el INDEX
            }
        } catch (error) {
            ToastAndroid.show("Hubo un error al restaurar",ToastAndroid.SHORT);
            console.log("error al restaurar notas:",error);
        }
        
    }

    const deletePermantente = async () => {
        try {
            if (deletingList.length > 0) {
                await deleteNotesManual(db, deletingList);
                const newNotesList = await getAllRows(db, orderBy.value, true);   // get nueva lista
                setNotesTrash(newNotesList); // setear nueva lista para el FlatList
                exitSelectingMode();    // salir modo selecting y limpiar lista deleting
                ToastAndroid.show("Borrado permanente",ToastAndroid.SHORT);
            }
        } catch (error) {
            ToastAndroid.show("Hubo un error al eliminar",ToastAndroid.SHORT);
            console.log("error al eliminar notas:",error);
        }
    }

    return(
        <View style={{flex: 1, backgroundColor: Colors[theme.value].background}}>
            <Text style={[styles.notification, {color: Colors[theme.value].subtitle}]}>
                Las notas serán borradas de forma permanente pasados {diasParaDelete} días de su eliminación.
            </Text>

            {
                !cargando && notesTrash.length === 0
                ? 
                    <Animated.View 
                        entering={FadeInUp.duration(500)}
                        style={{flex: 1}} 
                    >
                        <View style={styles.messageContainer}>
                            <MaterialCommunityIcons name="delete-empty" size={54} 
                                color={Colors[theme.value].icon} 
                            />
                            <Text style={[styles.messageText, {color: Colors[theme.value].icon}]}>
                                Papelera vacía
                            </Text>
                        </View>
                    </Animated.View>
                : 
                <>
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
                        // BARRA INFERIOR 'RESTAURAR' Y 'ELIMINAR PERMANENTE'
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
                                    onPress={() => setShowModalDelete(true)}
                                />
                            </BottomBar>
                        )
                    }
                </>
            }

            {/* ELIMINACION */}
            <ModalConfirmacion 
                visible={showModalDelete}
                setVisible={setShowModalDelete}

                title={`¿Eliminar ${deletingList.length} de forma permanente?`}
                confirmText="Eliminar"
                colorConfirmText={"tomato"}

                onConfirm={deletePermantente}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    messageContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 150,
        opacity: 0.4,
    },
    messageText: {
        fontSize: 18,
        fontWeight: 500,
        // color: "#57382F",
    },
    notification: {
        textAlign: "center", 
        fontWeight: 500,
        marginBottom: 10, 
        paddingHorizontal: 70,
        // color: "#4B5563",
    },
})