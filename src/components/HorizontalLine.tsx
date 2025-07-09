
import { View, StyleSheet } from "react-native";

export default function HorizontalLine({ color = "#aaa", grosor = StyleSheet.hairlineWidth, marginVertical = 8 }) {
    return (
        <View
            style={{
                height: grosor,
                backgroundColor: color,
                marginVertical,
                width: "100%",
            }}
        />
    );
}
