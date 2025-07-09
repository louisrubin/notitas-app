import { Animated, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import { useEffect, useRef } from "react";
import { useNavigation } from "expo-router";

export default function SettingsScreen() {
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
                    Notitas
                </Animated.Text>
            ), 
            headerRight: () => (
                // Un view invisible del mismo ancho que el botón de retroceso
                <View style={{ width: 60 }} />
            ),
        });
    },[navigation, scrollY]);

    return(
        <View style={{ flex: 1, backgroundColor: Colors.light.background}}>
            <Animated.ScrollView
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true}
                )}
                scrollEventThrottle={16}
            >
                <View style={styles.container}>
                    
                    {/* HEADER */}
                    <View style={styles.header}>
                        <Text style={{fontSize: 30, fontWeight: 300 }}>Notitas</Text>
                    </View>



                    <View style={styles.header}>
                        <Text style={{fontSize: 30, textAlign: "center", height: 300, }}>Settings</Text>
                    </View>

                    <View style={styles.header}>
                        <Text style={{fontSize: 30, textAlign: "center", height: 300, }}>Settings</Text>
                    </View>

                    <View style={styles.header}>
                        <Text style={{fontSize: 30, textAlign: "center", height: 300, }}>Settings</Text>
                    </View>

                    
                </View>
            </Animated.ScrollView>
        </View>        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center", 
        paddingHorizontal: 20,
        alignContent: "center",
        backgroundColor: Colors.light.background,
    },
    header:{

    },
    body:{},
    footer:{},
})