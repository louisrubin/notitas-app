import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { OpaqueColorValue, StyleProp, View, ViewStyle } from 'react-native';
import ButtonSettings from './ButtonSettings';

interface Prop {
    isChecked?: boolean;
    onPress?: () => void;
    size?: number;
    color?: string | OpaqueColorValue;
    style?: StyleProp<ViewStyle>;
    styleButton?: ViewStyle;
}

// COMPONENTE SOLO PARA EL BUTTON CHECK PERMITIENDO SER PRESIONABLE Y 
// EJECUTAR FUNCIÓN ON PRESS AL PRESIONAR 

export default function ButtonCheck( {
    isChecked = false, 
    size = 24, 
    color ="black", 
    style, 
    styleButton,
    onPress= () => {},
}: Prop) {
    const [checked, setChecked] = useState(isChecked);  // estado del componente
    
    useEffect( () => {
        // al cambiar el estado desde el padre setea ese valor al state
        setChecked(isChecked);
    },[isChecked]);

    const handleToggle = () => {
        return setChecked(prev => !prev);    // para manejador de icono
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
                name={ checked ? "radio-button-on" : "radio-button-off"} 
                size={size} color={ checked ? color : "black"}
                />  
            </ButtonSettings>
        </View>
    )
}