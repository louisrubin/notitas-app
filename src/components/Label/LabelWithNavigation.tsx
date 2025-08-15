import AntDesign from '@expo/vector-icons/AntDesign';
import { Pressable, StyleSheet } from 'react-native';
import TitleX from '../TitleX';
import { Colors } from '../../constants/colors';
import { useSettings } from '../../hooks/SettingsContext';

interface Prop {
    title: string;
    onPress: () => void;
}

export default function LabelWithNavigation( {title, onPress} : Prop ) {
    const { theme } = useSettings();

    return(
        <Pressable 
        style={ ({pressed}) => [
            styles.container,
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
        paddingHorizontal: 26,
        justifyContent: "space-between",
        alignItems: "center",

        // backgroundColor: "tomato"
    },
})