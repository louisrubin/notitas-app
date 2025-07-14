
// CONSTANTES DE LISTAS DE LAS OPCIONES DE LOS DROPDOWN

export type KeyType = "fontSize" | "orderBy" | "designBy";

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
    { label: "Ver en lista", value: "list_view"},
    { label: "Ver en cuadrícula", value: "quad_view"},
]

export const getListItem = (key : KeyType) : DropDownItem[] => {
    // retornar la lista de objetos segun la Key Type
    if (key === "fontSize") return fontSizeList;
    if (key === "orderBy") return orderByList;
    if (key === "designBy") return designByList;
}