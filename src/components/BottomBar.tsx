import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { useEffect, useRef } from "react";

interface BarProp {
    cantSelect?: number;
    visible?: boolean;
    onHidden?: () => void; 
}

export default function BottomBar( {cantSelect, visible, onHidden}: BarProp ) {
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
                    onHidden(); // indica al padre que puede desmontar
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
            <Pressable style={ ({pressed}) => [
                {
                    backgroundColor: pressed ? "rgba(255,255,255,0.3)" : null
                },
                styles.item,
            ]}
            hitSlop={15}
            >
                <Feather name="trash" size={24} color="white" />
                <Text style={{color: "white", fontSize: 15}}>Papelera</Text>
                <Text style={[styles.cantidad, cantSelect > 0 ? {backgroundColor: "tomato"} : null]}>
                    {cantSelect > 0 ? cantSelect : null}
                </Text>
            </Pressable>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        position: "absolute",   // posiciona en la parte inferior de la pantalla
        justifyContent: "center",
        alignItems: "center",
        height: 60,
        width: "100%",
        bottom: 0,
        backgroundColor: "black",
    },
    item: {
        // cada item dentro del container
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
    },
})