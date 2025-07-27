import { OpaqueColorValue, Pressable, StyleSheet } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface CreateProp {
    zIndex?: number;
    onPress?: () => void;
    iconColor?: string | OpaqueColorValue;
    iconSize?: number;
}

export default function ButtonCreateNote({
    zIndex = 60,
    onPress = () => {},
    iconColor = "tomato",
    iconSize = 36,
} : CreateProp) {

    return(
        <Pressable
        style={ ({pressed}) => [
            estilos.container,
            {
                backgroundColor: pressed ? "#D6D390" : "#D6D3D1",
                zIndex: zIndex,
            }
        ]}
        onPress={onPress}
        >
            <MaterialCommunityIcons 
                name="pencil-plus" 
                size={iconSize} 
                color={iconColor}
            />
        </Pressable>
    )
}

const estilos = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 70,
        right: 25,

        padding: 15,
        borderRadius: 60,

        // SOMBREADO
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    }
})