import { Stack } from "expo-router";
import { Colors } from "../../constants/colors";

export default function Layout() {
    return(
        <Stack 
        screenOptions={{
            // headerTitle: null, 
            // headerTransparent: true,
            headerBackground: () => null,
            headerStyle: { backgroundColor: Colors.light.background }
        }} />
    )
}