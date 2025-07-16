import { Nota } from "../hooks/SQLiteHooks"
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSettings } from "../hooks/SettingsContext";
import { FontSizeType, getFontSize } from "../constants/DropDownLists";
import { getFormattedDate } from "../hooks/DateFunctions";

interface Prop {
    listaNotas: Nota[];
}


export default function FlatListX( {listaNotas}: Prop ){
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

    // useEffect(()=> {
    //     getFormatedDate();
    // },[])

    return (
        <FlatList
            data={listaNotas}
            key={ isGridView ? "grid" : "list" } // forzar render al cambiar de modo

            keyExtractor={(item) => item.id.toString()}
            numColumns={ isGridView ? 2 : 1 } // cambia entre grid y lista            
            contentContainerStyle={{ padding: 13 }}     // cada item del Flat List

            renderItem={({ item }) => (
                // <View style={ isGridView ? styles.gridItem : styles.listItem}>
                //     <Text style={[ styles.title, { fontSize: getFontSize(fontSize.value)+2 } ]}>{item.title}</Text>
                //     <Text style={[styles.contentText, {fontSize: getFontSize(fontSize.value)}]}>{item.value}</Text>
                //     <Text style={[styles.date, {fontSize: getFontSize(fontSize.value) -3.5 }]}>{getFormattedDate(item.created_at)}</Text>
                // </View>
                isGridView 
                
                ? 
                    // GRID VIEW --> TRUE
                    <View style={styles.gridItem}>
                        <View style={styles.textContainerGrid}>
                            <Text numberOfLines={getNumberLinesGridView()} 
                                style={[styles.contentTextGrid, {fontSize: getFontSize(fontSize.value)}]}>
                                {item.value}
                            </Text>
                        </View>

                        <Text style={[styles.titleGrid, { fontSize: getFontSize(fontSize.value)+2 } ]}>
                            {item.title}
                        </Text>

                        <Text style={[ styles.dateGrid, {fontSize: getFontSize(fontSize.value) -3.5 }]}>
                            {getFormattedDate(item.created_at)}
                        </Text>
                    </View>

                :
                    // LIST VIEW --> FALSE
                    <View style={[styles.listItem, {height: getHeightListView()}]}>
                        <Text style={[ styles.titleList, { fontSize: getFontSize(fontSize.value)+2 } ]}>{item.title}</Text>
                        <Text numberOfLines={3} 
                            style={[styles.contentTextList, {fontSize: getFontSize(fontSize.value)}]}>
                                {item.value}
                        </Text>
                        <Text style={[styles.dateList, {fontSize: getFontSize(fontSize.value) -3.5 }]}>{getFormattedDate(item.created_at)}</Text>
                    </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    // gridItem: {
    //     flex: 1,
    //     margin: 5,
    //     paddingVertical: 10,
    //     paddingHorizontal: 13,
    //     backgroundColor: "#fff",
    //     borderRadius: 12,
    //     // para cuadrícula uniforme
    //     maxWidth: "48%",
    // },
    gridItem:{
        flex: 1,
        height: 290,
        maxWidth: "46%",
        margin: 8,
        marginBottom: 25,
    },
    listItem: {
        flex: 1,
        marginVertical: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: "#fff",
        borderRadius: 12,
    },

    titleGrid: {
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 10,
        marginBottom: 3,
    },
    titleList:{
        marginBottom: 10,
        fontWeight: "bold",
    },
    contentTextGrid: {
        // flex: 1,
        color: "#4B5563", 
    },
    contentTextList: {
        flex: 1,
        color: "#4B5563", 
    },

    textContainerGrid:{
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 13,
        backgroundColor: "#fff",
        borderRadius: 12,
    },

    dateGrid: {
        // paddingTop: 15,
        color: "#4B5563",
        textAlign: "center",
    },
    dateList: {
        paddingTop: 15,
        color: "#4B5563",
    },
});