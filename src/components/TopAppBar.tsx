import { StyleSheet, Text, View, ViewStyle } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import ButtonSettings from "./ButtonSettings";
import { router } from "expo-router";

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

    const SelectAllIcon = ( {style}: Prop & { style?: ViewStyle} ) => {
        return(
            <ButtonSettings 
            onPress={onToggleAll}
            bgColorPressed={"#ddd"}
            >
                <View style={[style, {flexDirection: "row", alignItems: "center",}]}>
                    <Ionicons 
                    name={ allSelected ? "radio-button-on" : "radio-button-off"} 
                    size={24} color={ allSelected ? "red" : "black"}
                    />
                    <Text style={{paddingHorizontal: 5, fontSize: 20}}>
                        Todas
                    </Text>
                </View>
            </ButtonSettings>
        )
    }

    return(
        <View style={styles.container}>
            { selectState 
                ? 
                    <Text style={[ styles.selectedText,
                        // !selectState ? {opacity:0} : null
                    ]}>
                        <Text style={{fontWeight: "600"}}>({deletingCount}) </Text>
                        seleccionados
                    </Text>
                : 
                    null    
            }            
            <SelectAllIcon 
                style={ !selectState ? styles.invisible : undefined }
            />
            <ButtonSettings
            onPress={ () => {
                router.push("/settings"); 
                handleSelectState();
            }} 
            bgColorPressed={"#ddd"}
            >
                <AntDesign name="setting" size={24} color={"black"} />
            </ButtonSettings>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal: 12,
        flexDirection: "row",
        paddingTop: 10,

        // backgroundColor: "tomato",
        alignItems: "flex-end",     // bottom eje Y
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