# @matteogiuditta/sbu-thematic

A professional React Native theming toolkit with Sbu-prefixed wrappers and Expo Google Fonts integration. Centralize all design tokens (colors, typography, spacing) into strictly typed enums and objects, and wrap your components (View/Text) so they automatically consume the current theme. 

---

## Table of Contents

1. [Installation](#installation)  
2. [Getting Started](#getting-started)  
3. [Usage](#usage)  
   - [Wrapping Your App](#wrapping-your-app)  
   - [Accessing Theme Values](#accessing-theme-values)  
   - [`SbuThemedView` and `SbuThemedText`](#sbuthemedview-and-sbuthemedtext)  
   - [Custom Themes](#custom-themes)  
   - [Google Fonts Integration](#google-fonts-integration)  
4. [API Reference](#api-reference)  
   - [`ThemeProvider`](#themeprovider)  
   - [`useTheme`](#usetheme)  
   - [`ThemeContext`](#themecontext)  
   - [`SbuThemedView`](#sbuthemedview)  
   - [`SbuThemedText`](#sbuthemedtext)  
   - [`useLoadGoogleFonts`](#useloadgooglefonts)  
   - [Enums & Types](#enums--types)  
5. [Project Structure](#project-structure)  
6. [Contributing](#contributing)  
7. [License](#license)  

---

## Installation

1. Ensure your React Native app satisfies the peer dependencies listed below. In your app’s root folder, run:

   ```bash
   # Using npm
   npm install react@^19.0.0 react-native@^0.79.0 @react-native-async-storage/async-storage@^1.17.11 expo-font@^12.0.0

   # Or using Yarn
   yarn add react@^19.0.0 react-native@^0.79.0 @react-native-async-storage/async-storage@^1.17.11 expo-font@^12.0.0
   ```

2. Install `@matteogiuditta/sbu-thematic`:

   ```bash
   # Using npm
   npm install @matteogiuditta/sbu-thematic

   # Or using Yarn
   yarn add @matteogiuditta/sbu-thematic
   ```

3. (Optional) If you plan to use Google Fonts, install one or more `@expo-google-fonts/<family>` packages. For example:

   ```bash
   # Using npm
   npm install @expo-google-fonts/montserrat

   # Or using Yarn
   yarn add @expo-google-fonts/montserrat
   ```

---

## Getting Started

In your React Native app (Expo or bare workflow), wrap your root component with the `ThemeProvider`, then consume theme values via `useTheme` and use the “Sbu” prefixed wrappers.

```tsx
// App.tsx

import React from "react";
import { SafeAreaView, Button } from "react-native";
import {
  ThemeProvider,
  useTheme,
  SbuThemedView,
  SbuThemedText
} from "@matteogiuditta/sbu-thematic";

const InnerApp: React.FC = () => {
  const { themeName, setThemeName, theme } = useTheme();

  return (
    <SbuThemedView
      flex={1}
      justifyContent="center"
      alignItems="center"
      padding={theme.spacing.medium}
    >
      <SbuThemedText variant="heading" marginBottom={theme.spacing.medium}>
        Current theme: {themeName}
      </SbuThemedText>

      <Button
        title="Switch to Dark"
        color={theme.colors.primary}
        onPress={() =>
          setThemeName(themeName === "light" ? "dark" : "light")
        }
      />

      <Button
        title="Switch to Ocean"
        color={theme.colors.accent}
        onPress={() => setThemeName("ocean")}
        style={{ marginTop: theme.spacing.small }}
      />
    </SbuThemedView>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <InnerApp />
      </SafeAreaView>
    </ThemeProvider>
  );
};

export default App;
```

---

## Usage

### Wrapping Your App

Wrap your application’s root component with `ThemeProvider`. You can pass optional `customThemes` to override built-in values or add new theme sets.

```tsx
<ThemeProvider customThemes={customThemes}>
  <App />
</ThemeProvider>
```

### Accessing Theme Values

Use the `useTheme` hook to access:

- `themeName`: string name of current theme (`"light"`, `"dark"`, or custom)
- `theme`: the full theme object (`{ colors, typography, spacing, ... }`)
- `setThemeName`: function to switch themes at runtime

```tsx
const { themeName, theme, setThemeName } = useTheme();
```

### `SbuThemedView` and `SbuThemedText`

These components wrap the native `View` and `Text`, applying default theme values:

- `SbuThemedView` accepts layout props (`flex`, `justifyContent`, `alignItems`, `padding`, `margin`, etc.) and applies `backgroundColor` from theme.
- `SbuThemedText` accepts a `variant` (`"heading"`, `"subheading"`, `"body"`, `"caption"`), `color` override, and layout props (`margin`, `textAlign`).

```tsx
<SbuThemedView padding={theme.spacing.medium}>
  <SbuThemedText variant="heading" color={theme.colors.primary}>
    Hello, world!
  </SbuThemedText>
</SbuThemedView>
```

### Custom Themes

Provide a `customThemes` prop to `ThemeProvider` to override built-in values or add new themes.

```tsx
const customThemes = {
  light: {
    colors: {
      primary: "#FF5722",
      background: "#FAFAFA"
    }
  },
  ocean: {
    colors: {
      primary: "#009688",
      secondary: "#004D40",
      background: "#E0F2F1",
      text: "#004D40",
      border: "#B2DFDB",
      accent: "#00796B"
    },
    typography: {
      heading: 28,
      body: 18
    },
    spacing: {
      small: 10,
      medium: 18,
      large: 28
    }
  }
};

<ThemeProvider customThemes={customThemes}>
  <App />
</ThemeProvider>;
```

### Google Fonts Integration

Use the `useLoadGoogleFonts` hook to load fonts at runtime via Expo:

```tsx
import React from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { useLoadGoogleFonts } from "@matteogiuditta/sbu-thematic";
import {
  Montserrat_400Regular,
  Montserrat_700Bold
} from "@expo-google-fonts/montserrat";

export const FontsDemo: React.FC = () => {
  const fontsLoaded = useLoadGoogleFonts({
    Montserrat_400Regular,
    Montserrat_700Bold
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontFamily: "Montserrat_400Regular", fontSize: 18 }}>
        Montserrat Regular
      </Text>
      <Text
        style={{
          fontFamily: "Montserrat_700Bold",
          fontSize: 22,
          marginTop: 12
        }}
      >
        Montserrat Bold
      </Text>
    </View>
  );
};
```

---

## API Reference

### `ThemeProvider`

```tsx
<ThemeProvider
  customThemes?: Partial<Record<ThemeName, Partial<Theme>>>
  initialThemeName?: ThemeName
>
  {children}
</ThemeProvider>
```

- **`customThemes`** (optional): Partial override object for any theme name.
- **`initialThemeName`** (optional): If provided, sets the initial theme instead of reading from AsyncStorage.
- Provides `ThemeContext` to children.

### `useTheme`

```ts
const { themeName, theme, setThemeName } = useTheme();
```

- **Returns**:  
  - `themeName: string`  
  - `theme: Theme`  
  - `setThemeName(name: string): void`

### `ThemeContext`

React context object created by `ThemeProvider`. Default value if not wrapped:

```ts
{
  themeName: "light",
  theme: placeholderTheme,
  setThemeName: () => {}
}
```

### `SbuThemedView`

```tsx
<SbuThemedView
  flex?: number
  justifyContent?: string
  alignItems?: string
  padding?: number
  paddingHorizontal?: number
  paddingVertical?: number
  margin?: number
  marginHorizontal?: number
  marginVertical?: number
  backgroundColor?: string
  style?: ViewStyle | ViewStyle[]
>
  {children}
</SbuThemedView>
```

- Wraps `View` and applies `backgroundColor` from theme unless overridden.
- Accepts CSS-like layout props for flexbox and spacing.

### `SbuThemedText`

```tsx
<SbuThemedText
  variant?: TypographyKey
  color?: string
  margin?: number
  marginHorizontal?: number
  marginVertical?: number
  textAlign?: TextStyle["textAlign"]
  style?: TextStyle | TextStyle[]
>
  {children}
</SbuThemedText>
```

- Wraps `Text` and applies `fontSize` from `theme.typography` based on `variant`, and `color` from `theme.colors.text` by default.
- Accepts margin and `textAlign`.

### `useLoadGoogleFonts`

```ts
const fontsLoaded: boolean = useLoadGoogleFonts(fontMap: GoogleFontMap);
```

- **`fontMap`**: `{ [fontName: string]: any }`, e.g. `{ Montserrat_400Regular, Montserrat_700Bold }`.
- **Returns**: `true` if fonts are loaded, `false` otherwise.

### Enums & Types

```ts
export enum ColorKey {
  Primary = "primary",
  Secondary = "secondary",
  Background = "background",
  Text = "text",
  Border = "border",
  Accent = "accent"
}

export enum TypographyKey {
  Heading = "heading",
  Subheading = "subheading",
  Body = "body",
  Caption = "caption"
}

export enum SpacingKey {
  Small = "small",
  Medium = "medium",
  Large = "large"
}

export type ColorPalette = { [K in ColorKey]: string } & { [key: string]: string | undefined };
export type Typography = { [K in TypographyKey]: number } & { [key: string]: number | undefined };
export type Spacing = { [K in SpacingKey]: number } & { [key: string]: number | undefined };

export interface Theme {
  colors: ColorPalette;
  typography: Typography;
  spacing: Spacing;
  [key: string]: any;
}

export type ThemeName = "light" | "dark" | string;

export interface ThemeContextType {
  themeName: ThemeName;
  theme: Theme;
  setThemeName: (name: ThemeName) => void;
}

export type GoogleFontMap = { [fontName: string]: any };
```

---

## Project Structure

```
sbu-thematic/
├── dist/                   # Bundled output (CJS, ESM) and .d.ts files
├── src/
│   ├── components/
│   │   ├── SbuThemedText.tsx
│   │   ├── SbuThemedView.tsx
│   │   └── index.ts
│   ├── context/
│   │   ├── ThemeContext.ts
│   │   └── ThemeProvider.tsx
│   ├── hooks/
│   │   └── useTheme.ts
│   ├── themes/
│   │   ├── defaultDark.ts
│   │   ├── defaultLight.ts
│   │   └── index.ts
│   ├── utils/
│   │   ├── fontLoader.ts
│   │   └── storage.ts
│   ├── types.ts
│   └── index.ts
├── package.json
├── tsconfig.json
├── rollup.config.js
├── jest.config.js
├── README.md               # <- You are here
└── LICENSE
```

---

## Contributing

1. Fork the repository.
2. Create a new branch:  
   ```bash
   git checkout -b feature/YourFeatureName
   ```
3. Make your changes in the `src/` folder.
4. Add or update tests accordingly (in `tests/`).
5. Build and verify your changes:  
   ```bash
   npm run build
   npm test
   ```
6. Commit your changes and push:  
   ```bash
   git commit -m "feat: add new feature"
   git push origin feature/YourFeatureName
   ```
7. Create a Pull Request on GitHub.

---

## License

`@matteogiuditta/sbu-thematic` is released under the [MIT License](LICENSE).
