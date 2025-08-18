import { BackHandler, Keyboard, ScrollView, StyleSheet, TextInput, 
    ToastAndroid, useWindowDimensions, View } from "react-native";
import { getNextID, getNoteByID, insertNote, Nota, updateNote } from "../../hooks/SQLiteHooks";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { getFontSize } from "../../constants/DropDownLists";
import { useSettings } from "../../hooks/SettingsContext";
import HorizontalLine from "../../components/HorizontalLine";
import { useEffect, useState } from "react";
import { useNotes } from "../../hooks/NotesContext";
import HeaderNavigation from "../../components/HeaderNavigation";
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

    const [nota, setNota] = useState<Nota>({
            title: "",    // INICIALIZANDO NOTA VACIA
            value: "",
            created_at: new Date().toISOString(),
    });
    const [originalNota, setOriginalNota] = useState<Nota>(nota);

    const [showModal, setShowModal] = useState(false);
    const [huboCambios, setHuboCambios] = useState(false);

    const { height } = useWindowDimensions();
    const fontSizeValue = getFontSize(fontSize.value);
    const ColorTheme = Colors[theme.value];     // simplificar llamado en cada lugar

    useEffect( () => {
        // FUNCT PARA OBTENER DATOS DE LA NOTA SELECCIONADA
        const cargarNota = async () => {

            //  SI HAY ID (nota existente) CARGAR SU INFO DESDE LA BD
            if (idP) {
                const nota = await getNoteByID(db, Number(idP));
                setNota(nota);  // setea en State
                setOriginalNota(nota);      // State copia para verif hubo cambios 
            }
            //  CREANDO NOTA NUEVA (NO HAY id_P)
            else{
                const siguienteID = await getNextID(db);
                setNota( (prev) => ({
                    ...prev, id: siguienteID,   // setea el State con el sig ID en bd
                }))
            }
        }

        cargarNota();
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

    async function GuardarCrearNota() {
        // SI HUBO CAMBIOS GUARDA EN BD SINO NADA  
        if (!huboCambios) return;

        try {
            if (idP) {
                // SI INGRESO A UNA NOTA (SU ID != NULL)
                updateNote(db, {
                    id: nota.id,
                    title: nota.title?.trim(),
                    value: nota.value?.trim(), 
                    updated_at: new Date().toISOString(),
                    created_at: nota.created_at,
                })
            } 
            else {  // NO HAY ID --> NULL
                // CREANDO NOTA E INSERTANDO EN LA BD
                const addedRowID = await insertNote(db, {
                    title: nota.title?.trim(),
                    value: nota.value?.trim(),
                    created_at: nota.created_at,
                })

                // AL PASAR DE CREAR A EDITAR SIN SALIR DE LA VIEW PARA LUEGO 'updateNote'
                if (addedRowID) {
                    setIdP(String(addedRowID)); // guarad el state el nuevo ID
                }
            }
        } catch (error) {
            console.log("error en GuardarCrearNota", error);
        } finally{
            cargarNotas();  // NotesContext --> actualizar Flat List
        }
    }

    // Handler específico para hardwareBackPress
    function volverYGuardar(): boolean {
        // GUARDADO NO AUTO Y HUBO CAMBIOS --> MOSTRAR MODAL CONFIRMACION
        Keyboard.dismiss(); // CERRAR TECLADO
        if (!saveAuto && huboCambios) {
            setShowModal(true);
            return true;
        }
        GuardarCrearNota();
        router.back();
        return true;
    }

    function handleSaveButton(){
        // LOGICA AL PRESIONAR BOTON DE 'GUARDAR'
        try {
            GuardarCrearNota();
            setOriginalNota(nota);
            setHuboCambios(false);   // resetea el state como 'sin cambios nuevos'
            ToastAndroid.show("Nota guardada.", ToastAndroid.SHORT);
        } catch (error) {
            ToastAndroid.show("Hubo un error al guardar.", ToastAndroid.SHORT);
        }
    }

    function handleModalConfirmAutoSave(){
        GuardarCrearNota();
        router.back();
    }

    return(
        <>
        <Stack.Screen 
            options={{
                header: () => 
                    <HeaderNavigation 
                        onPressBack={volverYGuardar} 
                        routerBack={false} // hace back en 'volverYGuardar'
                    >
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
                placeholder={ nota.title?.length > 0
                    ? nota.title
                    : `Notita ${nota.id}`
                }
                placeholderTextColor={ColorTheme.placeholder}
                maxLength={40}
                style={{ fontSize: fontSizeValue, color: ColorTheme.text, }}
                onChangeText={ (input) => { handleChangeText("title", input) }}

                value={ nota?.title }
            />

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
            cancelText="No guardar"
            colorCancelText={"tomato"}

            visible={showModal}
            setVisible={setShowModal} 

            onConfirm={handleModalConfirmAutoSave}
            onCancel={ () => {router.back() } }
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