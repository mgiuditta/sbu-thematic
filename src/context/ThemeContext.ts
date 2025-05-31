// src/context/ThemeContext.ts

import React from "react";
import { ThemeContextType, Theme } from "../types";

/**
 * placeholderTheme serves as a fallback theme before actual values are set.
 */
const placeholderTheme: Theme = {
    colors: {
        primary: "#000000",
        secondary: "#000000",
        background: "#ffffff",
        text: "#000000",
        border: "#cccccc",
        accent: "#000000"
    },
    typography: {
        heading: 24,
        subheading: 20,
        body: 16,
        caption: 12
    },
    spacing: {
        small: 8,
        medium: 16,
        large: 24
    }
};

/**
 * ThemeContext is created with a default value that will be overridden
 * by the ThemeProvider at runtime.
 */
export const ThemeContext = React.createContext<ThemeContextType>({
    themeName: "light",
    theme: placeholderTheme,
    setThemeName: () => {
        /** no-op */
    }
});