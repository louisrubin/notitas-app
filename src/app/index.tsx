import { StyleSheet, Text, View } from "react-native"
import { Colors } from "../constants/colors"
import { useEffect, useState } from "react"
import { getAllRows, initDB, insertNote, Nota} from "../hooks/SQLiteHooks";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ButtonSettings from "../components/ButtonSettings";
import { router } from "expo-router";
import FlatListX from "../components/FlatListX";
import { useSettings } from "../hooks/SettingsContext";

// https://docs.expo.dev/versions/latest/sdk/sqlite/

export default function Index(){
    const insets = useSafeAreaInsets();
    const { orderBy } = useSettings();
    const [notes, setNotes] = useState<Nota[]>();

    useEffect( () => {
        const welcome = async () => {
            await initDB();
            // deleteALL();
            // deleteNote(11);

            // ejemplosNotas.forEach( (nota) => {
            //     insertNote({
            //         title: nota.title, value: nota.value, created_at: nota.created_at})
            // })
            // insertNote({title: "Lorem ipsum 3", value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus facilisis fermentum metus, at congue augue malesuada ac.", created_at: new Date("2025-04-09").toString(),
            // })
            const allNotas = await getAllRows(orderBy.value);            
            setNotes(allNotas);
            // console.log("length:",allNotas);
        }

        welcome();
    }, []);

    return(
        <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: Colors.light.background }}>
            
            {/* HEADER */}
            <View style={styles.header}>
                <ButtonSettings onPress={()=>{router.push("/settings")}}></ButtonSettings>
            </View>

            {/* <ScrollView>     */}

                {/* BODY */}            
                <View style={styles.body}>
                    <Text style={styles.text} >
                        Inicio
                    </Text>
                </View>

                <FlatListX listaNotas={notes} />


                {/* FOOTER */}
                {/* <View style={styles.footer}>
                    <Text style={{ fontSize:18, textAlign: "center", marginBottom: 20 }}>Footer</Text>
                </View> */}
            {/* </ScrollView> */}
            
            
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