import { StyleSheet, Text, View, ViewStyle } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import ButtonSettings from "./ButtonSettings";
import { router } from "expo-router";
import { useState } from "react";

interface Prop {
    selectState?: boolean;
    cantDeleting?: number;
}

export default function TopAppBar( {selectState, cantDeleting}: Prop){
    const [isChecked, setIsChecked] = useState(false);  // check del icono

    const handleToggle = () => {
        return setIsChecked(!isChecked);    // para manejador de icono
    }

    const SelectAllIcon = ( {style}: Prop & { style?: ViewStyle} ) => {
        return(
            <ButtonSettings 
            onPress={handleToggle}
            bgColorPressed={"#ddd"}
            >
                <View style={[style, {flexDirection: "row", alignItems: "center",}]}>
                    <Ionicons 
                    name={isChecked ? "radio-button-on" : "radio-button-off"} 
                    size={24} color={ isChecked ? "red" : "black"}
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
            
            <SelectAllIcon 
                style={ !selectState ? styles.invisible : undefined } 
                cantDeleting={cantDeleting} 
            />

            { selectState 
                ? 
                    <Text style={[ styles.selectedText,
                        // !selectState ? {opacity:0} : null
                    ]}>
                        <Text style={{fontWeight: "600"}}>({cantDeleting}) </Text>
                        seleccionados
                    </Text>
                : 
                    null    
            }

            <ButtonSettings
            onPress={()=>{router.push("/settings")}} 
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
    },
    invisible: {
        opacity: 0, 
        pointerEvents: "none"
    }
});