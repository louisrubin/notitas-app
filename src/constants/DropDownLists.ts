
// CONSTANTES DE LISTAS DE LAS OPCIONES DE LOS DROPDOWN

export type KeyType = "fontSize" | "orderBy" | "designBy";
export type FontSizeType = "small" | "medium" | "big" | "bigger";   // valores
export type OrderType = "created_date" | "modification_date";       // permitidos
export type DesignType = "list" | "grid";                           // para 'value'

// export type ItemsTypes = FontSizeType | OrderType | DesignType;

// tipos de datos para el DropDown List
export type DropDownItem = {
    label: string; 
    value: string;
}

export const fontSizeList = [
    { label: "Pequeña", value: "small"},
    { label: "Mediana", value: "medium"},
    { label: "Grande", value: "big"},
    { label: "Muy grande", value: "bigger"},
]

export const orderByList = [
    { label: "Fecha de creación", value: "created_date"},
    { label: "Fecha de modificación", value: "modification_date"},
]

export const designByList = [
    { label: "Ver en lista", value: "list"},
    { label: "Ver en cuadrícula", value: "grid"},
]


// FUNCTIONS
const listMap: Record<KeyType, DropDownItem[]> = {
    fontSize: fontSizeList,
    orderBy: orderByList,
    designBy: designByList,
};
export const getListItem = (key : KeyType) : DropDownItem[] => listMap[key];

export const getFontSize = (value: string) : number => {
    // retornar el valor del tamaño de fuente segun el param
    const sizeMap: Record<string, number> = {
        "small": 22, 
        "medium": 28,
        "big": 34,   
        "bigger": 42,
    };
    return sizeMap[value];
}