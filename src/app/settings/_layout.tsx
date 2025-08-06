import { Stack } from "expo-router";
import { Colors } from "../../constants/colors";
import { DropDownProvider } from "../../hooks/DropDownContext";
import { useSettings } from "../../hooks/SettingsContext";

export default function Layout() {
    const {theme} = useSettings();
    return(
        // provider drop-down para que al abrir uno, se cierren los X demas
        <DropDownProvider>
            <Stack 
                screenOptions={{
                    headerBackground: () => null,
                    headerTintColor: Colors[theme.value].text,
                    headerStyle: { backgroundColor: Colors[theme.value].background }
                }} 
            />
        </DropDownProvider>
    )
}