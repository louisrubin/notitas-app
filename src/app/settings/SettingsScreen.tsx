import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import AnimatedScrollViewX from "../../components/AnimatedScrollViewX";
import HorizontalLine from "../../components/HorizontalLine";
import TitleX from "../../components/TitleX";
import SubtitleX from "../../components/SubtitleX";
import LabelWithDropdown from "../../components/LabelWithDropdown";
import { itemDesing, itemOrder, itemSizes } from "../../constants/DropDownLists";

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

                        <SubtitleX text="Estilo" />
                        {/* <TitleX text="Tamaño de fuente" /> */}
                        <LabelWithDropdown title="Tamaño de fuente" itemsList={itemSizes} zIndex={10} />
                        {/* <TitleX text="Ordenar por" /> */}
                        <LabelWithDropdown title="Ordenar" itemsList={itemOrder} zIndex={9} />
                        {/* <TitleX text="Diseño" /> */}
                        <LabelWithDropdown title="Diseño" itemsList={itemDesing} zIndex={8} />
                        
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