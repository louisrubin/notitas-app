import { StatusBar } from "expo-status-bar";
import { SQLiteProvider } from "expo-sqlite";
// import { TemaProvider } from "../hooks/ThemeContext";
import { Stack } from "expo-router";
import { SettingsProvider } from "../hooks/SettingsContext";
import { NotesProvider } from "../hooks/NotesContext";

const RootApp = () => {
   return (
      // <TemaProvider>
      <SettingsProvider>
         <SQLiteProvider databaseName="notesDB">
            
            <NotesProvider>
               <Stack 
                  screenOptions={{
                     headerShown: false,
                  }} />
               <StatusBar style="dark"/>
            </NotesProvider>
               
         </SQLiteProvider>
      </SettingsProvider>
      // </TemaProvider> 
      )
}

export default RootApp;