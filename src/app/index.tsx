import { StyleSheet, View } from "react-native"
import { Colors } from "../constants/colors"
import { useEffect } from "react"
import { initDB} from "../hooks/sqliteHooks";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ButtonSettings from "../components/ButtonSettings";
import { useTema } from "../hooks/ThemeContext";

export default function Index(){
    const insets = useSafeAreaInsets();
    const { tema } = useTema();   // hook para obtener el tema guardado (claro/oscuro)
    const bgColorTheme = tema === "dark" ? "#FFE4B5" : "#140A00";
    // const [notas, setNotas] = useState<Nota[]>([]);

    useEffect(() => {
        initDB();
        // deleteNote(2);
        // insertNote({
        //     id: 0, 
        //     title: "nota 1", 
        //     value: "esta es una nota cualquiera", 
        //     created_at: new Date().toISOString(), 
        //     updated_at: new Date().toISOString(),
        // })

        // https://docs.expo.dev/versions/latest/sdk/sqlite/
        
        // const cargarNotas = async () => {
        //     const respNotas = await getAllNotes();
        //     setNotas(respNotas);
        // }

        // cargarNotas();
    }, []);

    return(
        <View style={[
                styles.container, 
                { paddingTop: insets.top, 
                backgroundColor: bgColorTheme }
            ]}>
            <View style={styles.header}>
                <ButtonSettings></ButtonSettings>
            </View>
        </View>
            
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#140A00", //FFE4B5
        paddingHorizontal: 10,
    },
    header:{
        flexDirection: "row",
        paddingTop: 8,

        // backgroundColor: "tomato",
        alignItems:"center",
        justifyContent: "flex-end"
    },
    body:{},
    footer:{},

    text: {
        textAlign: "center",
        color: Colors.light.text,
        fontSize: 20,
    }
})