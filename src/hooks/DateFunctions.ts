import { format, differenceInHours, differenceInDays } from "date-fns";
import { es } from "date-fns/locale";

export function getFormattedDate(dateString: string): string {
    const fecha = new Date(dateString);

    const horasDiff = differenceInHours(new Date(), fecha);
    const diasDiff = differenceInDays(new Date(), fecha);

    if (horasDiff < 24) {
        // Menos de 24 horas
        return format(fecha, "HH:mm", { locale: es });
    } 
    else if (diasDiff < 7) {
        // Menos de 7 días
        return format(fecha, "EEEE HH:mm", { locale: es });
    } 
    else {
        // 7 días o más
        return format(fecha, "d 'de' MMMM 'de' yyyy", { locale: es });
    }
}

/* 
    si la fecha es de hace menos de 24 horas    --> format HH:mm
    si la fecha es menos de 7 días              --> format 'Lunes HH:mm'
    si pasa esas cantidad                       --> format '16 de julio de 2025' 
*/