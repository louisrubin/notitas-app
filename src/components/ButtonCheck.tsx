import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { OpaqueColorValue, View, ViewStyle } from 'react-native';
import ButtonSettings from './ButtonSettings';

interface Prop {
    checked?: boolean;
    onPress?: () => void;
    size?: number;
    color?: string | OpaqueColorValue;
    style?: ViewStyle;
    styleButton?: ViewStyle;
}

// COMPONENTE SOLO PARA EL BUTTON CHECK PERMITIENDO SER PRESIONABLE Y 
// EJECUTAR FUNCIÓN ON PRESS AL PRESIONAR 

export default function ButtonCheck( {
    checked, size=24, color="black", style, styleButton,
    onPress= () => {},
}: Prop) {
    const [isChecked, setIsChecked] = useState(false);  // check del icono
    
    const handleToggle = () => {
        return setIsChecked(prev => !prev);    // para manejador de icono
    }

    const runFunctions = () => {
        // une las dos functions en una sola para el param <ButtonSettings>
        handleToggle();
        onPress();
    }

    return(
        <View style={style}>
            <ButtonSettings 
            onPress={runFunctions}
            style={styleButton}
            >
                <Ionicons 
                name={ isChecked ? "radio-button-on" : "radio-button-off"} 
                size={size} color={ isChecked ? color : "black"}
                />  
            </ButtonSettings>
        </View>
    )
}