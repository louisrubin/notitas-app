import AntDesign from '@expo/vector-icons/AntDesign';
import { Pressable, StyleSheet } from 'react-native';
import TitleX from './TitleX';
import { Colors } from '../constants/colors';

interface Prop {
    title: string;
    onPress: () => void;
}

export default function LabelWithNavigation( {title, onPress} : Prop ) {

    return(
        <Pressable 
        style={ ({pressed}) => [
            styles.container,
            {
                backgroundColor: pressed ? Colors.light.bgOnPressed : null,
            }
        ]} 
            onPress={ onPress }
        >
            <TitleX text={title} />

            <AntDesign name="right" size={15} color="black" />
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