// src/types.ts

/**
 * ColorPalette defines the set of colors used in the theme.
 */
export interface ColorPalette {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    border: string;
    accent?: string;
    [key: string]: string | undefined;
}

/**
 * Typography defines font sizes for headings, body, captions, etc.
 */
export interface Typography {
    heading: number;
    subheading: number;
    body: number;
    caption: number;
    [key: string]: number | undefined;
}

/**
 * Spacing defines standard spacing units for margins/paddings.
 */
export interface Spacing {
    small: number;
    medium: number;
    large: number;
    [key: string]: number | undefined;
}

/**
 * Theme is the top-level object that combines colors, typography, spacing,
 * and any additional design tokens (e.g., borderRadius, shadows).
 */
export interface Theme {
    colors: ColorPalette;
    typography: Typography;
    spacing: Spacing;
    [key: string]: any;
}

/**
 * ThemeName is a string identifier for the theme.
 * Built-in values: "light", "dark". Custom strings are supported.
 */
export type ThemeName = "light" | "dark" | string;

/**
 * ThemeContextType is the shape of the context value provided by ThemeProvider.
 * - themeName: current theme name
 * - theme: the Theme object (merged built-in + custom)
 * - setThemeName: function to switch the theme at runtime
 */
export interface ThemeContextType {
    themeName: ThemeName;
    theme: Theme;
    setThemeName: (name: ThemeName) => void;
}