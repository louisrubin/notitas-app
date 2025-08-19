import { Pressable, StyleSheet, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

interface ButtonProp {
    /**
     * Nombre del ícono a mostrar según Feather.
     * Ejemplo: "trash-2", "rotate-ccw", "camera".
     * Ver https://icons.expo.fyi/Index
     */
    // restringe a solo nombres válidos de Feather
    iconName: React.ComponentProps<typeof Feather>["name"]; 
    name: string;
    cantSelected?: number;
    onPress?: () => void;
}

export default function BottomBarButton({
    iconName,
    name,
    cantSelected = 0,
    onPress = () => {},
}: ButtonProp){

    return(
        <Pressable style={ ({pressed}) => [
            {
                backgroundColor: pressed ? "rgba(255,255,255,0.3)" : null
            },
            styles.container,
        ]}
        hitSlop={15}
        onPress={onPress}
        >
            <Feather name={iconName} size={24} color="white" />
            <Text style={{color: "white", fontSize: 15}}>{name}</Text>
            {
                // al menos 1 seleccionado --> visible
                cantSelected > 0 && (
                <Text style={styles.cantidad}>
                    {cantSelected}
                </Text>
                )
            }
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 8,
        // backgroundColor: "tomato"
    },
    cantidad: {
        // indicador de cantidad seleccionada
        textAlign: "center",
        fontSize: 15,
        position: "absolute",
        right: 0,
        top: 0,
        borderRadius: 16,
        paddingHorizontal: 5,
        backgroundColor: "tomato"
    },
})