import { Nota } from "../hooks/SQLiteHooks"
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSettings } from "../hooks/SettingsContext";
import { getFontSize } from "../constants/DropDownLists";
import { getDiffDate, getFormattedDate } from "../hooks/DateFunctions";
import ButtonCheck from "./ButtonCheck";
import { router } from "expo-router";
import Animated, { FadeInUp } from "react-native-reanimated";

interface FlatListXProps {
    listaNotas: Nota[];     // toda la info de cada nota
    selectingMode?: boolean;
    setSelectingMode?: () => void;
    deletingList?: number[];
    handleToggleDeleteOne?: (id: number) => void;// agregar-quitar el item pressed de la lista
    navigationOnPress?: boolean;
    trashView?: boolean;
}

export default function FlatListX( {
    listaNotas, 
    selectingMode,
    setSelectingMode,
    deletingList, 
    handleToggleDeleteOne,
    navigationOnPress = true,
    trashView = false,  // si está en pantalla 'Papelera'
}: FlatListXProps ){

    const { designBy } = useSettings();
    const isGridView = designBy.value === "grid";   // verif el modo selected grid | list
    const animation = FadeInUp.duration(400);

    const OverlayPressable = ( {nota}: {nota: Nota} ) => {
        // COMPONENTE OVERLAY SOBRE LAS NOTES -> NAVEGAR Y ACTIVAR EL MODO SELECCION
        return(
            <Pressable 
            style={ ({pressed}) => [
                stylesGrid.overlay,
                { backgroundColor: pressed
                    ? "rgba(0,0,0,0.1)" 
                    : null 
                },
            ] }
            // si está en Selecting agrega a la lista, si no navega a la ruta
            onPress={ () => selectingMode? handleToggleDeleteOne(nota.id) 
                : 
                navigationOnPress?   // verif si puede navegar para el router
                    router.push({
                        pathname: "/nota/NotaDetailScreen",
                        params:{
                            id_P: nota.id,
                        }
                    })
                : null
            }
            onLongPress={
                () => {
                    // si se pasaron las props y no están vacías
                    if(!selectingMode && setSelectingMode && handleToggleDeleteOne){
                        setSelectingMode();
                        handleToggleDeleteOne(nota.id);
                    }
                }
            }
            />
        )
    }

    return (
        <Animated.FlatList
            data={listaNotas}
            key={ isGridView ? "grid" : "list" } // forzar render al cambiar de modo

            keyExtractor={ (item) => item.id.toString()}
            numColumns={ isGridView ? 2 : 1 } // cambia entre grid y lista            
            contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 105 }} // container del FlatList

            renderItem={({ item }) => (

                isGridView
                ? 
                    // GRID VIEW --> TRUE
                    <Animated.View entering={ animation }
                    style={[stylesGrid.item, ]}
                    >
                        <ButtonCheck
                        color={"red"} 
                        style={[stylesGrid.button, selectingMode? {opacity: 1}: {opacity: 0}]}
                        isChecked={deletingList?.includes(item.id)}
                        />
                        
                        <View style={stylesGrid.textContainer}>

                            <OverlayPressable nota={item} />

                            <Text numberOfLines={14}
                                style={[stylesGrid.contentText, {fontSize: getFontSize(null)}]}>
                                {item.value}
                            </Text>
                            {
                                trashView ? 
                                <View style={stylesGrid.date_delete}>
                                    <Text style={stylesGrid.text_date_delete}>
                                        {getDiffDate(item.delete_date)}
                                    </Text>
                                </View>
                                
                                : null
                            }
                        </View>

                        <Text numberOfLines={1} 
                        style={[ stylesGrid.title, { fontSize: getFontSize(null) +2 } 
                        ]}>
                            {item.title}
                        </Text>

                        <Text 
                        style={[ stylesGrid.date_created, {fontSize: getFontSize(null) -3.5 }
                        ]}>
                            {getFormattedDate(item.created_at)}
                        </Text>
                    </Animated.View>

                :
                    // LIST VIEW --> FALSE
                    <Animated.View entering={ animation } 
                    style={ stylesList.item }
                    >
                        <ButtonCheck
                        color={"red"} 
                        style={[stylesGrid.button, selectingMode? {opacity:1}: {opacity:0}]}
                        isChecked={deletingList?.includes(item.id)}
                        />

                        <OverlayPressable nota={item} />

                        {/* HEADER LIST ITEM --> TITLE, CREATE_AT */}
                        <View style={stylesList.headerListItem}>
                            <Text style={{ flexShrink: 1, fontWeight: "bold", fontSize: getFontSize(null)+2 }}
                            numberOfLines={1}
                            >
                                {item.title}
                            </Text>
                            <Text style={{fontSize: getFontSize(null) -3.5, color: "#4B5563", marginLeft: 8 }}>
                                {getFormattedDate(item.created_at)}
                            </Text>
                        </View>
                        
                        <Text numberOfLines={4} 
                            style={[stylesList.contentText, {fontSize: getFontSize(null)}]}
                        >
                            {item.value}
                        </Text>
                        
                        {
                            trashView ? 
                            <View style={stylesGrid.date_delete}>
                                <Text style={stylesGrid.text_date_delete}>
                                    {getDiffDate(item.delete_date)}
                                </Text>
                            </View>
                            : null
                        }
                    </Animated.View>
            )}
        />
    );
}

const stylesGrid = StyleSheet.create({
    item:{
        flex: 1,
        position: "relative", 
        height: 290,
        maxWidth: "46%",
        margin: 8,
        marginBottom: 25,
        // backgroundColor: "tomato"
    },
    button: {
        // Grid && List
        position: "absolute", 
        top: 3, 
        left: 3, 
        zIndex: 50,
        backgroundColor: "rgba(220, 220, 220, 0.85)",
        borderRadius: 20,
    },
    overlay: {
        // Grid && List
        ...StyleSheet.absoluteFillObject, // { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
        zIndex: 55,
    },

    title: {
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 10,
        marginBottom: 3,
    },
    contentText: {
        flex: 1,
        color: "#4B5563", 
    },

    textContainer:{
        flex: 1,
        position: "relative", 
        paddingVertical: 10,
        paddingHorizontal: 13,
        backgroundColor: "#fff",
        borderRadius: 12,
    },
    date_created: {
        color: "#4B5563",
        textAlign: "center",
    },
    date_delete: {
        position: "absolute",
        alignItems: "center",   // X
        justifyContent: "center",   // Y
        bottom: 0,
        left: 0,
        right: 0,
        height: 25,
        
        borderBottomLeftRadius: 12,
        borderBottomEndRadius: 12,
        backgroundColor: "#ddd",
    },
    text_date_delete: {
        fontSize: 16, fontWeight: 600
    },
});

const stylesList = StyleSheet.create({
    item: {
        flex: 1,
        height: 120,
        position: "relative", 
        marginVertical: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: "#fff",
        borderRadius: 12,
    },
    headerListItem: {
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: 10,
    },
    contentText: {
        flex: 1,
        color: "#4B5563", 
    },
    date: {
        paddingTop: 15,
        color: "#4B5563",
    },
})
