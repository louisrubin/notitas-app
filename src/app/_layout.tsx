import { StatusBar } from "expo-status-bar";
import { SQLiteProvider } from "expo-sqlite";
import Index from "./index";
import { TemaProvider } from "../hooks/ThemeContext";

const RootApp = () => {
   // const { tema } = useTema();   // hook para obtener el tema guardado (claro/oscuro)
   // const statusTheme = tema === "light" ? "dark" : "light";

   return (
      <TemaProvider>
         <SQLiteProvider databaseName="notesDB">
               <Index></Index>
               <StatusBar style="auto" />
         </SQLiteProvider>
      </TemaProvider>
      )
}

export default RootApp;