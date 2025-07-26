import { BackHandler, StyleSheet, Text, TextInput, View } from "react-native";
import { getNoteByID, Nota, updateNote } from "../../hooks/SQLiteHooks";
import { useLocalSearchParams } from "expo-router";
import { getFontSize } from "../../constants/DropDownLists";
import { useSettings } from "../../hooks/SettingsContext";
import HorizontalLine from "../../components/HorizontalLine";
import { useEffect, useState } from "react";
import { useNotes } from "../../hooks/NotesContext";


export default function NotaDetailScreen() {
    const { id_P } = useLocalSearchParams();
    const { fontSize } = useSettings();
    const { cargarNotas } = useNotes();
    const fontSizeValue = getFontSize(fontSize.value);

    const [nota, setNota] = useState<Nota | null>(null);
    const [originalNota, setOriginalNota] = useState<Nota | null>(null);

    useEffect( () => {
        const cargarNota = async () => {
            const nota = await getNoteByID(Number(id_P));
            setNota(nota);
            setOriginalNota(nota);
        }

        if (id_P) {
            cargarNota();   // cargar solo si ingresó en una nota
        }
    }, []);

    useEffect( () => {
        const volverHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            volverYGuardar
        );

        return () => volverHandler.remove();    // elimina el event listener
    }, [nota, originalNota]);


    function handleChangeText(campo: keyof Nota, value: string) {
        // MANEJADOR DE LOS INPUT's AL MODIFICAR EL CONTENIDO
        setNota(
            (prev) => 
            prev ? 
                { ...prev, [campo]: value } // copia todos los campos anterior
            :                               //  actualiza solo ese 'campo'
                prev    // si la nota es null no hace nada
        );
    }

    function volverYGuardar(): boolean{
        // SI HUBO CAMBIOS GUARDA EN BD SINO NADA

        const huboCambios =
            // boolean
            nota?.title !== originalNota?.title ||
            nota?.value !== originalNota?.value;

        if (!huboCambios) {
            // router.back(); // No hace falta guardar, solo volver
            return false;
        }

        updateNote({
            id: nota.id, 
            title: nota.title,
            value: nota.value, 
            updated_at: new Date().toISOString(),
            created_at: nota.created_at,
        }) 
        cargarNotas();  // actualizar Flat List
        
        return false;
    }

    return(
        <View style={styles.container}>

            <TextInput 
                numberOfLines={1}
                placeholder="Título"
                maxLength={40}
                style={[ {
                    fontSize: fontSizeValue
                    }]}
                onChangeText={ (input) => { handleChangeText("title", input) }}
                >
                { nota?.title }
            </TextInput>

            <HorizontalLine />

            <TextInput 
                // autoFocus
                multiline 
                placeholder="Escribe tu notita..."
                style={[styles.textArea, {
                    fontSize: fontSizeValue * 0.8, lineHeight: fontSizeValue * 1.2,
                }]}
                onChangeText={ (input) => { handleChangeText("value", input) }}
            >
                { nota?.value }
            </TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        paddingHorizontal: 16,
        // alignItems: "center", 
        // justifyContent: "center",
        // backgroundColor: "tomato"

    },
    textArea: {
        flex: 1, 
        textAlignVertical: "top",
        
        // color: "#737373",
        // justifyContent: "flex-start",
        // borderWidth: 0.5,
        // flexDirection: "row",
        // backgroundColor: "tomato"
    },
    text: {
        flex: 1,
        marginBottom: 20,
        fontSize: 22,
        paddingHorizontal: 40,
    },
    // title: {
    //     fontWeight: "600",
    //     color: "#ddd",
    // }
})