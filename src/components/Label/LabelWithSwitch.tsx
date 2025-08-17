import { StyleSheet, Switch, View, ViewStyle } from "react-native";
import TitleX from "../TitleX";
import { useSettings } from "../../hooks/SettingsContext";
import { Colors } from "../../constants/colors";

interface SwitchProp {
    title: string;
    value: boolean;
    disabled?: boolean;
    onValueChange?: () => void;
    // size?: number;
    // positionCircle?: number;
    // right?: number;
    // bgActiveColor?: string;
    // bgInactiveColor?: string;
    styleContainer?: ViewStyle;
}

export default function LabelWithSwitch( { 
    title, 
    value, 
    disabled = false,
    // size = 22,
    // positionCircle = 3,
    // right = 3,
    // bgActiveColor,
    // bgInactiveColor,
    onValueChange = () => {},
    styleContainer,
} : SwitchProp){
    const { theme } = useSettings();
    const ThemeValue = Colors[theme.value];
    
    return(
        <View style={[styles.container, styleContainer]}>
            <TitleX text={title} style={{ color: ThemeValue.text}} />

            <Switch
                value={value}
                onValueChange={onValueChange}
                disabled={disabled}
                

                trackColor={{ 
                    true: Colors["dark"].icon,
                    false: ThemeValue.lineColor 
                }}
                thumbColor="#ddd" // color del círculo
                ios_backgroundColor={ThemeValue.marronText}
                style={styles.switch}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // backgroundColor: "tomato"
    },
    switch: {
        transform: [{ scaleX: 1.35 }, { scaleY: 1.35 }], // agrandar el switch
    },
});