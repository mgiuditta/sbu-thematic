// src/themes/defaultLight.ts

import { Theme } from "../types";
import { ColorKey } from "../types";
import { TypographyKey } from "../types";
import { SpacingKey } from "../types";

/**
 * Default light theme values as const objects,
 * typed according to the enums defined in types.ts.
 */

/**
 * Default light color palette.
 */
export const defaultLightColors: { [K in ColorKey]: string } = {
    [ColorKey.Primary]: "#45e59c",   // greenish
    [ColorKey.Secondary]: "#4d73ff", // blueish
    [ColorKey.Background]: "#ffffff", // white
    [ColorKey.Text]: "#000000",      // black
    [ColorKey.Border]: "#dddddd",    // light grey
    [ColorKey.Accent]: "#4d73ff"     // same as secondary
};

/**
 * Default light typography values.
 */
export const defaultLightTypography: { [K in TypographyKey]: number } = {
    [TypographyKey.Heading]: 26,
    [TypographyKey.Subheading]: 22,
    [TypographyKey.Body]: 16,
    [TypographyKey.Caption]: 12
};

/**
 * Default light spacing values.
 */
export const defaultLightSpacing: { [K in SpacingKey]: number } = {
    [SpacingKey.Small]: 8,
    [SpacingKey.Medium]: 16,
    [SpacingKey.Large]: 24
};

/**
 * Complete default light theme.
 */
export const defaultLight: Theme = {
    colors: defaultLightColors,
    typography: defaultLightTypography,
    spacing: defaultLightSpacing
};