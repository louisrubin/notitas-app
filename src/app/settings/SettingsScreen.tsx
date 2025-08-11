import { StyleSheet, Text, View } from "react-native";
import AnimatedScrollViewX from "../../components/AnimatedScrollViewX";
import HorizontalLine from "../../components/HorizontalLine";
import SubtitleX from "../../components/SubtitleX";
import LabelWithDropdown from "../../components/LabelWithDropdown";
import LabelWithNavigation from "../../components/LabelWithNavigation";
import { router, Stack } from "expo-router";
import { useSettings } from "../../hooks/SettingsContext";
import { Colors } from "../../constants/colors";
import AnimatedBackgroundView from "../../components/AnimatedView";
import HeaderNotaEditor from "../../components/HeaderNotaEditor";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SettingsScreen() {
    const { theme } = useSettings();
    const ColorTheme = Colors[theme.value];
    const insets = useSafeAreaInsets();
    
    return(
        <>
        <Stack.Screen 
            options={{
                headerTintColor: Colors[theme.value].text,
                header: () => 
                    <HeaderNotaEditor 
                        style={{paddingTop: insets.top + 15}} 
                    />
            }} 
        />
        
        <AnimatedBackgroundView style={{flex: 1, paddingTop: 10}}>
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

                    <SubtitleX text="Eliminados" style={{paddingHorizontal: 26}} />
                    <LabelWithNavigation 
                        title="Papelera" 
                        onPress={() => { router.replace("trash"); }}
                    />

                    <HorizontalLine color={ColorTheme.lineColor} />

                    <SubtitleX text="OTROS" style={{paddingHorizontal: 26}} />
                    <LabelWithNavigation 
                        title="Política de Privacidad" 
                        onPress={() => { router.back(); }}
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
    },
})