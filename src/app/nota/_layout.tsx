import { Stack } from "expo-router";

export default function NotaLayout() {
    return(
        <Stack
            screenOptions={{ 
                // headerShown: false
                headerBackground: () => null,
                headerTitle: "",
            }}
        />
    )
}