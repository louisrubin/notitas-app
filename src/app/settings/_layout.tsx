import { Stack } from "expo-router";
import { DropDownProvider } from "../../hooks/DropDownContext";

export default function Layout() {
    return(
        // provider drop-down para que al abrir uno, se cierren los X demas
        <DropDownProvider>
            <Stack />
        </DropDownProvider>
    )
}