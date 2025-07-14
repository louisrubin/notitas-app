import { StyleSheet, Text, TextStyle } from "react-native";

interface Prop {
    text: string;
    style?: TextStyle;
}

export default function SubtitleX( {text, style}: Prop ) {
    return(
        <Text style={[styles.subtitulos, style]}>
            { text }
        </Text>
    )
}

const styles = StyleSheet.create({
    subtitulos:{ 
        fontSize: 16,
        color: "#666",
        marginTop: 10,
        marginBottom: 6,
    },
})