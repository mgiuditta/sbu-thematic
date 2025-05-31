// src/themes/defaultDark.ts

import { Theme } from "../types";
import { ColorKey } from "../types";
import { TypographyKey } from "../types";
import { SpacingKey } from "../types";

/**
 * Default dark theme values as const objects,
 * typed according to the enums defined in types.ts.
 */

/**
 * Default dark color palette.
 * We use lighter variants of the original palette for contrast on black.
 */
export const defaultDarkColors: { [K in ColorKey]: string } = {
    [ColorKey.Primary]: "#67eaae",    // lighter variant of #45e59c
    [ColorKey.Secondary]: "#6e86ff",  // lighter variant of #4d73ff
    [ColorKey.Background]: "#000000", // black
    [ColorKey.Text]: "#ffffff",       // white
    [ColorKey.Border]: "#333333",     // dark grey
    [ColorKey.Accent]: "#6e86ff"      // same as secondary
};

/**
 * Default dark typography values.
 * Usually same as light.
 */
export const defaultDarkTypography: { [K in TypographyKey]: number } = {
    [TypographyKey.Heading]: 26,
    [TypographyKey.Subheading]: 22,
    [TypographyKey.Body]: 16,
    [TypographyKey.Caption]: 12
};

/**
 * Default dark spacing values.
 * Usually same as light.
 */
export const defaultDarkSpacing: { [K in SpacingKey]: number } = {
    [SpacingKey.Small]: 8,
    [SpacingKey.Medium]: 16,
    [SpacingKey.Large]: 24
};

/**
 * Complete default dark theme.
 */
export const defaultDark: Theme = {
    colors: defaultDarkColors,
    typography: defaultDarkTypography,
    spacing: defaultDarkSpacing
};