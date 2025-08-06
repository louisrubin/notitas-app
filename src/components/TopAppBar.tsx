import { StyleSheet, Text, View, ViewStyle } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import ButtonSettings from "./ButtonSettings";
import { router } from "expo-router";
import { useSettings } from "../hooks/SettingsContext";
import { Colors } from "../constants/colors";

interface Prop {
    selectState?: boolean;
    handleSelectState?: () => void;
    cantNotas?: number;
    deletingCount?: number;
    onToggleAll?: () => void;
}

export default function TopAppBar( { 
    selectState, 
    handleSelectState = () => {}, 
    cantNotas=0, 
    deletingCount, 
    onToggleAll
}: Prop){
    const allSelected = cantNotas > 0 && deletingCount === cantNotas;
    const {theme} = useSettings();

    const SelectAllIcon = ( {style}: Prop & { style?: ViewStyle} ) => {
        return(
            <View style={style}>
                <ButtonSettings 
                onPress={onToggleAll}
                bgColorPressed={Colors[theme.value].bgOnPressed}
                >
                    <View style={{flexDirection: "row", alignItems: "center",}}>
                        <Ionicons 
                        name={ allSelected ? "radio-button-on" : "radio-button-off"} 
                        size={24} color={ allSelected ? "red" : Colors[theme.value].text}
                        />
                        <Text style={{
                            paddingHorizontal: 5, fontSize: 20, 
                            color: Colors[theme.value].text,
                        }}>
                            Todas
                        </Text>
                    </View>
                </ButtonSettings>
            </View>            
        )
    }

    return(
        <View style={styles.container}>
            { selectState && (
                <Text style={[ styles.selectedText, {color: Colors[theme.value].text}
                ]}>
                    <Text style={{fontWeight: "600"}}>({deletingCount}) </Text>
                    seleccionados
                </Text>
                ) 
            }

            <SelectAllIcon 
                style={ !selectState ? styles.invisible : undefined }
            />

            <ButtonSettings
            onPress={ () => {
                router.push("/settings"); 
                handleSelectState();
            }} 
            bgColorPressed={Colors[theme.value].bgOnPressed}
            >
                <AntDesign name="setting" size={24} color={Colors[theme.value].text} />
            </ButtonSettings>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal: 12,
        flexDirection: "row",
        paddingTop: 10,
        alignItems: "flex-end",
        justifyContent: "space-between"
    },
    selectedText: {
        position: "absolute",
        textAlign: "center", 
        width: "100%",
        bottom: 6, // ButtonSettings --> container --> padding
        fontSize: 20,
        // backgroundColor: "tomato",
    },
    invisible: {
        opacity: 0, 
        pointerEvents: "none"
    }
});