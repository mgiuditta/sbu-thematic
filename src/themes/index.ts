// src/themes/index.ts

import { defaultLight } from "./defaultLight";
import { defaultDark } from "./defaultDark";

/**
 * builtInThemes collects all base themes available by default.
 */
export const builtInThemes: Record<string, any> = {
    light: defaultLight,
    dark: defaultDark
};