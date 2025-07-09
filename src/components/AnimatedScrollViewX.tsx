import { useNavigation } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

interface Props {
    title: string;
    children: React.ReactNode;
}

export default function AnimatedScrollViewX( {title, children }: Props ){

    const scrollY = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();

    useEffect( () => {
        // poner contenido en el header del stack al hacer scroll
        navigation.setOptions({
            headerTitle: () => (
                <Animated.Text 
                    style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            textAlign: "center",
                            opacity: scrollY.interpolate({
                                inputRange: [10, 30],  // rango del scroll
                                outputRange: [0, 1],    // opacidad
                                extrapolate: "clamp",   // efecto de transición del texto
                            }),
                        }}
                >
                    { title }
                </Animated.Text>
            ), 
            headerRight: () => (
                // Un view invisible del mismo ancho que el botón de retroceso
                <View style={{ width: 60 }} />
            ),
        });
    },[navigation]);

    return(
        <Animated.ScrollView
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: true}
            )}
            scrollEventThrottle={16}
        >
            { children }
        </Animated.ScrollView>
    );
}