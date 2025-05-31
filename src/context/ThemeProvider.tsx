// src/context/ThemeProvider.tsx

import React, { ReactNode, useEffect, useState, useCallback } from "react";
import { ThemeContext } from "./ThemeContext";
import { Theme, ThemeName } from "../types";
import { builtInThemes } from "../themes";
import { getStoredThemeName, setStoredThemeName } from "../utils/storage";
import merge from "deepmerge";

interface ThemeProviderProps {
    /**
     * Allow passing partial overrides for any theme.
     * Example: { light: { colors: { primary: "#ff0000" } }, custom: {...} }
     */
    customThemes?: Partial<Record<ThemeName, Partial<Theme>>>;
    /**
     * Optional initial theme name; if omitted, the provider will read from AsyncStorage.
     */
    initialThemeName?: ThemeName;
    /**
     * React children: the subtree that can consume this context.
     */
    children: ReactNode;
}

/**
 * ThemeProvider is the root component that:
 *  - merges built-in themes with any custom overrides
 *  - reads/saves the chosen theme in AsyncStorage
 *  - provides `themeName`, `theme`, and `setThemeName` via context
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
                                                                customThemes = {},
                                                                initialThemeName,
                                                                children
                                                            }) => {
    // Local state: current theme name and actual Theme object
    const [themeName, setThemeNameState] = useState<ThemeName>(initialThemeName ?? "light");
    const [theme, setTheme] = useState<Theme>(
        // If initialThemeName is provided and exists in builtInThemes, use it;
        // otherwise default to builtInThemes.light
        // @ts-ignore
        builtInThemes[initialThemeName ?? "light"] || (builtInThemes.light as Theme)
    );

    /**
     * updateTheme merges the built-in theme with any custom partial,
     * or if the name is purely custom, uses the custom directly.
     */
    const updateTheme = useCallback(
        (name: ThemeName) => {
            // @ts-ignore
            const baseTheme: Theme | undefined = builtInThemes[name];
            const customPartial: Partial<Theme> | undefined = customThemes[name];

            if (baseTheme) {
                // Merge built-in + customPartial via deepmerge
                const mergedTheme: Theme = merge(baseTheme, customPartial ?? {});
                setTheme(mergedTheme);
            } else if (customPartial) {
                // If no built-in exists but a custom theme is provided, use it
                setTheme(customPartial as Theme);
            } else {
                // Fallback to light theme
                console.warn(`[sbu-thematic] Theme "${name}" not found. Falling back to "light".`);
                const fallback = builtInThemes.light as Theme;
                const customForLight = customThemes["light"] ?? {};
                setTheme(merge(fallback, customForLight));
            }
        },
        [customThemes]
    );

    /**
     * setThemeName changes the theme:
     *  - updates local state
     *  - calls updateTheme to recalc merged theme object
     *  - persists the choice in AsyncStorage
     */
    const setThemeName = useCallback(
        (name: ThemeName) => {
            setThemeNameState(name);
            updateTheme(name);
            setStoredThemeName(name);
        },
        [updateTheme]
    );

    /**
     * On initial mount:
     *  - if initialThemeName prop is provided, use it directly
     *  - otherwise read stored theme name from AsyncStorage (or default to "light")
     */
    useEffect(() => {
        if (initialThemeName) {
            // Use provided initial theme immediately
            updateTheme(initialThemeName);
        } else {
            getStoredThemeName()
                .then(storedName => {
                    setThemeNameState(storedName);
                    updateTheme(storedName);
                })
                .catch(() => {
                    // In case of error, fallback to light
                    setThemeNameState("light");
                    updateTheme("light");
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Context value passed to children
    const contextValue = {
        themeName,
        theme,
        setThemeName
    };

    return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};