import { getAllRows, Nota } from "../hooks/SQLiteHooks"
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSettings } from "../hooks/SettingsContext";
import { getFontSize } from "../constants/DropDownLists";
import { useEffect } from "react";
import { getFormattedDate } from "../hooks/DateFunctions";

interface Prop {
    listaNotas: Nota[];
}

export default function FlatListX( {listaNotas}: Prop ){
    const { designBy, fontSize } = useSettings();
    const isGridView = designBy.value === "grid";   // verif el modo selected grid | list

    useEffect(()=> {
        // getFormatedDate();
    },[])

    return (
        <FlatList
            data={listaNotas}
            key={ isGridView ? "grid" : "list" } // forzar render al cambiar de modo

            keyExtractor={(item) => item.id.toString()}
            numColumns={ isGridView ? 2 : 1 } // cambia entre grid y lista
            
            contentContainerStyle={{ padding: 10 }}

            renderItem={({ item }) => (
                <View style={ isGridView ? styles.gridItem : styles.listItem}>
                    <Text style={[ styles.title, { fontSize: getFontSize(fontSize.value)+2 } ]}>{item.title}</Text>
                    <Text style={[styles.contentText, {fontSize: getFontSize(fontSize.value)}]}>{item.value}</Text>
                    <Text style={[styles.date, {fontSize: getFontSize(fontSize.value) -3.5 }]}>{getFormattedDate(item.created_at)}</Text>
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 5,
        paddingVertical: 10,
        paddingHorizontal: 13,
        backgroundColor: "#fff",
        borderRadius: 12,
        // para cuadrícula uniforme
        maxWidth: "48%",
    },
    listItem: {
        flex: 1,
        marginVertical: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: "#fff",
        borderRadius: 12,
    },

    title: {
        fontWeight: "bold",
        // fontSize: 21,
        marginBottom: 10,
    },
    contentText: {
        flex: 1, 
        color: "#4B5563", 
    },
    date: {
        paddingTop: 15,
        color: "#4B5563",
    }
});