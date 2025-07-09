import { StatusBar } from "expo-status-bar";
import { SQLiteProvider } from "expo-sqlite";
import { TemaProvider } from "../hooks/ThemeContext";
import { Stack } from "expo-router";

const RootApp = () => {
   return (
      <TemaProvider>
         <SQLiteProvider databaseName="notesDB">
               <Stack 
                  screenOptions={{
                     headerShown: false,
                  }} />
               <StatusBar style="dark"/>
         </SQLiteProvider>
      </TemaProvider>
      )
}

export default RootApp;