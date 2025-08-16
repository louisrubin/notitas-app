import { BackHandler, ScrollView, StyleSheet, TextInput, 
    ToastAndroid, useWindowDimensions, View } from "react-native";
import { getNoteByID, insertNote, Nota, updateNote } from "../../hooks/SQLiteHooks";
import { Stack, useLocalSearchParams } from "expo-router";
import { getFontSize } from "../../constants/DropDownLists";
import { useSettings } from "../../hooks/SettingsContext";
import HorizontalLine from "../../components/HorizontalLine";
import { useEffect, useState } from "react";
import { useNotes } from "../../hooks/NotesContext";
import HeaderNavigation from "../../components/HeaderNavigation";
import { getTodayDateLocal } from "../../hooks/DateFunctions";
import { useSQLiteContext } from "expo-sqlite";
import { Colors } from "../../constants/colors";
import ButtonTransparent from "../../components/buttons/ButtonTransparent";
import ModalConfirmacion from "../../components/ModalConfirmacion";

export default function NotaDetailScreen() {
    const params = useLocalSearchParams();
    const [idP, setIdP] = useState(params.id_P ?? null); // estado para poder actualizar

    const { fontSize, theme, saveAuto } = useSettings();
    const { cargarNotas } = useNotes();
    const db = useSQLiteContext();

    const [nota, setNota] = useState<Nota | null>(null);
    const [originalNota, setOriginalNota] = useState<Nota | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [huboCambios, setHuboCambios] = useState(false);

    const { height } = useWindowDimensions();
    const fontSizeValue = getFontSize(fontSize.value);
    const ColorTheme = Colors[theme.value];     // simplificar llamado en cada lugar

    useEffect( () => {
        // FUNCT PARA OBTENER DATOS DE LA NOTA SELECCIONADA
        const cargarNota = async () => {
            const nota = await getNoteByID(db, Number(idP));
            setNota(nota);  // setea en State
            setOriginalNota(nota);      // State copia para verif hubo cambios 
        }

        if (idP) {
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
        // HANDLER DEL 'VOLVER ATRAS' PARA EJECUTAR EL GUARDADO
        const volverHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            volverYGuardar
        );       

        return () => volverHandler.remove();    // elimina el event listener
    }, [nota, originalNota]);

    function handleChangeText(campo: keyof Nota, value: string) {
        // MANEJADOR DE LOS INPUT's AL MODIFICAR EL CONTENIDO
        setNota(
            prev =>
                prev
                    ? { ...prev, [campo]: value }   // copia todos los campos anterior 
                                                    // y actualiza solo [campo]
                    : prev
        );

        // VERIFICA CAMBIOS Y SETEA EL STATE
        // Usar el valor nuevo para la comparación
        const verifCambios =  // boolean
            (campo === "title" ? value : nota?.title) !== originalNota?.title ||
            (campo === "value" ? value : nota?.value) !== originalNota?.value;
        
        setHuboCambios(verifCambios);
    }

    async function Guardar_Crear_Nota() {
        // SI HUBO CAMBIOS GUARDA EN BD SINO NADA  
        if (!huboCambios) return;

        try {
            if (idP) {
                // SI INGRESO A UNA NOTA (SU ID != NULL)
                updateNote(db, {
                    id: nota.id,
                    title: nota.title.trim(),
                    value: nota.value.trim(), 
                    updated_at: new Date().toISOString(),
                    created_at: nota.created_at,
                })
            } 
            else {  // NO HAY ID --> NULL
                // CREANDO NOTA E INSERTANDO EN LA BD
                let notaTitle = nota.title;
                const createDate = new Date();

                if (notaTitle.length === 0 && nota.value.length > 0) {
                    // ESCRIBIÓ CONTENIDO PERO NO EL TÍTULO 
                    notaTitle = getTodayDateLocal(createDate);  // titulo en formato 'es'
                }

                const nuevoID = await insertNote(db, {
                    title: notaTitle.trim(),
                    value: nota.value.trim(),
                    created_at: createDate.toISOString(),   // to ISO String
                })

                // AL PASAR DE CREAR A EDITAR SIN SALIR DE LA VIEW PARA LUEGO 'updateNote'
                if (nuevoID) {
                    setIdP(String(nuevoID)); // a string
                    setNota( (prev) => ({
                        ...prev, id: nuevoID,   // ahora la nota también tiene el id correcto
                    }))
                }
            }
        } catch (error) {
            console.log("error en Guardar_Crear_Nota", error);
        } finally{
            cargarNotas();  // NotesContext --> actualizar Flat List
        }
    }

    // Handler específico para hardwareBackPress
    function volverYGuardar(): boolean {
        Guardar_Crear_Nota();
        return false;
    }

    function handleSaveButton(){
        // LOGICA AL PRESIONAR BOTON DE 'GUARDAR'
        try {
            Guardar_Crear_Nota();
            setOriginalNota(nota);
            setHuboCambios(false);   // resetea el state como 'sin cambios nuevos'
            ToastAndroid.show("Nota guardada.", ToastAndroid.SHORT);
        } catch (error) {
            ToastAndroid.show("Hubo un error al guardar.", ToastAndroid.SHORT);
        }
    }

    return(
        <>
        <Stack.Screen 
            options={{
                header: () => <HeaderNavigation onPressBack={volverYGuardar} >
                    {
                        !saveAuto && (
                            <ButtonTransparent text="Guardar" 
                            onPress={handleSaveButton} 
                            disabled={!huboCambios}
                        />
                        )
                    }
                </HeaderNavigation>
            }}
        />

        <View style={[styles.container, {backgroundColor: ColorTheme.background}]}>

            {/* TITULO */}
            <TextInput 
                numberOfLines={1}
                placeholder="Título"
                placeholderTextColor={ColorTheme.placeholder}
                maxLength={40}
                style={{ fontSize: fontSizeValue, color: ColorTheme.text, }}
                onChangeText={ (input) => { handleChangeText("title", input) }}
            >
                { nota?.title }
            </TextInput>

            <HorizontalLine color={ColorTheme.lineColor} />

            {/* EDITOR DE NOTA */}
            <ScrollView 
                style={{flex: 1}}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <TextInput
                    multiline 
                    placeholder="Escribe tu notita..."
                    placeholderTextColor={ColorTheme.placeholder}

                    style={[styles.textArea, {
                        fontSize: fontSizeValue * 0.8, 
                        lineHeight: fontSizeValue * 1.2, 
                        minHeight: height * 0.4,    // altura minima
                        color: ColorTheme.text,
                    }]}
                    onChangeText={ (input) => { handleChangeText("value", input) }}
                >
                    { nota?.value }
                </TextInput> 

                <View style={{height: height * 0.3}} />
            </ScrollView>
            
        </View>

        {/* MODAL CONFIRMAR GUARDADO O DESCARTAR */}
        <ModalConfirmacion 
            title="Hay cambios sin guardar. ¿Desea guardar?"
            confirmText="Guardar"

            visible={showModal}
            setVisible={setShowModal} 
        />

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        paddingHorizontal: 20,
    },
    textArea: {
        flex: 1, 
        textAlignVertical: "top",
    },
})