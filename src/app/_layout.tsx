import { StatusBar } from "expo-status-bar";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
// import { TemaProvider } from "../hooks/ThemeContext";
import { Stack } from "expo-router";
import { SettingsProvider } from "../hooks/SettingsContext";
import { NotesProvider } from "../hooks/NotesContext";
import { initDB, insertNote } from "../hooks/SQLiteHooks";

export default function RootApp(){
   return (
      // <TemaProvider>
      <SQLiteProvider databaseName="notes.db" onInit={onInitFunction}>
            
         <SettingsProvider>
            <NotesProvider>
               <Stack 
                  screenOptions={{
                     headerShown: false,
                  }} />
               <StatusBar style="dark"/>
            </NotesProvider>
         </SettingsProvider>
               
      </SQLiteProvider>
      // </TemaProvider> 
      )
}

// https://docs.expo.dev/versions/latest/sdk/sqlite/

async function onInitFunction(db: SQLiteDatabase) {
    // VERIF SI LA BD YA FUE CREADA Y/O ACTUALIZADA y SETEA METADATOS

    let { user_version: currentDbVersion } = await db.getFirstAsync<{ user_version: number }>(
        'PRAGMA user_version'
    );
    if (currentDbVersion >= 1) {
        return;
    }
    if (currentDbVersion === 0) {
        initDB(db);
        insertNote(db, {
            title: firstNotitaInfo[0],
            value: firstNotitaInfo[1],
            created_at: new Date("2025-07-07T09:04:52").toISOString(),
            // fecha de cuando se me ocurrió crear la app -3 hr por UTC-3 (real: 12:04:52)
        });
        currentDbVersion = 1;
    }
    await db.execAsync(`PRAGMA user_version = 1`);
}


const firstNotitaInfo = [
    "Bienvenido/a a Notitas",
`¡Esta es la bienvenida a la app! 🎉\n
Acá podés guardar tus ideas, tareas, pensamientos o lo que se te ocurra.\n
Cada nota se guarda automáticamente y podés editarla cuando quieras.\n
🌱 Todo comienza con una primera notita...\n
¡Gracias por usar la app! Esta primera nota es solo una muestra. Podés editarla o borrarla si querés 😊
`
];