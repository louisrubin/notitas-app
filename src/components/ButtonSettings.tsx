import { Image, Pressable, StyleSheet } from "react-native";
import { Icons } from "../constants/iconsPath";
import { useTema } from "../hooks/ThemeContext";

export default function ButtonSettings(){
    const { tema, cambiarTema } = useTema();   // hook para obtener el tema guardado (claro/oscuro)
    const selectImage = tema === "dark" ? Icons.dark.settingsIcon : Icons.light.settingsIcon2;

    return(
        <Pressable style={ ({pressed}) => [
            styles.container,            
            { backgroundColor: 
                pressed ? tema === "light" ? "#ddd" : "#d2a" 
                        : null 
            }
        ]}
        onPress={cambiarTema}
        >
            <Image source={ selectImage } style={styles.image} />
            
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 6,
        // borderWidth: 1,
        borderRadius: 60,
    },
    image: {
        resizeMode: "contain",
        width: 32,
        height: 32,
        opacity: 0.5
    },
})