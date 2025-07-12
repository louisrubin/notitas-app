import { StatusBar } from "expo-status-bar";
import { SQLiteProvider } from "expo-sqlite";
// import { TemaProvider } from "../hooks/ThemeContext";
import { Stack } from "expo-router";
import { SettingsProvider } from "../hooks/SettingsContext";

const RootApp = () => {
   return (
      // <TemaProvider>
      <SettingsProvider>
         <SQLiteProvider databaseName="notesDB">
               <Stack 
                  screenOptions={{
                     headerShown: false,
                  }} />
               <StatusBar style="dark"/>
         </SQLiteProvider>
      </SettingsProvider>
      // </TemaProvider> 
      )
}

export default RootApp;