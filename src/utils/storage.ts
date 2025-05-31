// src/utils/storage.ts

import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@sbu_thematic_themeName";

/**
 * Retrieves the stored theme name from AsyncStorage.
 * Defaults to "light" if none is found or if an error occurs.
 */
export const getStoredThemeName = async (): Promise<string> => {
    try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        return stored ?? "light";
    } catch (error) {
        console.warn("[sbu-thematic] Error reading theme from AsyncStorage:", error);
        return "light";
    }
};

/**
 * Stores the given theme name into AsyncStorage.
 */
export const setStoredThemeName = async (name: string): Promise<void> => {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, name);
    } catch (error) {
        console.warn("[sbu-thematic] Error writing theme to AsyncStorage:", error);
    }
};