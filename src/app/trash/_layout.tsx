import { Stack } from "expo-router";

export default function TrashLayout(){
    return(
        <Stack 
            screenOptions={{
                headerTitle: "Papelera",
                headerBackground: () => null,
            }}
        />
    )
}