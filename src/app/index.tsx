import { StyleSheet, Text, View } from "react-native"
import { Colors } from "../constants/colors"
import { useEffect } from "react"
import { getAllNotes, initDB} from "../hooks/SQLiteHooks";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ButtonSettings from "../components/ButtonSettings";
import { router } from "expo-router";

// https://docs.expo.dev/versions/latest/sdk/sqlite/

export default function Index(){
    const insets = useSafeAreaInsets();

    useEffect( () => {
        const welcome = async () => {
            await initDB();
            // ejemplosNotas.forEach(nota => {insertNote(nota)});
            // console.log((await getAllNotes()).length);
            // (await getAllNotes())
            //     .forEach( (nota) => {
            //         console.log(nota.title, nota.value);
                    
            //     })
        }

        welcome();
    }, []);

    return(
        <View style={[
            styles.container, 
            { paddingTop: insets.top, 
            backgroundColor: Colors.light.background }
        ]}>
            {/* HEADER */}
            <View style={styles.header}>
                <ButtonSettings onPress={()=>{router.push("/settings")}}></ButtonSettings>
            </View>

            {/* BODY */}
            <View style={styles.body}>
                <Text style={styles.text} >
                    Inicio
                </Text>
            </View>
            
        </View>            
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#140A00", //FFE4B5
        paddingHorizontal: 15,
    },
    header:{
        flexDirection: "row",
        paddingTop: 10,

        // backgroundColor: "tomato",
        alignItems:"center",
        justifyContent: "flex-end"
    },
    body:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    footer:{},

    text: {
        textAlign: "center",
        color: Colors.light.text,
        fontSize: 30,
        fontWeight: "bold"
    }
})