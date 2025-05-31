// src/index.ts

// Context and Provider
export { ThemeProvider } from "./context/ThemeProvider";
export { ThemeContext } from "./context/ThemeContext";

// Hook
export { useTheme } from "./hooks/useTheme";

// Sbu-prefixed wrappers
export * from "./components";

// Built-in themes (optional: consumer can import directly)
export { builtInThemes } from "./themes";

// TypeScript types
export type {
    Theme,
    ThemeName,
    ColorPalette,
    Typography,
    Spacing,
    ThemeContextType,
    ColorKey,
    TypographyKey,
    SpacingKey
} from "./types";

// Storage utilities (optional export)
export { getStoredThemeName, setStoredThemeName } from "./utils/storage";