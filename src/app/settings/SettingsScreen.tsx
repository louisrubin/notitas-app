import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import AnimatedScrollViewX from "../../components/AnimatedScrollViewX";
import HorizontalLine from "../../components/HorizontalLine";
import TitleX from "../../components/TitleX";
import SubtitleX from "../../components/SubtitleX";
import LabelWithDropdown from "../../components/LabelWithDropdown";
import { itemDesing, itemOrder, itemSizes } from "../../constants/DropDownLists";
import { useSettings } from "../../hooks/SettingsContext";

export default function SettingsScreen() {
    const { fontSize, orderBy, designBy } = useSettings();
    
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

                        <SubtitleX text="Estilo" />
                        <LabelWithDropdown title="Tamaño de fuente" 
                            settingKey="fontSize"
                            valueDefault={fontSize}
                            itemsList={itemSizes} zIndex={10} 
                        />
                        <LabelWithDropdown title="Ordenar" 
                            settingKey="orderBy"
                            valueDefault={orderBy} 
                            itemsList={itemOrder} zIndex={9} 
                        />
                        <LabelWithDropdown title="Diseño" 
                            settingKey="designBy"
                            valueDefault={designBy} 
                            itemsList={itemDesing} zIndex={8} 
                        />
                        
                        <HorizontalLine />

                        <SubtitleX text="Eliminados" />
                        <TitleX text="Papelera" />

                        <HorizontalLine />

                        <SubtitleX text="OTROS" />
                        <TitleX text="Política de Privacidad" />

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
    body:{},
    footer:{},
})