import { createTheme, PaletteMode, Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const darkTheme = (mode: PaletteMode): Theme => createTheme({
    palette: {
        mode,
        primary: { main: "#000"},
        secondary: {main: "#fff"},
        background: { default: "#0A0F1F"},
        text: {primary: "#D0D0D0"}
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    background: "#141820",
                    color: "#A10000",
                }
            }
        }
    }
});

const lightTheme = (mode: PaletteMode): Theme => createTheme({
    palette: {
        mode,
        primary: { main: "#000"},
        secondary: {main: "#fff"},
        background: { default: "#0A0F1F"},
        text: {primary: "#D0D0D0"}
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    background: "#00000010",
                    color: "#ffffff",
                }
            }
        }
    }
})

export const useTemplateTheme =(): Theme => {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    return prefersDarkMode ? darkTheme("dark") : lightTheme("light");
}