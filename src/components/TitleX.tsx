import { StyleSheet, Text, ViewStyle } from "react-native";

interface Prop {
    text: string;
    style?: ViewStyle;
}

export default function TitleX( {text, style}: Prop ) {
    return(
        <Text style={[
            style,
            styles.titulos
        ]}>
            { text }
        </Text>
    )
}

const styles = StyleSheet.create({    
    titulos: {
        fontSize: 18,
        fontWeight: "700",
        marginVertical: 18,
        // backgroundColor: "tomato"
    },
})