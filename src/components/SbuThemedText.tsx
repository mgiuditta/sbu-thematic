// src/components/SbuThemedText.tsx

import React from "react";
import { Text, TextProps, TextStyle } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { Typography } from "../types";

/**
 * SbuThemedTextProps extends TextProps and adds:
 *  - variant: key of Typography (heading, subheading, body, caption)
 *  - color: override for text color (defaults to theme.colors.text)
 *  - margin, marginHorizontal, marginVertical, textAlign
 */
export interface SbuThemedTextProps extends TextProps {
    variant?: keyof Typography;
    color?: string;
    margin?: number;
    marginHorizontal?: number;
    marginVertical?: number;
    textAlign?: TextStyle["textAlign"];
    style?: TextStyle | TextStyle[];
}

/**
 * SbuThemedText wraps the native Text and applies:
 *  - fontSize from theme.typography based on variant
 *  - color from theme.colors.text (or override)
 *  - optional margins and textAlign
 */
export const SbuThemedText: React.FC<SbuThemedTextProps> = props => {
    const { theme } = useTheme();

    const {
        variant = "body",
        color,
        margin,
        marginHorizontal,
        marginVertical,
        textAlign,
        style,
        ...restProps
    } = props;

    const computedStyle: TextStyle = {
        fontSize: theme.typography[variant] ?? theme.typography.body,
        color: color ?? theme.colors.text
    };

    if (margin !== undefined) {
        computedStyle.margin = margin;
    }
    if (marginHorizontal !== undefined) {
        computedStyle.marginHorizontal = marginHorizontal;
    }
    if (marginVertical !== undefined) {
        computedStyle.marginVertical = marginVertical;
    }
    if (textAlign) {
        computedStyle.textAlign = textAlign;
    }

    return <Text style={[computedStyle, style]} {...restProps} />;
};