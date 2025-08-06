
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
    },

    dark: {
        text: "#fff",
        background: '#121212',
        bgOnPressed: "#212127",
        lineColor: "#36363F",
        subtitle: "#6E7D91",
        icon: "#B68677",
        marronText: "#F6F0EE",
        marronSubText: "#E6D6D1",
        bgFlatList: "#282828",
        overlayPressed: "rgba(255,255,255,0.1)",
        deleteDate: "#3B3B3B",
    }
}