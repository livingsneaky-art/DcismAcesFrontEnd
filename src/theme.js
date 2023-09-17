import { createContext, useState } from "react";
import { createTheme } from "@mui/material/styles";

export const tokens = (mode) => ({
    ...(mode === "dark"
        ? {
            blue: {
                100: "#002233",
                200: "#004466",
                300: "#006699",
                400: "#0088cc",
                500: "#00aaff",
                600: "#00bbff",
                700: "#00ccff",
                800: "#00ddff",
                900: "#00eeff",
            },
            grey: {
                100: "#e0e0e0",
                200: "#c2c2c2",
                300: "#a3a3a3",
                400: "#858585",
                500: "#666666",
                600: "#525252",
                700: "#3d3d3d",
                800: "#292929",
                900: "#141414",
            },
            primary: {
                100: "#d3d1e1",
                200: "#a7a2c3",
                300: "#7a74a5",
                400: "#4e4587",
                500: "#221769",
                600: "#1b1254",
                700: "#140e3f",
                800: "#0e092a",
                900: "#070515"
            },
            greenAccent: {
                100: "#dbf5ee",
                200: "#b7ebde",
                300: "#94e2cd",
                400: "#70d8bd",
                500: "#4cceac",
                600: "#3da58a",
                700: "#2e7c67",
                800: "#1e5245",
                900: "#0f2922",
            },
            redAccent: {
                100: "#f8dcdb",
                200: "#f1b9b7",
                300: "#e99592",
                400: "#e2726e",
                500: "#db4f4a",
                600: "#af3f3b",
                700: "#832f2c",
                800: "#58201e",
                900: "#2c100f",
            },
            blueAccent: {
                100: "#e1e2fe",
                200: "#c3c6fd",
                300: "#a4a9fc",
                400: "#868dfb",
                500: "#6870fa",
                600: "#535ac8",
                700: "#3e4396",
                800: "#2a2d64",
                900: "#151632",
            },
            yellowAccent: {
                100: "#fffbd8",
                200: "#fff7b1",
                300: "#fff389",
                400: "#ffef62",
                500: "#ffeb3b",
                600: "#ccbc2f",
                700: "#998d23",
                800: "#665e18",
                900: "#332f0c"
            },
        }
        : {
            blue: {
                100: "#00eeff",
                200: "#00ddff",
                300: "#00ccff",
                400: "#00bbff",
                500: "#00aaff",
                600: "#0088cc",
                700: "#006699",
                800: "#004466",
                900: "#002233",
            },
            grey: {
                100: "#141414",
                200: "#292929",
                300: "#3d3d3d",
                400: "#525252",
                500: "#666666",
                600: "#858585",
                700: "#a3a3a3",
                800: "#c2c2c2",
                900: "#e0e0e0",
            },
            primary: {
                100: "#070515",
                200: "#0e092a",
                300: "#140e3f",
                400: "#f2f0f0",
                500: "#221769",
                600: "#4e4587",
                700: "#7a74a5",
                800: "#a7a2c3",
                900: "#d3d1e1",
            },
            greenAccent: {
                100: "#0f2922",
                200: "#1e5245",
                300: "#2e7c67",
                400: "#3da58a",
                500: "#4cceac",
                600: "#70d8bd",
                700: "#94e2cd",
                800: "#b7ebde",
                900: "#dbf5ee",
            },
            redAccent: {
                100: "#2c100f",
                200: "#58201e",
                300: "#832f2c",
                400: "#af3f3b",
                500: "#db4f4a",
                600: "#e2726e",
                700: "#e99592",
                800: "#f1b9b7",
                900: "#f8dcdb",
            },
            blueAccent: {
                100: "#151632",
                200: "#2a2d64",
                300: "#3e4396",
                400: "#535ac8",
                500: "#6870fa",
                600: "#868dfb",
                700: "#a4a9fc",
                800: "#c3c6fd",
                900: "#e1e2fe",
            },
            yellowAccent: {
                100: "#332f0c",
                200: "#665e18",
                300: "#998d23",
                400: "#ccbc2f",
                500: "#ffeb3b",
                600: "#ffef62",
                700: "#fff389",
                800: "#fff7b1",
                900: "#fffbd8",
            },
        }),
});

//mui theme settings
export const themeSetting = (mode) => {
    const colors = tokens(mode);

    return {
        palette: {
            mode: mode,
            ...(mode === "dark"
                ? {
                    primary: {
                        main: colors.primary[500],
                    },
                    secondary: {
                        main: colors.greenAccent[500],
                    },
                    neutral: {
                        dark: colors.grey[700],
                        main: colors.grey[500],
                        light: colors.grey[100],
                    },
                    background: {
                        default: colors.primary[900],
                    },
                }
                : {
                    primary: {
                        main: colors.primary[100],
                    },
                    secondary: {
                        main: colors.greenAccent[500],
                    },
                    neutral: {
                        dark: colors.grey[700],
                        main: colors.grey[500],
                        light: colors.grey[100],
                    },
                    background: {
                        default: "#fcfcfc",
                    },
                }),
        },
        typography: {
            fontFamily: ["Source Sans 3", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Source Sans 3", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Source Sans 3", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Source Sans 3", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Source Sans 3", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Source Sans 3", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Source Sans 3", "sans-serif"].join(","),
                fontSize: 14,
            },
        },
    };
};

export const ColorModeContext = createContext({
    toggleColorMode: () => { },
});

export const useMode = () => {
    const [mode, setMode] = useState("light");

    const toggleColorMode = () => {
        setMode((prev) => (prev === "dark" ? "light" : "dark"));
    };

    const colors = tokens(mode);
    const theme = createTheme(themeSetting(mode, colors));

    return {
        theme,
        toggleColorMode,
    };
};
