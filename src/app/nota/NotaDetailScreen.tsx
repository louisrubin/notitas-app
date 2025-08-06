import { BackHandler, StyleSheet, TextInput, View } from "react-native";
import { getNoteByID, insertNote, Nota, updateNote } from "../../hooks/SQLiteHooks";
import { Stack, useLocalSearchParams } from "expo-router";
import { getFontSize } from "../../constants/DropDownLists";
import { useSettings } from "../../hooks/SettingsContext";
import HorizontalLine from "../../components/HorizontalLine";
import { useEffect, useState } from "react";
import { useNotes } from "../../hooks/NotesContext";
import HeaderNotaEditor from "../../components/HeaderNotaEditor";
import { getTodayDateLocal } from "../../hooks/DateFunctions";
import { useSQLiteContext } from "expo-sqlite";
import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function NotaDetailScreen() {
    const { id_P } = useLocalSearchParams();
    const { fontSize } = useSettings();
    const { cargarNotas } = useNotes();
    const db = useSQLiteContext();
    const fontSizeValue = getFontSize(fontSize.value);
    const insets = useSafeAreaInsets();
    

    const [nota, setNota] = useState<Nota | null>(null);
    const [originalNota, setOriginalNota] = useState<Nota | null>(null);

    useEffect( () => {
        const cargarNota = async () => {
            const nota = await getNoteByID(db, Number(id_P));
            setNota(nota);
            setOriginalNota(nota);
        }

        if (id_P) {
            //  SI HAY ID (nota existente) CARGAR SU INFO DESDE LA BD
            cargarNota();
        }
        else{
            //  CREO UN OBJETO NOTA VACIO PARA SETEAR EN EL STATE
            const nuevaNota: Nota = {
                title: "", value: "", created_at: new Date().toISOString(),
            };
            setNota(nuevaNota);
            setOriginalNota(nuevaNota);
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
            nota?.title !== originalNota?.title 
            ||
            nota?.value !== originalNota?.value;

        if (!huboCambios) {
            // router.back(); // No hace falta guardar, solo volver
            return false;
        }
        if (id_P) {
            // SI INGRESO A UNA NOTA
            updateNote(db, {
                id: nota.id,
                title: nota.title.trim(),
                value: nota.value.trim(), 
                updated_at: new Date().toISOString(),
                created_at: nota.created_at,
            }) 
        } 
        else {
            // CREANDO NOTA E INSERTANDO EN LA BD
            let notaTitle = nota.title;
            const createDate = new Date();

            if (notaTitle.length === 0 && nota.value.length > 0) {
                // ESCRIBIÓ CONTENIDO PERO NO EL TÍTULO 
                notaTitle = getTodayDateLocal(createDate);  // titulo en formato 'es'
            }
            insertNote(db, {
                title: notaTitle.trim(),
                value: nota.value.trim(),
                created_at: createDate.toISOString(),   // to ISO String
            })
        }        
        cargarNotas();  // actualizar Flat List        
        return false;
    }

    return(
        <>
        <Stack.Screen 
            options={{
                header: () => 
                    <HeaderNotaEditor 
                        onPressBack={volverYGuardar} 
                        style={{marginTop: insets.top + 15}} 
                    />
            }}
        />

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

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        paddingHorizontal: 16,
    },
    textArea: {
        flex: 1, 
        textAlignVertical: "top",
    },
    text: {
        flex: 1,
        marginBottom: 20,
        fontSize: 22,
        paddingHorizontal: 40,
    },
})