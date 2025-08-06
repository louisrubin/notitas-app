
interface ColorProp {
    text: string;
    background: string;
    bgOnPressed: string;
    lineColor: string;
    marron?: string; // solo está en light
}

export const Colors: Record<string, ColorProp> = {
    light: {
        text: "#000",
        marron: "#57382F",
        background: '#f0f0f0',
        bgOnPressed: "#e8e8e8",
        lineColor: "#aaa",
    },

    dark: {
        text: "#fff",
        background: '#121212',
        bgOnPressed: "#18181C",
        lineColor: "#36363F",
    }
}