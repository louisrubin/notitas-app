
// CONSTANTES DE LISTAS DE LAS OPCIONES DE LOS DROPDOWN

export type KeyType = "fontSize" | "orderBy" | "designBy";
// export type FontSizeType = "small" | "medium" | "big" | "bigger";

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

export const getListItem = (key : KeyType) : DropDownItem[] => {
    // retornar la lista de objetos segun la Key Type
    if (key === "fontSize") return fontSizeList;
    if (key === "orderBy") return orderByList;
    if (key === "designBy") return designByList;
}

export const getFontSize = (value: string) : number => {
    // retornar el valor del tamaño de fuente segun el param
    if (value === "small") return 13;
    if (value === "medium") return 16;
    if (value === "big") return 18;
    if (value === "bigger") return 21;
}