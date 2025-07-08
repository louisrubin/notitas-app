import { StyleSheet, Text, View } from "react-native"
import { Colors } from "../constants/colors"
import { SQLiteProvider } from "expo-sqlite"
import { useEffect, useState } from "react"
import { getAllNotes, initDB, insertNote, Nota } from "../hooks/sqliteHooks"

export default function Index(){
    const [notas, setNotas] = useState<Nota[]>([]);

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
        
        const cargarNotas = async () => {
            const respNotas = await getAllNotes();
            setNotas(respNotas);
        }

        cargarNotas();
    }, []);

    return(
        <SQLiteProvider databaseName="notes">
            <View style={styles.container}>
                <Text style={styles.text}>id: {notas[0]?.id}</Text>
                <Text style={styles.text}>titulo: {notas[0]?.title}</Text>
                <Text style={styles.text}>contenido: {notas[0]?.value}</Text>
                <Text style={styles.text}>{notas[0]?.created_at}</Text>
                <Text style={styles.text}>{notas[0]?.updated_at}</Text>
            </View>
        </SQLiteProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        
    },
    text: {
        textAlign: "center",
        color: Colors.light.text,
        fontSize: 20,
    }
})