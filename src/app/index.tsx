import { ScrollView, StyleSheet, Text, View } from "react-native"
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
        <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: Colors.light.background }}>
            
            {/* HEADER */}
            <View style={styles.header}>
                <ButtonSettings onPress={()=>{router.push("/settings")}}></ButtonSettings>
            </View>

            <ScrollView>    

                {/* BODY */}            
                <View style={styles.body}>
                    <Text style={styles.text} >
                        Inicio
                    </Text>
                </View>




                {/* FOOTER */}
                <View style={styles.footer}>
                    <Text style={{ fontSize:18, textAlign: "center", marginBottom: 20 }}>Footer</Text>
                </View>
            </ScrollView>
            
            
        </View>            
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#140A00", //FFE4B5
    },
    header:{
        paddingHorizontal: 10,
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
        fontWeight: "bold",
        height: 400
    }
})