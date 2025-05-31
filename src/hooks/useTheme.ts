// src/hooks/useTheme.ts

import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import type { ThemeContextType } from "../types";

/**
 * useTheme returns the current theme context:
 *  - themeName: string
 *  - theme: Theme object
 *  - setThemeName: function to switch themes
 *
 * Throws an error if used outside of a ThemeProvider.
 */
export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};