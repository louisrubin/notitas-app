import { Stack } from "expo-router";
import { useSettings } from "../../hooks/SettingsContext";
import { Colors } from "../../constants/colors";

export default function TrashLayout(){
    const {theme} = useSettings();
    return(
        <Stack 
            screenOptions={{
                headerTitle: "Papelera",
                headerBackground: () => null,
                headerTintColor: Colors[theme.value].text,
                headerStyle: { backgroundColor: Colors[theme.value].background }
            }}
        />
    )
}