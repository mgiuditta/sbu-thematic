// src/themes/defaultLight.ts

import { Theme } from "../types";

/**
 * Default light theme based on provided palette:
 * - primary: #45e59c (greenish)
 * - secondary: #4d73ff (blueish)
 * - background: #ffffff (white)
 * - text: #000000 (black)
 * - border: light grey (for contrast)
 * - accent: a slightly different shade for interactive elements
 */
export const defaultLight: Theme = {
    colors: {
        primary: "#45e59c",
        secondary: "#4d73ff",
        background: "#ffffff",
        text: "#000000",
        border: "#dddddd",
        accent: "#4d73ff"
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