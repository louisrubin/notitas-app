import { Nota } from "../hooks/SQLiteHooks"
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useSettings } from "../hooks/SettingsContext";
import { FontSizeType, getFontSize } from "../constants/DropDownLists";
import { getFormattedDate } from "../hooks/DateFunctions";
import ButtonCheck from "./ButtonCheck";
import { router } from "expo-router";

interface FlatListXProps {
    listaNotas: Nota[];     // toda la info de cada nota
    selectingMode?: boolean;
    setSelectingMode?: () => void;
    deletingList?: number[];
    handleToggleDeleteOne?: (id: number) => void; 
}

export default function FlatListX( {
    listaNotas, 
    selectingMode,
    setSelectingMode,
    deletingList, 
    handleToggleDeleteOne
}: FlatListXProps ){

    const { designBy, fontSize } = useSettings();
    const isGridView = designBy.value === "grid";   // verif el modo selected grid | list
    
    const getHeightListView = () : number => {
        // get Height From Font Size para la List View
        const sizeMap: Record<FontSizeType, number> = {
            "small": 120,
            "medium": 130,
            "big": 150,
            "bigger": 160,
        }
        return sizeMap[fontSize.value];
    }
    const getNumberLinesGridView = () : number => {
        // obtener el num de lineas para el <Text> de la vista Grid
        const sizeMap: Record<FontSizeType, number> = {
            "small": 17,
            "medium": 14,
            "big": 12,
            "bigger": 10
        }
        return sizeMap[fontSize.value];
    }

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

            onPress={ () => selectingMode? handleToggleDeleteOne(nota.id) 
                : router.push({
                    pathname: "/nota/NotaDetailScreen",
                    params:{
                        id: nota.id,
                        title: nota.title,
                        value: nota.value,
                        created_at: nota.created_at,
                    }
                })
            }
            onLongPress={
                () => {
                    if(!selectingMode){
                        setSelectingMode();
                        handleToggleDeleteOne(nota.id);
                    }
                }
            }
            />
        )
    }

    return (
        <FlatList
            data={listaNotas}
            key={ isGridView ? "grid" : "list" } // forzar render al cambiar de modo

            keyExtractor={ (item) => item.id.toString()}
            numColumns={ isGridView ? 2 : 1 } // cambia entre grid y lista            
            contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 105 }} // container del FlatList

            renderItem={({ item }) => (

                isGridView 
                ? 
                    // GRID VIEW --> TRUE
                    <View style={[stylesGrid.item, ]}>
                        <ButtonCheck
                        color={"red"} 
                        style={[stylesGrid.button, selectingMode? {opacity: 1}: {opacity: 0}]}
                        isChecked={deletingList.includes(item.id)}
                        // onPress={ () => {handleToggleDeleteOne(item.id)}}
                        />
                        
                        <View style={stylesGrid.textContainer}>

                            <OverlayPressable nota={item} />

                            <Text numberOfLines={getNumberLinesGridView()}
                                style={[stylesGrid.contentText, {fontSize: getFontSize(fontSize.value)}]}>
                                {item.value}
                            </Text>
                        </View>

                        <Text numberOfLines={1} style={[stylesGrid.title, { fontSize: getFontSize(fontSize.value) +2 } ]}>
                            {item.title}
                        </Text>

                        <Text style={[ stylesGrid.date, {fontSize: getFontSize(fontSize.value) -3.5 }]}>
                            {getFormattedDate(item.created_at)}
                        </Text>
                    </View>

                :
                    // LIST VIEW --> FALSE
                    <View style={[stylesList.item, {height: getHeightListView()}]}>
                        <ButtonCheck
                        color={"red"} 
                        style={[stylesGrid.button, selectingMode? {opacity:1}: {opacity:0}]}
                        isChecked={deletingList.includes(item.id)}
                        // onPress={ () => {handleToggleDeleteOne(item.id)}}
                        />

                        <OverlayPressable nota={item} />

                        <Text style={[ stylesList.title, { fontSize: getFontSize(fontSize.value)+2 } ]}>{item.title}</Text>
                        <Text numberOfLines={3} 
                            style={[stylesList.contentText, {fontSize: getFontSize(fontSize.value)}]}>
                                {item.value}
                        </Text>
                        <Text style={[stylesList.date, {fontSize: getFontSize(fontSize.value) -3.5 }]}>{getFormattedDate(item.created_at)}</Text>
                    </View>
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
        // flex: 1,
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

    date: {
        // paddingTop: 15,
        color: "#4B5563",
        textAlign: "center",
    },
});

const stylesList = StyleSheet.create({
    item: {
        flex: 1,
        position: "relative", 
        marginVertical: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: "#fff",
        borderRadius: 12,
    },
    title:{
        marginBottom: 10,
        fontWeight: "bold",
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
