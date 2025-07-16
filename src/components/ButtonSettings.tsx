import { Pressable, StyleSheet } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

interface Prop {
    onPress?: () => void;
}

export default function ButtonSettings( { onPress }: Prop ){
    return(
        <Pressable style={ ({pressed}) => [
            styles.container, 
            { 
                backgroundColor: pressed ? "#ddd" : null,  // background al presionar
                opacity: pressed ? 1 : 0.6,     // opacidad mayor al presionar
            } 
            ]}
        onPress={onPress}
        hitSlop={20}    // extiende el área presionable hacia afuera
        >
            <AntDesign name="setting" size={24} color={"black"} />            
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 6,
        borderRadius: 60,
    },
})