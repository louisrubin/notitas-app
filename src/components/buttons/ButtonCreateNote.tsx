import { OpaqueColorValue, Pressable, StyleSheet } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useEffect } from "react";
import Animated, 
    { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { Colors } from "../../constants/colors";
import { useSettings } from "../../hooks/SettingsContext";

interface CreateProp {
    selectingMode?: boolean;
    zIndex?: number;
    onPress?: () => void;
    iconColor?: string | OpaqueColorValue;
    bgColor?: string | OpaqueColorValue;
    iconSize?: number;
}

const INITIAL_BOTTOM = 40;

export default function ButtonCreateNote({
    selectingMode = false,
    zIndex = 60,
    onPress = () => {},
    iconColor = "tomato",
    iconSize = 36,
    bgColor = "#D6D3D1",
} : CreateProp) {
    const { theme } = useSettings();
    const PositionBotAnimated = useSharedValue(INITIAL_BOTTOM);

    const animatedStyle = useAnimatedStyle( () => {
        // RETORNAR ESTILOS PARA EL COMPONENTE 'Animated'
        return {
            position: "absolute",
            bottom: PositionBotAnimated.value,
            right: 25,
        };
    })

    useEffect( () => {
        // ANIMACION AL MODO SELECTING
        if (selectingMode) {
            // AL ENTRAR EN MODO SELECTING
            PositionBotAnimated.value = withSpring(75, {
                damping: 40,
                stiffness: 150,
            });
        } 
        else {
            // AL SALIR DE MODO SELECTING
            PositionBotAnimated.value = withSpring(INITIAL_BOTTOM, {
                damping: 40,
                stiffness: 150,
            });
        }
    }, [selectingMode])
    
    return(
        <Animated.View style={[estilos.container, animatedStyle, { zIndex }]}>
            <Pressable
                style={({ pressed }) => ({
                    backgroundColor: pressed 
                        ? Colors[theme.value].bgPressedCreateButton 
                        : bgColor,
                    padding: 15,
                    borderRadius: 60,
                })}
                onPress={onPress}
            >
                <MaterialCommunityIcons 
                name="pencil-plus" 
                size={iconSize} 
                color={iconColor}
                />
            </Pressable>
        </Animated.View>
    )
}

const estilos = StyleSheet.create({
    container: {
        borderRadius: 60,

        // SOMBREADO
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    }
})