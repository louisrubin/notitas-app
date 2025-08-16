import { Pressable, StyleSheet, Text, TextStyle, ViewStyle } from "react-native";
import { useSettings } from "../../hooks/SettingsContext";
import { Colors } from "../../constants/colors";

interface ButtonProp {
    text: string;
    disabled?: boolean;
    onPress?: () => void;
    styleContainer?: ViewStyle;
    styleText?: TextStyle;

}

export default function ButtonTransparent({
    text,
    styleContainer,
    styleText,
    disabled = false,
    onPress = () => {},

}: ButtonProp){
    const {theme} = useSettings();

    // ESTILOS
    const styles = StyleSheet.create({
        container: {
            paddingHorizontal: 15,
            paddingVertical: 5,
            borderRadius: 16,
        },
        text: {
            fontSize: 20,
            fontWeight: 600,
            color: !disabled ? Colors[theme.value].text : Colors[theme.value].placeholder,

        }
    })


    return(
        <Pressable 
            onPress={onPress}
            disabled={disabled}
            style={ ({pressed}) => [
                styleContainer, styles.container,
                {
                    backgroundColor: pressed ? Colors[theme.value].bgOnPressed : null,
                }
            ]}
        >
            <Text style={[styleText, styles.text]}>{text}</Text>
        </Pressable>
    )
}