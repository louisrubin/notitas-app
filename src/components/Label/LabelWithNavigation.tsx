import AntDesign from '@expo/vector-icons/AntDesign';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import TitleX from '../otros/TitleX';
import { Colors } from '../../constants/colors';
import { useSettings } from '../../hooks/SettingsContext';

interface Prop {
    title: string;
    onPress: () => void;
    styleContainer?: ViewStyle;
}

export default function LabelWithNavigation( {title, onPress, styleContainer} : Prop ) {
    const { theme } = useSettings();

    return(
        <Pressable 
        style={ ({pressed}) => [
            styles.container,
            styleContainer,
            {
                backgroundColor: pressed ? Colors[theme.value].bgOnPressed : null,
            }
        ]} 
            onPress={ onPress }
        >
            <TitleX text={title} style={{color: Colors[theme.value].text}} />

            <AntDesign name="right" size={15} color={Colors[theme.value].text} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 12,
    },
})