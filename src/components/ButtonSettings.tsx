import { Pressable, StyleSheet, ViewStyle } from "react-native";

interface Prop {
    children: React.ReactNode;
    onPress?: () => void;
    style?: ViewStyle;
}

export default function ButtonSettings( { children, onPress, style }: Prop ){
    return(
        <Pressable style={ ({pressed}) => [
            styles.container, 
            style,
            { 
                backgroundColor: pressed ? "#ddd" : null,  // background al presionar
                opacity: pressed ? 1 : 0.6,     // opacidad mayor al presionar
            } 
            ]}
        onPress={onPress}
        hitSlop={20}    // extiende el área presionable hacia afuera
        >
            { children }
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 6,
        borderRadius: 60,
    },
})