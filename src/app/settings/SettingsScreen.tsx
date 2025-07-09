import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import AnimatedScrollViewX from "../../components/AnimatedScrollViewX";
import HorizontalLine from "../../components/HorizontalLine";

export default function SettingsScreen() {    

    return(
        <View style={{ flex: 1, backgroundColor: Colors.light.background}}>
            <AnimatedScrollViewX title="Notitas">

                <View style={styles.container}>
                    
                    {/* HEADER */}
                    <View style={styles.header}>
                        <Text style={{fontSize: 30, fontWeight: 400, marginBottom: 14 }}>Notitas</Text>
                    </View>

                    {/* BODY */}
                    <View style={{  }}>
                        {/* <Text style={{ height: 400 }}>
                            Settings
                        </Text>
                        
                        <Text style={{ height: 400 }}>
                            Settings
                        </Text>
                        <Text style={{ height: 400 }}>
                            Settings
                        </Text> */}

                        <Text style={styles.subtitulos}>
                            Estilo
                        </Text>

                        <Text style={styles.titulos}>
                            Tamaño de fuente
                        </Text>

                        <Text style={styles.titulos}>
                            Ordenar por
                        </Text>

                        <Text style={styles.titulos}>
                            Diseño
                        </Text>

                        <Text style={styles.titulos}>
                            Color
                        </Text>
                        
                        <HorizontalLine />

                        <Text style={styles.subtitulos}>
                            Eliminados
                        </Text>

                        <Text style={styles.titulos}>
                            Papelera
                        </Text>
                        
                        <HorizontalLine />

                        <Text style={styles.subtitulos}>
                            OTROS
                        </Text>

                        <Text style={styles.titulos}>
                            Política de Privacidad
                        </Text>

                    </View>

                    
                </View>
            </AnimatedScrollViewX>
        </View>        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 26,
        alignContent: "center",

        backgroundColor: Colors.light.background,
        // backgroundColor: "tomato",
    },
    header:{

    },
    subtitulos:{ 
        fontSize: 16,
        color: "#666",
        marginTop: 10,
        marginBottom: 6,
    },
    titulos: {        
        fontSize: 18,
        fontWeight: "700",
        marginVertical: 18,
    },
    body:{},
    footer:{},
})