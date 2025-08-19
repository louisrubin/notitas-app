import { StatusBar, StatusBarStyle } from "expo-status-bar";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { Stack } from "expo-router";
import { SettingsProvider, useSettings } from "../hooks/SettingsContext";
import { NotesProvider } from "../hooks/NotesContext";
import { initDB, insertNote } from "../hooks/SQLiteHooks";
import { PaperProvider } from "react-native-paper";

// FUNCT PARA PARSEAR EL 'theme' (string) --> StatusBarStyle
const parseStatusBarStyle = (valor: string): StatusBarStyle => {
    const statusBarMapping: Record<string, StatusBarStyle> = {
        light: "dark",     // fondo claro → texto oscuro
        dark: "light",     // fondo oscuro → texto claro
    };
    return statusBarMapping[valor] ?? "auto";
}

function InnerApp() {
    // COMPONENTE RENDERIZA STACK Y STATUS BAR CON EL TEMA SELECCIONADO
    const { theme } = useSettings(); // theme.value es string
    const statusBarStyle = parseStatusBarStyle(theme.value);    // parsear tipo

    return(
        <>
            <Stack 
            screenOptions={{
                headerShown: false,
            }} />
            
            <StatusBar style={statusBarStyle}/>
        </>
    )
}

export default function RootApp(){
   return (
      <SQLiteProvider databaseName="notes.db" onInit={onInitFunction}>  

         <SettingsProvider>
            <NotesProvider>

                <PaperProvider>

                    <InnerApp />

                </PaperProvider>

            </NotesProvider>
         </SettingsProvider>
               
      </SQLiteProvider>
      )
}

// https://docs.expo.dev/versions/latest/sdk/sqlite/

async function onInitFunction(db: SQLiteDatabase) {
    // VERIF SI LA BD YA FUE CREADA Y/O ACTUALIZADA y SETEA METADATOS
    const DATABASE_VERSION = 1;

    let { user_version: currentDbVersion } = await db.getFirstAsync<{ user_version: number }>(
        'PRAGMA user_version'
    );    
    
    if (currentDbVersion >= DATABASE_VERSION) {
        // SALTEAR EL 'execAsync' DEL FINAL
        return;
    }

    if (currentDbVersion === 0) {
        // crear estructura de BD inicial
        initDB(db);

        // insertamos una notita de presentacion
        insertNote(db, {
            title: notaInit.title,
            value: notaInit.value,
            created_at: notaInit.created_at,            
        });

        currentDbVersion = 1;
    }

    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

const notaInit = {
    title: "Bienvenido/a a Notitas",
    value: `
¡Esta es la bienvenida a la app! 🎉

Acá podés guardar tus ideas, tareas, pensamientos o lo que se te ocurra. 📝

¡En el apartado de configuración ⚙ podrás modificar las opciones de accesibilidad de la app!

🌱 Todo comienza con una primera notita...

¡Gracias por usar la app! Esta primera nota es solo una muestra. Podés editarla o borrarla si querés 😊
`.trim(),

    created_at: new Date("2025-07-07T09:04:52").toISOString(),  
    // fecha de cuando se me ocurrió crear la app -3 hr por UTC-3 (real: 12:04:52)

    // blocked: true
}