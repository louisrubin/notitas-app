import { BackHandler, StyleSheet, Text, ToastAndroid, View } from "react-native"
import { Colors } from "../constants/colors"
import { useCallback, useEffect, useState } from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FlatListX from "../components/FlatListX";
import { useSettings } from "../hooks/SettingsContext";
import TopAppBar from "../components/TopAppBar";
import BottomBar from "../components/BottomBar";
import BottomBarButton from "../components/BottomBarButton";
import { useNotes } from "../hooks/NotesContext";
import ButtonCreateNote from "../components/buttons/ButtonCreateNote";
import { router, useFocusEffect } from "expo-router";
import { deleteNoteVencidas, getAllRows, setDeleteNote } from "../hooks/SQLiteHooks";
import { useSQLiteContext } from "expo-sqlite";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Animated, { FadeInUp } from "react-native-reanimated";
import ModalConfirmacion from "../components/ModalConfirmacion";

// https://docs.expo.dev/versions/latest/sdk/sqlite/

export default function Index(){
    const insets = useSafeAreaInsets();
    const { orderBy, theme } = useSettings();      // context
    const { notes, setNotes, cargando } = useNotes();
    const db = useSQLiteContext();
    const ColorTheme = Colors[theme.value];
    
    const [selecting, setSelecting] = useState(false);   // state para manejar el "selecting" de notas
    const [deletingList, setDeletingList] = useState<number[]>([]);
    const [showBottomBar, setShowBottomBar] = useState(false);
    const [puedeRenderizar, setPuedeRenderizar] = useState(false);
    const [showModal, setShowModal] = useState(false);  // MODAL CONFIRMACION

    useEffect( () => {
        // AL MONTAR LA VISTA
        deleteNoteVencidas(db);   // elimina las notas vencidas en la papelera
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
    },[selecting]);

    useFocusEffect( 
        // AL ENTRAR EN LA VISTA PUEDE RENDERIZAR PARA MOSTRAR ANIMACIÓN
        useCallback(() => {
            // Se ejecuta al volver a esta vista (focus)
            setPuedeRenderizar(true);

            // resetear para que anime cada vez
            return () => setPuedeRenderizar(false);
        }, [])
    );

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
        try {
            if (deletingList.length > 0) {
                await setDeleteNote(db, deletingList);    // set atributo 'delete_date' = hoy
                const newNotesList = await getAllRows(db, orderBy.value);   // get nueva lista
                setNotes(newNotesList); // setear nueva lista para el index
                exitSelecting();    // salir modo selecting y limpiar lista deleting
                ToastAndroid.show(`Movido a Papelera`, ToastAndroid.SHORT);
            }
        } catch (error) {
            ToastAndroid.show(`Hubo un error al eliminar`, ToastAndroid.SHORT);
            console.log("error al mover a papelera:",error);
        }
        
    }

    function messg_Sing_Plur(num: number): string {
        let message = num + " nota";
        return num === 1 ? message : message + "s";
    }

    return(
    <View style={{ flex: 1, paddingTop: insets.top, 
            backgroundColor: ColorTheme.background,
        }}>
        <View style={{flex: 1}}>
            <TopAppBar 
                selectState={selecting} 
                handleSelectState={exitSelecting}
                cantNotas={notes.length}
                deletingCount={deletingList.length}
                onToggleAll={handleToggleAllNotes}
            />

            <ButtonCreateNote 
                onPress={ () => {
                    router.push("nota");
                    exitSelecting();
                }}
                bgColor={ColorTheme.bgCreateButton}
            />

            {
                puedeRenderizar && notes.length > 0 
                ? (
                    <FlatListX 
                        listaNotas={notes}  
                        selectingMode={selecting}
                        setSelectingMode={handleSelectingMode}
                        deletingList={deletingList}
                        handleToggleDeleteOne={handleToggleDeleteOne}
                    />
                ) 
                : puedeRenderizar && !cargando && (
                    <Animated.View 
                        entering={FadeInUp.duration(500)}
                        style={{flex: 1}} 
                    >
                        <View style={styles.messageContainer}>
                            <MaterialCommunityIcons name="file-edit" size={54} 
                                color={ColorTheme.icon} 
                            />
                            <Text style={[styles.messageText, {color: ColorTheme.icon}]}>
                                No hay notitas
                            </Text>
                        </View>
                    </Animated.View>
                )                
            }
            
            
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
                            onPress={() => {setShowModal(true)}}
                        />
                    </BottomBar>
                )
            }            
        </View>
        
        <ModalConfirmacion 
            visible={showModal}
            setVisible={setShowModal}
            title={`¿Mover ${messg_Sing_Plur(deletingList.length)} a la Papelera?`}
            confirmText="Mover a Papelera"
            onConfirm={deleteFunction}
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
    }
})