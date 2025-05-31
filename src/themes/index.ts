// src/themes/index.ts

import { defaultLight } from "./defaultLight";
import { defaultDark } from "./defaultDark";

/**
 * builtInThemes collects all the available base themes.
 */
export const builtInThemes: Record<string, any> = {
    light: defaultLight,
    dark: defaultDark
};