// src/themes/defaultDark.ts

import { Theme } from "../types";

/**
 * Default dark theme based on provided palette:
 * - primary: lighten green (#45e59c) for visibility on dark background
 * - secondary: lighten blue (#4d73ff)
 * - background: black (#000000)
 * - text: white (#ffffff)
 * - border: dark grey
 * - accent: same as secondary for consistency
 */
export const defaultDark: Theme = {
    colors: {
        primary: "#67eaae",    // lighter green variant
        secondary: "#6e86ff",  // lighter blue variant
        background: "#000000",
        text: "#ffffff",
        border: "#333333",
        accent: "#6e86ff"
    },
    typography: {
        heading: 26,
        subheading: 22,
        body: 16,
        caption: 12
    },
    spacing: {
        small: 8,
        medium: 16,
        large: 24
    }
};