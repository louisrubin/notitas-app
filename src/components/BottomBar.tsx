import { Animated, Pressable, StyleSheet, Text } from "react-native";
import { useEffect, useRef } from "react";
import { getAllRows, Nota, setDeleteNote } from "../hooks/SQLiteHooks";
import Feather from '@expo/vector-icons/Feather';
import { useSettings } from "../hooks/SettingsContext";

interface BottomBarProp {
    deleteList?: number[];
    visible?: boolean;
    onHidden?: () => void; 
    exitSelectingMode?: () => void;
    setNotes?: (list: Nota[]) => void;  // function-hook para setear nueva lista
}

export default function BottomBar( {
    deleteList, 
    visible, 
    onHidden,
    exitSelectingMode, 
    setNotes,
}: BottomBarProp ) {

    const { orderBy } = useSettings();
    const translateY = useRef(new Animated.Value(100)).current; // Comienza fuera de pantalla abajo
    const opacity = useRef(new Animated.Value(0)).current;      // Comienza invisible

    const deleteFunction = async () => {
        // método para 'eliminar' las notas seleccionadas
        if (deleteList.length > 0) {
            await setDeleteNote(deleteList);    // set atributo 'delete_date' = hoy
            const newNotesList = await getAllRows(orderBy.value);   // get nueva lista
            setNotes(newNotesList); // setear nueva lista para el index
            exitSelectingMode();    // salir modo selecting y limpiar lista deleting
        }
    }

    useEffect( () => {
        if (visible) {
            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();     // iniciar
        } 
        else {
            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: 100,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start(
                () => {
                    onHidden(); // indica al padre que puede desmontar
                }
            );
        }
    }, [visible]);

    return(
        <Animated.View style={[
            styles.container,
            {
                transform: [{translateY}],
                opacity,
            },
        ]}
        >
            <Pressable style={ ({pressed}) => [
                {
                    backgroundColor: pressed ? "rgba(255,255,255,0.3)" : null
                },
                styles.item,
            ]}
            hitSlop={15}
            onPress={deleteFunction}
            >
                <Feather name="trash" size={24} color="white" />
                <Text style={{color: "white", fontSize: 15}}>Papelera</Text>
                {
                    // al menos 1 seleccionado --> visible
                    deleteList.length > 0 && (
                    <Text style={styles.cantidad}>
                        {deleteList.length}
                    </Text>
                    )
                }
            </Pressable>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        position: "absolute",   // posiciona en la parte inferior de la pantalla
        justifyContent: "center",
        alignItems: "center",
        height: 60,
        width: "100%",
        bottom: 0,
        backgroundColor: "black",
    },
    item: {
        // cada item dentro del container
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 8,
        // backgroundColor: "tomato"
    },
    cantidad: {
        // indicador de cantidad seleccionada
        textAlign: "center",
        fontSize: 15,
        position: "absolute",
        right: 0,
        top: 0,
        borderRadius: 16,
        paddingHorizontal: 5,
        backgroundColor: "tomato"
    },
})