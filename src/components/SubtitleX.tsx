import { StyleSheet, Text } from "react-native";

interface Prop {
    text: string;
}

export default function SubtitleX( {text}: Prop ) {
    return(
        <Text style={styles.subtitulos}>
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