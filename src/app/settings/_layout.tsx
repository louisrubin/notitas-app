import { Stack } from "expo-router";
import { Colors } from "../../constants/colors";
import { DropDownProvider } from "../../hooks/DropDownContext";

export default function Layout() {
    return(
        // provider drop-down para que al abrir uno, se cierren los X demas
        <DropDownProvider>
            <Stack 
            screenOptions={{
                // headerTitle: null, 
                // headerTransparent: true,
                headerBackground: () => null,
                headerStyle: { backgroundColor: Colors.light.background }
            }} />
        </DropDownProvider>
    )
}