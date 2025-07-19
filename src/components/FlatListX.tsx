import { Nota } from "../hooks/SQLiteHooks"
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSettings } from "../hooks/SettingsContext";
import { FontSizeType, getFontSize } from "../constants/DropDownLists";
import { getFormattedDate } from "../hooks/DateFunctions";
import ButtonCheck from "./ButtonCheck";

interface FlatListXProps {
    listaNotas: Nota[];     // toda la info de cada nota
    deletingList?: number[];
    handleToggleDeleteOne?: (id: number) => void; 
}

export default function FlatListX( {listaNotas, deletingList, handleToggleDeleteOne}: FlatListXProps ){
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

    return (
        <FlatList
            data={listaNotas}
            key={ isGridView ? "grid" : "list" } // forzar render al cambiar de modo

            keyExtractor={(item) => item.id.toString()}
            numColumns={ isGridView ? 2 : 1 } // cambia entre grid y lista            
            contentContainerStyle={{ paddingHorizontal: 10 }}     // cada item del Flat List

            renderItem={({ item }) => (

                isGridView 
                ? 
                    // GRID VIEW --> TRUE
                    <View style={[stylesGrid.item, ]}>
                        <ButtonCheck
                        color={"red"} 
                        style={stylesGrid.button}
                        isChecked={deletingList.includes(item.id)}
                        onPress={ () => {handleToggleDeleteOne(item.id)}}
                        />
                        
                        <View style={stylesGrid.textContainer}>
                            
                            <Text numberOfLines={getNumberLinesGridView()} 
                                style={[stylesGrid.contentText, {fontSize: getFontSize(fontSize.value)}]}>
                                {item.value}
                            </Text>
                        </View>

                        <Text style={[stylesGrid.title, { fontSize: getFontSize(fontSize.value)+2 } ]}>
                            {item.title}
                        </Text>

                        <Text style={[ stylesGrid.date, {fontSize: getFontSize(fontSize.value) -3.5 }]}>
                            {getFormattedDate(item.created_at)}
                        </Text>
                    </View>

                :
                    // LIST VIEW --> FALSE
                    <View style={[stylesList.item, {height: getHeightListView()}]}>
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
        position: "absolute", 
        top: 3, 
        left: 3, 
        zIndex: 50,
        backgroundColor: "rgba(220, 220, 220, 0.85)",
        borderRadius: 20,
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
