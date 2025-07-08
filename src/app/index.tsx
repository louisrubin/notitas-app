import { StyleSheet, Text, View } from "react-native"
import { Colors } from "../constants/colors"

export default function Index(){

    return(
        <View style={styles.container}>
            <Text style={styles.text}>Notitas</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        
    },
    text: {
        textAlign: "center",
        color: Colors.light.text,
        fontSize: 25,
    }
})