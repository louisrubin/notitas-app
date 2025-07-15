import { getAllRows, Nota } from "../hooks/SQLiteHooks"
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSettings } from "../hooks/SettingsContext";
import { getFontSize } from "../constants/DropDownLists";

interface Prop {
    listaNotas: Nota[];
}

export default function FlatListX( {listaNotas}: Prop ){
    const { designBy, fontSize } = useSettings();
    const isGridView = designBy.value === "grid";   // verif el modo selected grid | list

    return (
        <FlatList
            data={listaNotas}
            key={ isGridView ? "grid" : "list" } // forzar render al cambiar de modo

            keyExtractor={(item) => item.id.toString()}
            numColumns={ isGridView ? 2 : 1 } // cambia entre grid y lista
            
            contentContainerStyle={{ padding: 10 }}
            renderItem={({ item }) => (

                <View style={ isGridView ? styles.gridItem : styles.listItem}>
                    <Text style={[ styles.title, { fontSize: getFontSize(fontSize.value) } ]}>{item.title}</Text>
                    <Text style={{ fontSize: getFontSize(fontSize.value) }}>{item.value}</Text>
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 5,
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 12,
        // para cuadrícula uniforme
        maxWidth: "48%",
    },
    listItem: {
        flex: 1,
        marginVertical: 5,
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 8,
    },
    title: {
        fontWeight: "bold",
        // fontSize: 21,
        marginBottom: 5,
    }
});