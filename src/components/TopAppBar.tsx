import { StyleSheet, Text, View, ViewStyle } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import ButtonSettings from "./ButtonSettings";
import { router } from "expo-router";
import { useState } from "react";

interface Prop {
    selectState?: boolean;
    cantNotas?: number;
}

export default function TopAppBar( {selectState, cantNotas}: Prop){
    const [isChecked, setIsChecked] = useState(false);  // check del icono
    

    const handleToggle = () => {
        return setIsChecked(!isChecked);    // para manejador de icono
    }

    const SelectAllIcon = ( {cantNotas, styleParam}: Prop & { styleParam?: ViewStyle} ) => {
        return(
            <ButtonSettings 
            onPress={handleToggle}
            >
                <View style={[styleParam, {flexDirection: "row", alignItems: "center",}]}>
                    <Ionicons 
                    name={isChecked ? "radio-button-on" : "radio-button-off"} 
                    size={24} color="black"
                    />
                    <Text style={{paddingHorizontal: 5, fontSize: 20}}>
                        Todas ({cantNotas})
                    </Text>
                </View>
            </ButtonSettings>
        )
    }

    return(
        <View style={styles.container}>
            
            <SelectAllIcon 
                styleParam={ !selectState ? styles.invisible : null } 
                cantNotas={cantNotas} 
            />

            <ButtonSettings
            onPress={()=>{router.push("/settings")}} 
            >
                <AntDesign name="setting" size={24} color={"black"} />
            </ButtonSettings>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 12,
        flexDirection: "row",
        paddingTop: 10,

        // backgroundColor: "tomato",
        alignItems: "flex-end",     // bottom eje Y
        justifyContent: "space-between"
    },
    invisible: {
        opacity: 0, 
        pointerEvents: "none"
    }
});