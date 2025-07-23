import { format, differenceInHours, differenceInDays, differenceInCalendarDays } from "date-fns";
import { es } from "date-fns/locale";

export function getFormattedDate(dateString: string): string {
    // OBTENER LA FECHA DE CREACION SEGUN HACE CUANTO SE CREÓ
    const fecha = new Date(dateString);  // crear objeto Date con el pasado por param

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
        return format(fecha, "d MMMM yyyy", { locale: es });
    }
}

/* 
    si la fecha es de hace menos de 24 horas    --> format HH:mm
    si la fecha es menos de 7 días              --> format 'Lunes HH:mm'
    si pasa esas cantidad                       --> format '16 de julio de 2025' 
*/

export function getDiffDate(deleteDate: string): string {
    // RETORNAR LA DIFERENCIA DE DÍAS/HORAS HASTA LA FECHA DE ELIMINACION
    const fechaParam = new Date(deleteDate);  // crear objeto Date con el pasado por param

    const horasDiff = differenceInHours(fechaParam, new Date());
    const diasDiff = differenceInCalendarDays(fechaParam, new Date());

    if (diasDiff < 1 ) {
        // cantidad de horas
        const strFinal = horasDiff > 1 ? " horas" : " hora";
        return horasDiff.toString() + strFinal;
    } 
    else {
        // cantidad de días
        const strFinal = diasDiff > 1 ? " días" : " día";
        return diasDiff.toString() + strFinal;
    }
}