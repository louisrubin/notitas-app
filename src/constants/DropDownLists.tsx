
// CONSTANTES DE LISTAS DE LAS OPCIONES DE LOS DROPDOWN

export type DropDownItem = {
    label: string; 
    value: string;
}

export const itemSizes = [
    { label: "Pequeña", value: "small"},
    { label: "Mediana", value: "medium"},
    { label: "Grande", value: "big"},
    { label: "Muy grande", value: "bigger"},
]

export const itemOrder = [
    { label: "Por fecha de creación", value: "created_date"},
    { label: "Por fecha de modificación", value: "modification_date"},
]

export const itemDesing = [
    { label: "Ver en lista", value: "list_view"},
    { label: "Ver en cuadrícula", value: "quad_view"},
]