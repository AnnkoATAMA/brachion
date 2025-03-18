import { createTheme, PaletteMode, Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const darkTheme = (mode: PaletteMode): Theme => createTheme({
    palette: {
        mode,
        primary: { main: "#000"},
        secondary: {main: "#fff"},
        background: { default: "#ffffff"},
        text: {primary: "#D0D0D0"}
    },

});

const lightTheme = (mode: PaletteMode): Theme => createTheme({
    palette: {
        mode,
        primary: { main: "#000000"},
        secondary: {main: "#000000"},
        background: { default: "#ffffff"},
        text: {primary: "#000000"}
    }
});

export const useTemplateTheme =(): Theme => {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    return prefersDarkMode ? darkTheme("dark") : lightTheme("light");
};