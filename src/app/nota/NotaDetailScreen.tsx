import { StyleSheet, Text, View } from "react-native";
import { Nota } from "../../hooks/SQLiteHooks";
import { useLocalSearchParams } from "expo-router";


export default function NotaDetailScreen() {
    const { title, value, created_at} = useLocalSearchParams();
    return(
        <View style={{flex:1, alignItems: "center", justifyContent: "center"}}>

            <Text style={[styles.text, styles.title]}>
                título: <Text>{title}</Text>
            </Text>


            <Text style={styles.text}>
                contenido: {value}
            </Text>

            
            <Text style={styles.text}>
                creado: {created_at}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        marginBottom: 20,
        fontSize: 22,
        paddingHorizontal: 40,
    },
    title: {
        fontWeight: "600",
    }
})