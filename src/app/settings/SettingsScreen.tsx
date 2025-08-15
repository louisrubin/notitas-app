import { StyleSheet, Text, View } from "react-native";
import AnimatedScrollViewX from "../../components/AnimatedScrollViewX";
import HorizontalLine from "../../components/HorizontalLine";
import SubtitleX from "../../components/SubtitleX";
import LabelWithDropdown from "../../components/Label/LabelWithDropdown";
import LabelWithNavigation from "../../components/Label/LabelWithNavigation";
import { router, Stack } from "expo-router";
import { useSettings } from "../../hooks/SettingsContext";
import { Colors } from "../../constants/colors";
import AnimatedBackgroundView from "../../components/AnimatedView";
import HeaderNavigation from "../../components/HeaderNavigation";
import LabelWithSwitch from "../../components/Label/LabelWithSwitch";

export default function SettingsScreen() {
    const { theme, cambiarSetting, saveAuto } = useSettings();
    const ColorTheme = Colors[theme.value];    

    function handleSaveAutoSwitch(){
        // LOGICA PARA EL SWITCH DE 'AUTO SAVE' DE NOTAS
        cambiarSetting("saveAuto", !saveAuto);
    }
    
    return(
        <>
        <Stack.Screen 
            options={{
                header: () => <HeaderNavigation />
            }} 
        />
        
        <AnimatedBackgroundView style={{flex: 1}}>
            <AnimatedScrollViewX title="Notitas">

                <View style={{flex: 1}}>
                    
                    {/* HEADER */}
                    <View>
                        <Text style={[styles.headerTitle, {color: ColorTheme.text}]}>
                            Notitas
                        </Text>
                    </View>

                    {/* BODY */}
                    <View style={{paddingHorizontal: 26}}>
                        {/* label's sin navigation */}
                        <SubtitleX text="Estilo" />
                        <LabelWithDropdown 
                            id="1"
                            title="Tamaño de fuente"
                            settingKey="fontSize"
                            zIndex={10} 
                        />
                        <LabelWithDropdown 
                            id="2"
                            title="Ordenar por" 
                            settingKey="orderBy"
                            zIndex={9} 
                        />     
                        <LabelWithDropdown 
                            id="3"
                            title="Tema"
                            settingKey="theme"
                            zIndex={8} 
                        />   
                        <LabelWithDropdown 
                            id="4"
                            title="Diseño"
                            settingKey="designBy"
                            zIndex={7} 
                        />
                    </View>        
                    
                    <HorizontalLine color={ColorTheme.lineColor} />

                    <SubtitleX text="Guardado" style={{paddingHorizontal: 26}} />
                    <LabelWithSwitch 
                        value={saveAuto} 
                        onValueChange={handleSaveAutoSwitch}
                        title="Guardado automático" 
                        styleContainer={{paddingHorizontal: 26,}}
                    />

                    <HorizontalLine color={ColorTheme.lineColor} />

                    <SubtitleX text="Eliminados" style={{paddingHorizontal: 26}} />
                    <LabelWithNavigation 
                        title="Papelera" 
                        onPress={() => { router.replace("trash"); }}
                    />

                    <HorizontalLine color={ColorTheme.lineColor} />

                    <SubtitleX text="OTROS" style={{paddingHorizontal: 26}} />
                    <LabelWithNavigation 
                        title="Política de Privacidad" 
                        onPress={() => { router.push("policies"); }}
                    />
            
                </View>
            </AnimatedScrollViewX>
        </AnimatedBackgroundView>    
        </>    
    )
}

const styles = StyleSheet.create({
    headerTitle:{
        fontSize: 30, 
        fontWeight: 400, 
        marginBottom: 14, 
        paddingHorizontal: 26, 
        // backgroundColor: "tomato"
    },
})