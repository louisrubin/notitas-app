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
                    <View>
                        <Text style={styles.headerTitle}>Notitas</Text>
                    </View>

                    {/* BODY */}
                    <View style={{paddingHorizontal: 26}}>
                        {/* label's sin navigation */}
                        <SubtitleX text="Estilo" />
                        <LabelWithDropdown 
                            title="Tamaño de fuente"
                            settingKey="fontSize"
                            valueDefault={fontSize}
                            zIndex={10} 
                        />
                        <LabelWithDropdown 
                            title="Ordenar por" 
                            settingKey="orderBy"
                            valueDefault={orderBy} 
                            zIndex={9} 
                        />
                        <LabelWithDropdown 
                            title="Diseño"
                            settingKey="designBy"
                            valueDefault={designBy} 
                            zIndex={8} 
                        />                        
                    </View>        

                    <HorizontalLine />

                    <SubtitleX text="Eliminados" style={{paddingHorizontal: 26}} />
                    <LabelWithNavigation 
                        title="Papelera" 
                        onPress={() => { router.back();
                        }}
                    />

                    <HorizontalLine />

                    <SubtitleX text="OTROS" style={{paddingHorizontal: 26}} />
                    <LabelWithNavigation 
                        title="Política de Privacidad" 
                        onPress={() => { router.back();
                        }}
                    />
            
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
    header:{},
    body:{},
    footer:{},
})