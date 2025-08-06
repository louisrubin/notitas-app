import Animated, { interpolateColor, useAnimatedStyle, 
    useSharedValue, withTiming 
} from "react-native-reanimated";
import { useSettings } from "../hooks/SettingsContext";
import { Colors } from "../constants/colors";
import { useEffect } from "react";
import { StyleProp, ViewStyle } from "react-native";

const AnimatedViewContainer = Animated.View;    // creando Animated de tipo View

interface AnimatedProp {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}

export default function AnimatedBackgroundView({children, style}: AnimatedProp){
    const {theme} = useSettings();

    const transition = useSharedValue(theme.value === "dark" ? 0 : 1);

    useEffect( () => {
        // Transición suave al nuevo color
        transition.value = withTiming(theme.value === "dark" ? 0 : 1, {
            duration: 400,
        });
    }, [theme]);

    // ESTILOS DE TIPO useAnimatedStyle
    const animatedStyle = useAnimatedStyle( () => ({
        backgroundColor: interpolateColor(
            transition.value, 
            [0, 1], 
            [Colors["dark"].background, Colors["light"].background],
            'RGB',
            {
                gamma: 2.5,
            }
        ),
    }));

    return(
        <AnimatedViewContainer style={[animatedStyle, style]}>
            {children}
        </AnimatedViewContainer>
    )
}
