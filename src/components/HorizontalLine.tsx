
import { View, StyleSheet } from "react-native";
import { useSettings } from "../hooks/SettingsContext";
import { Colors } from "../constants/colors";

// COMPONENTE PARA GENERAR UNA LINEA HORIZONTAL

interface LineProp {
    color?: string;
    grosor?: number;
    marginVertical?: number;
}

export default function HorizontalLine({ 
    color, 
    grosor = StyleSheet.hairlineWidth,
    marginVertical = 8,
} : LineProp) {
    const {theme} = useSettings();

    // ESTILOS
    const styles = StyleSheet.create({
        line: {
            height: grosor,
            backgroundColor: color ?? Colors[theme.value].lineColor,
            marginVertical: marginVertical,
            width: "100%",
            paddingHorizontal: 26,
        },
    })

    return (
        <View
            style={styles.line}
        />
    );
}
