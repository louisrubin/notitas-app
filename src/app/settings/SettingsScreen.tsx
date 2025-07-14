import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import AnimatedScrollViewX from "../../components/AnimatedScrollViewX";
import HorizontalLine from "../../components/HorizontalLine";
import SubtitleX from "../../components/SubtitleX";
import LabelWithDropdown from "../../components/LabelWithDropdown";
import { useSettings } from "../../hooks/SettingsContext";
import LabelWithNavigation from "../../components/LabelWithNavigation";
import { router } from "expo-router";

export default function SettingsScreen() {
    const { fontSize, orderBy, designBy } = useSettings();
    
    return(
        <View style={{ flex: 1, backgroundColor: Colors.light.background}}>
            <AnimatedScrollViewX title="Notitas">

                <View style={styles.container}>
                    
                    {/* HEADER */}
                    <View style={null}>
                        <Text style={styles.headerTitle}>Notitas</Text>
                    </View>

                    {/* BODY */}
                    <View style={{  }}>

                        <SubtitleX text="Estilo" style={styles.subtitle} />
                        <LabelWithDropdown 
                            title="Tamaño de fuente" 
                            containerStyle={styles.subtitle}
                            settingKey="fontSize"
                            valueDefault={fontSize}
                            zIndex={10} 
                        />
                        <LabelWithDropdown 
                            title="Ordenar por" 
                            containerStyle={styles.subtitle}
                            settingKey="orderBy"
                            valueDefault={orderBy} 
                            zIndex={9} 
                        />
                        <LabelWithDropdown 
                            title="Diseño" 
                            containerStyle={styles.subtitle}
                            settingKey="designBy"
                            valueDefault={designBy} 
                            zIndex={8} 
                        />
                        
                        <HorizontalLine />

                        <SubtitleX text="Eliminados" style={styles.subtitle} />
                        <LabelWithNavigation 
                            title="Papelera" 
                            onPress={() => { router.back();
                            }}
                        />

                        <HorizontalLine />

                        <SubtitleX text="OTROS" style={styles.subtitle} />
                        <LabelWithNavigation 
                            title="Política de Privacidad" 
                            onPress={() => { router.back();
                            }}
                        />

                    </View>                    
                </View>
            </AnimatedScrollViewX>
        </View>        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        backgroundColor: Colors.light.background,
        // backgroundColor: "tomato",
    },
    headerTitle:{
        fontSize: 30, 
        fontWeight: 400, 
        marginBottom: 14, 
        paddingHorizontal: 26, 
    },
    subtitle: {
        paddingHorizontal: 26,
    },
    header:{},
    body:{},
    footer:{},
})