
interface ColorProp {
    text: string;
    background: string;
    bgOnPressed: string;
    lineColor: string;
    subtitle: string;
    icon: string;
    marronText: string;
    marronSubText: string;
    bgFlatList: string;
    overlayPressed: string;
    deleteDate: string;
    bgCreateButton: string;
    placeholder: string;
}

export const Colors: Record<string, ColorProp> = {
    light: {
        text: "#000",
        background: '#f0f0f0',
        bgOnPressed: "#E0E0E0",
        lineColor: "#aaa",
        subtitle: "#4B5563",
        icon: "#57382F",
        marronText: "#57382F",
        marronSubText: "#785347",
        bgFlatList: "#fff",
        overlayPressed: "rgba(0,0,0,0.1)",
        deleteDate: "#ddd",
        bgCreateButton: "#D6D3D1",
        placeholder: "#A0A0A0",
    },

    dark: {
        text: "#fff",
        background: '#000',
        bgOnPressed: "rgba(255,255,255,0.1)",
        lineColor: "#36363F",
        subtitle: "#6E7D91",
        icon: "#B68677",
        marronText: "#F6F0EE",
        marronSubText: "#A7A7B4",
        bgFlatList: "#171717",
        overlayPressed: "rgba(255,255,255,0.1)",
        deleteDate: "#242424",
        bgCreateButton: "#282828",
        placeholder: "#888888",
    }
}