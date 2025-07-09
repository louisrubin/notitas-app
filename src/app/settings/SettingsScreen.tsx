import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";

export default function SettingsScreen() {
    return(
        <View style={styles.container}>

            <Text style={{fontSize: 30, textAlign: "center"}}>
                Settings
            </Text>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center", 
        alignContent: "center",
        backgroundColor: Colors.light.background,
    },
    header:{

    },
    body:{},
    footer:{},
})