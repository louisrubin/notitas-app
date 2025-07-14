import AntDesign from '@expo/vector-icons/AntDesign';
import { Pressable, StyleSheet } from 'react-native';
import TitleX from './TitleX';

interface Prop {
    title: string;
    onPress: () => void;
}

export default function LabelWithNavigation( {title, onPress} : Prop ) {

    return(
        <Pressable style={styles.container} 
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
        justifyContent: "space-between",
        alignItems: "center",

        // borderWidth: 0.5,

        // backgroundColor: "tomato"
    },
})