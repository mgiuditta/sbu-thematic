// src/components/SbuThemedView.tsx

import React from "react";
import {
    View,
    ViewProps,
    ViewStyle,
    FlexAlignType,
    FlexStyle
} from "react-native";
import { useTheme } from "../hooks/useTheme";
import { ColorKey } from "../types";

/**
 * SbuThemedViewProps extends ViewProps but also adds common layout props:
 *  - flex: number
 *  - justifyContent: FlexStyle["justifyContent"]
 *  - alignItems: FlexStyle["alignItems"]
 *  - padding, paddingHorizontal, paddingVertical, margin, etc.
 */
export interface SbuThemedViewProps extends ViewProps {
    flex?: number;
    justifyContent?: FlexStyle["justifyContent"];
    alignItems?: FlexAlignType;
    padding?: number;
    paddingHorizontal?: number;
    paddingVertical?: number;
    margin?: number;
    marginHorizontal?: number;
    marginVertical?: number;
    /**
     * Allows overriding the theme background color if needed.
     */
    backgroundColor?: string;
    style?: ViewStyle | ViewStyle[];
}

/**
 * SbuThemedView wraps the native View, applies backgroundColor from theme
 * unless overridden, and merges any provided layout props into a style object.
 */
export const SbuThemedView: React.FC<SbuThemedViewProps> = props => {
    const { theme } = useTheme();

    const {
        flex,
        justifyContent,
        alignItems,
        padding,
        paddingHorizontal,
        paddingVertical,
        margin,
        marginHorizontal,
        marginVertical,
        backgroundColor,
        style,
        ...restProps
    } = props;

    // Start with backgroundColor from theme or override
    const computedStyle: ViewStyle = {
        backgroundColor: backgroundColor ?? theme.colors[ColorKey.Background]
    };

    // Apply layout props if provided
    if (flex !== undefined) {
        computedStyle.flex = flex;
    }
    if (justifyContent) {
        computedStyle.justifyContent = justifyContent;
    }
    if (alignItems) {
        computedStyle.alignItems = alignItems;
    }
    if (padding !== undefined) {
        computedStyle.padding = padding;
    }
    if (paddingHorizontal !== undefined) {
        computedStyle.paddingHorizontal = paddingHorizontal;
    }
    if (paddingVertical !== undefined) {
        computedStyle.paddingVertical = paddingVertical;
    }
    if (margin !== undefined) {
        computedStyle.margin = margin;
    }
    if (marginHorizontal !== undefined) {
        computedStyle.marginHorizontal = marginHorizontal;
    }
    if (marginVertical !== undefined) {
        computedStyle.marginVertical = marginVertical;
    }

    return <View style={[computedStyle, style]} {...restProps} />;
};