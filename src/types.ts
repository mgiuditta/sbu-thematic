// src/types.ts

/**
 * Enum of possible color keys in our ColorPalette.
 */
export enum ColorKey {
    Primary = "primary",
    Secondary = "secondary",
    Background = "background",
    Text = "text",
    Border = "border",
    Accent = "accent"
    // You can add more keys if needed
}

/**
 * Enum of possible typography keys in our Typography object.
 */
export enum TypographyKey {
    Heading = "heading",
    Subheading = "subheading",
    Body = "body",
    Caption = "caption"
    // Add more variants if necessary
}

/**
 * Enum of possible spacing keys in our Spacing object.
 */
export enum SpacingKey {
    Small = "small",
    Medium = "medium",
    Large = "large"
    // Add more spacing steps if needed
}

/**
 * ColorPalette defines all colors used in the theme.
 * We enforce that at least ColorKey.* keys must be present.
 * Additional keys can be added as optional.
 */
export type ColorPalette = {
    [K in ColorKey]: string;
} & {
    [key: string]: string | undefined;
};

/**
 * Typography defines font sizes for various text elements.
 * We enforce that at least TypographyKey.* are present.
 */
export type Typography = {
    [K in TypographyKey]: number;
} & {
    [key: string]: number | undefined;
};

/**
 * Spacing defines standard spacing units for margins and paddings.
 * We enforce that at least SpacingKey.* are present.
 */
export type Spacing = {
    [K in SpacingKey]: number;
} & {
    [key: string]: number | undefined;
};

/**
 * Theme is the main object representing the complete set of design tokens:
 * includes colors, typography, spacing, and any additional properties.
 */
export interface Theme {
    colors: ColorPalette;
    typography: Typography;
    spacing: Spacing;
    [key: string]: any;
}

/**
 * ThemeName is a string identifier for the theme.
 * Built-in values: "light", "dark". Custom strings are allowed.
 */
export type ThemeName = "light" | "dark" | string;

/**
 * ThemeContextType describes the shape of the context value provided
 * by ThemeProvider:
 *  - themeName: name of the current theme
 *  - theme: the merged Theme object
 *  - setThemeName: function to change the theme at runtime
 */
export interface ThemeContextType {
    themeName: ThemeName;
    theme: Theme;
    setThemeName: (name: ThemeName) => void;
}