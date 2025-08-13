import { Animated, StyleSheet } from "react-native";
import React, { useEffect, useRef } from "react";

interface BottomBarProp {
    children: React.ReactNode;
    visible: boolean;
    onHidden: () => void;
}

export default function BottomBar( {
    children,
    visible, // indica cuando iniciar animacion entrada/salida
    onHidden, // indica al padre que puede desmontar
}: BottomBarProp ) {

    const translateY = useRef(new Animated.Value(100)).current; // Comienza fuera de pantalla abajo
    const opacity = useRef(new Animated.Value(0)).current;      // Comienza invisible

    useEffect( () => {
        if (visible) {
            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();     // iniciar
        } 
        else {
            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: 100,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start(
                () => {
                    onHidden(); // indica al padre que puede desmontar al terminar animacion
                }
            );
        }
    }, [visible]);

    return(
        <Animated.View style={[
            styles.container,
            {
                transform: [{translateY}],
                opacity,
            },
        ]}
        >
            {
                children
            }
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        position: "absolute",   // posiciona en la parte inferior de la pantalla
        height: 60,
        width: "100%",
        bottom: 0,

        justifyContent: "center",
        gap: 60,
        alignItems: "center",
        backgroundColor: "#121212",
    },
})