# @matteogiuditta/sbu-thematic

`@matteogiuditta/sbu-thematic` is a professional React Native theming toolkit designed to help developers build visually consistent applications. It provides:

- **Centralized Design Tokens**: Colors, typography, and spacing are organized into strictly typed enums and objects.
- **Context-Based Theming**: A `ThemeProvider` and `useTheme` hook allow dynamic theme switching at runtime.
- **Sbu-Prefixed Wrappers**: `SbuThemedView` and `SbuThemedText` wrap React Native’s `View` and `Text`, automatically applying theme values and common layout props.
- **TypeScript-First Approach**: Strong typing ensures compile-time safety for theme properties.
- **Custom Theme Support**: Pass partial overrides or entirely new theme objects.
- **Automatic Persistence**: Selected theme is saved and restored via `AsyncStorage`.

Whether you need light/dark mode or want to define entirely custom themes, `@matteogiuditta/sbu-thematic` provides a robust foundation for theming in React Native.

---

## Table of Contents

1. [Features](#features)  
2. [Installation](#installation)  
3. [Getting Started](#getting-started)  
4. [Usage](#usage)  
   - [1. Wrap Your App](#1-wrap-your-app)  
   - [2. Consume the Theme](#2-consume-the-theme)  
   - [3. Using `SbuThemedView` and `SbuThemedText`](#3-using-sbuthemedview-and-sbuthemedtext)  
   - [4. Custom Themes & Overrides](#4-custom-themes--overrides)  
5. [API Reference](#api-reference)  
   - [Types & Enums](#types--enums)  
   - [`ThemeProvider`](#themeprovider)  
   - [`useTheme`](#usetheme)  
   - [`ThemeContext`](#themecontext)  
   - [`SbuThemedView`](#sbuthemedview)  
   - [`SbuThemedText`](#sbuthemedtext)  
6. [Project Structure](#project-structure)  
7. [Scripts](#scripts)  
8. [Testing](#testing)  
9. [Publishing to npm](#publishing-to-npm)  
10. [Contributing](#contributing)  
11. [License](#license)  

---

## Features

- **Strict Typing**: Leverage TypeScript enums for `ColorKey`, `TypographyKey`, `SpacingKey`.
- **Built-in Light & Dark Themes**: Default themes include sensible color palettes, typography scales, and spacing.
- **Custom Theme Overrides**: Easily override built-in tokens or add entirely new theme objects.
- **Persistent Theme Selection**: Automatically stores the selected theme in AsyncStorage and restores it on app launch.
- **Layout Props**: `SbuThemedView` supports layout props like `flex`, `justifyContent`, `alignItems`, `padding`, and `margin`.
- **Dynamic Typography**: `SbuThemedText` supports `variant` prop (`heading`, `subheading`, `body`, `caption`).
- **Easy to Extend**: Add new properties to `Theme` interface and include them in custom themes.
- **Zero Dependencies Beyond RN & AsyncStorage**: Only external runtime dependency is [deepmerge](https://www.npmjs.com/package/deepmerge) for merging theme objects.

---

## Installation

1. **Peer Dependencies**  
   Ensure your React Native app meets the peer dependencies:

   ```bash
   # Using npm
   npm install react@^19.0.0 react-native@^0.79.0 @react-native-async-storage/async-storage@^1.17.11

   # Or using Yarn
   yarn add react@^19.0.0 react-native@^0.79.0 @react-native-async-storage/async-storage@^1.17.11
   ```

2. **Install the Library**  
   Install `@matteogiuditta/sbu-thematic`:

   ```bash
   # Using npm
   npm install @matteogiuditta/sbu-thematic

   # Or using Yarn
   yarn add @matteogiuditta/sbu-thematic
   ```

3. **TypeScript Setup (Optional)**  
   If you use TypeScript, ensure your `tsconfig.json` includes:

   ```jsonc
   {
     "compilerOptions": {
       "target": "ES2017",
       "module": "ESNext",
       "lib": ["ES2020", "DOM"],
       "declaration": true,
       "declarationDir": "dist",
       "outDir": "dist",
       "rootDir": "src",
       "strict": true,
       "jsx": "react",
       "moduleResolution": "node",
       "esModuleInterop": true,
       "skipLibCheck": true,
       "sourceMap": true
     },
     "include": ["src/**/*.ts", "src/**/*.tsx"],
     "exclude": ["node_modules", "dist", "tests"]
   }
   ```

4. **Add `README.md` and `LICENSE`**  
   Ensure `README.md` and `LICENSE` are present at the root of your package so npm can display documentation.

---

## Getting Started

After installing, follow these steps to integrate theming into your React Native app.

### 1. Wrap Your App

Wrap your application’s root component with `ThemeProvider`. This sets up the theme context and loads any stored theme name from AsyncStorage.

```tsx
// App.tsx

import React from "react";
import { SafeAreaView } from "react-native";
import { ThemeProvider } from "@matteogiuditta/sbu-thematic";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Your App Content Here */}
      </SafeAreaView>
    </ThemeProvider>
  );
};

export default App;
```

- **`ThemeProvider` Props**:
  - `customThemes?`: Partial override of built-in or new theme definitions.
  - `initialThemeName?`: If provided, overrides storage and uses this theme on mount.

---

## Usage

### 2. Consume the Theme

Use the `useTheme` hook anywhere inside the `ThemeProvider` subtree to access:

- `themeName`: Current theme name (e.g., `"light"`, `"dark"`, `"ocean"`)
- `theme`: The complete `Theme` object, containing `colors`, `typography`, and `spacing`.
- `setThemeName(name: ThemeName)`: Function to switch themes at runtime (updates state and AsyncStorage).

```tsx
import React from "react";
import { View, Button } from "react-native";
import { useTheme } from "@matteogiuditta/sbu-thematic";

export const SampleComponent: React.FC = () => {
  const { themeName, setThemeName, theme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Button
        title={`Switch to ${themeName === "light" ? "dark" : "light"}`}
        color={theme.colors.primary}
        onPress={() =>
          setThemeName(themeName === "light" ? "dark" : "light")
        }
      />
    </View>
  );
};
```

---

### 3. Using `SbuThemedView` and `SbuThemedText`

`SbuThemedView` and `SbuThemedText` are wrappers around React Native’s `View` and `Text`, respectively. They automatically apply theme values and accept common layout props.

#### `SbuThemedView`

```tsx
<SbuThemedView
  flex={1}
  justifyContent="center"
  alignItems="center"
  padding={theme.spacing.medium}
  backgroundColor={theme.colors.background}
  style={{ margin: theme.spacing.small }}
>
  {/* Children */}
</SbuThemedView>
```

- **Props**:
  - `flex?: number`
  - `justifyContent?: FlexStyle['justifyContent']`
  - `alignItems?: FlexStyle['alignItems']`
  - `padding?: number`
  - `paddingHorizontal?: number`
  - `paddingVertical?: number`
  - `margin?: number`
  - `marginHorizontal?: number`
  - `marginVertical?: number`
  - `backgroundColor?: string` (overrides theme background)
  - `style?: ViewStyle | ViewStyle[]`

#### `SbuThemedText`

```tsx
<SbuThemedText
  variant="heading"
  color={theme.colors.primary}
  margin={theme.spacing.small}
  textAlign="center"
>
  Themed Heading
</SbuThemedText>
```

- **Props**:
  - `variant?: TypographyKey` (`"heading" | "subheading" | "body" | "caption"`)
  - `color?: string` (override theme text color)
  - `margin?: number`
  - `marginHorizontal?: number`
  - `marginVertical?: number`
  - `textAlign?: TextStyle['textAlign']`
  - `style?: TextStyle | TextStyle[]`

---

### 4. Custom Themes & Overrides

By default, two built-in themes are provided: **light** and **dark**. You can override these or add entirely new theme objects.

#### Built-In Themes

- **Light Theme**:
  ```ts
  {
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
  }
  ```

- **Dark Theme**:
  ```ts
  {
    colors: {
      primary: "#67eaae",
      secondary: "#6e86ff",
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
  }
  ```

#### Providing Custom Overrides

To override built-in tokens, pass a `customThemes` object to `ThemeProvider`. Keys should match theme names.

```tsx
const customThemes = {
  light: {
    colors: {
      primary: "#FF5722", // override only primary color
      background: "#FAFAFA"
    },
    typography: {
      heading: 28, // override heading font size
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
      heading: 30,
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
  {/* ... */}
</ThemeProvider>
```

- **Merging Logic**:  
  - If you override `light`, only specified keys merge with built-in `light`.  
  - If you specify a new key (e.g., `"ocean"`), you provide a full `Theme` object.

---

## API Reference

### Types & Enums

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
  [key: string]: any; // allow additional properties
}

export type ThemeName = "light" | "dark" | string;

export interface ThemeContextType {
  themeName: ThemeName;
  theme: Theme;
  setThemeName: (name: ThemeName) => void;
}
```

---

### `ThemeProvider`

```tsx
<ThemeProvider
  customThemes?: Partial<Record<ThemeName, Partial<Theme>>>
  initialThemeName?: ThemeName
>
  {children}
</ThemeProvider>
```

- **Props**:
  - `customThemes?`: Partial overrides or new theme definitions.
  - `initialThemeName?`: Force a starting theme instead of reading from AsyncStorage.

- **Context Values** (via `useTheme()`):
  - `themeName: ThemeName`
  - `theme: Theme`
  - `setThemeName: (name: ThemeName) => void`

### `useTheme`

```ts
const { themeName, theme, setThemeName } = useTheme();
```

- **Returns**:
  - `themeName`: Current theme identifier.
  - `theme`: Merged `Theme` object.
  - `setThemeName(name)`: Switches theme and persists selection.

- **Thrown Error**:  
  If used outside of `ThemeProvider`, throws `Error("useTheme must be used within a ThemeProvider")`.

### `ThemeContext`

```ts
export const ThemeContext = React.createContext<ThemeContextType>({
  themeName: "light",
  theme: placeholderTheme,
  setThemeName: () => {}
});
```

- Contains default placeholder values until `ThemeProvider` initializes actual theme.

---

### `SbuThemedView`

```tsx
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
  backgroundColor?: string;
  style?: ViewStyle | ViewStyle[];
}

export const SbuThemedView: React.FC<SbuThemedViewProps> = (props) => { /* ... */ };
```

- **Behavior**:
  - Default `backgroundColor` comes from `theme.colors.background`.
  - Applies any provided layout props (`flex`, `justifyContent`, etc.).
  - Merges inline `style` prop at the end (overrides computed props).

- **Example**:
  ```tsx
  <SbuThemedView
    flex={1}
    justifyContent="center"
    alignItems="center"
    padding={theme.spacing.large}
    backgroundColor="#e0f7fa" // overrides theme background
  >
    {/* Content */}
  </SbuThemedView>
  ```

---

### `SbuThemedText`

```tsx
export interface SbuThemedTextProps extends TextProps {
  variant?: keyof Typography;
  color?: string;
  margin?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  textAlign?: TextStyle["textAlign"];
  style?: TextStyle | TextStyle[];
}

export const SbuThemedText: React.FC<SbuThemedTextProps> = (props) => { /* ... */ };
```

- **Behavior**:
  - Default `fontSize` comes from `theme.typography[variant]` (defaults to `body`).
  - Default `color` comes from `theme.colors.text`.
  - Applies margin and `textAlign` if provided.
  - Merges inline `style` last.

- **Example**:
  ```tsx
  <SbuThemedText
    variant="heading"
    marginVertical={theme.spacing.small}
    color={theme.colors.secondary}
  >
    Welcome to My App
  </SbuThemedText>
  ```

---

## Project Structure

```
sbu-thematic/
├── dist/                   # Bundled output (CJS, ESM) and generated .d.ts
├── src/
│   ├── components/
│   │   ├── SbuThemedText.tsx
│   │   ├── SbuThemedView.tsx
│   │   └── index.ts        # Export all components
│   ├── context/
│   │   ├── ThemeContext.ts
│   │   └── ThemeProvider.tsx
│   ├── hooks/
│   │   └── useTheme.ts
│   ├── themes/
│   │   ├── defaultDark.ts
│   │   ├── defaultLight.ts
│   │   └── index.ts        # Export builtInThemes
│   ├── utils/
│   │   ├── storage.ts      # AsyncStorage helpers
│   │   └── fontLoader.ts   # (If font loading is used; optional)
│   ├── types.ts            # Theme interfaces & enums
│   └── index.ts            # Main entry point: re-export everything
├── tests/                  # Jest test files
├── package.json
├── tsconfig.json
├── rollup.config.js
├── jest.config.cjs
├── README.md               # <— This file
└── LICENSE
```

---

## Scripts

In `package.json`, you have the following scripts:

```jsonc
"scripts": {
  "build": "rollup -c",
  "test": "jest --passWithNoTests",
  "prepare": "npm run build"
}
```

- **`npm run build`**: Bundles source files from `src/` into `dist/` (CommonJS & ESModule) via Rollup.
- **`npm test`**: Runs Jest tests (no tests = no failures).
- **`npm run prepare`**: Automatically triggered on `npm install` or `npm publish`, ensures `dist/` is up to date.

---

## Testing

We use Jest and React Test Renderer (or equivalent) to verify functionality. Example tests include:

- `tests/useTheme.test.tsx`: Verifies default theme, switching themes, and fallback behavior.
- `tests/ThemeProvider.test.tsx`: Ensures custom theme overrides merge correctly.
- `tests/SbuThemedView.test.tsx`: Checks `SbuThemedView` applies background and layout props.
- `tests/SbuThemedText.test.tsx`: Checks `SbuThemedText` applies typography and color props.
- `tests/fontLoader.test.ts` (optional): Tests font loading logic if included.

To run tests:
```bash
npm test
```

---

## Publishing to npm

1. **Bump version** in `package.json` following semver (e.g., `1.0.0` → `1.0.1`).
2. **Build** the library:
   ```bash
   npm run build
   ```
3. **Run tests** to ensure everything passes:
   ```bash
   npm test
   ```
4. **Login** to npm (if not already):
   ```bash
   npm login
   ```
5. **Publish** with public access (for a scoped package):
   ```bash
   npm publish --access public
   ```

After publishing, `README.md` content appears automatically on the npm package page.

---

## Contributing

1. **Fork** the repository.
2. **Create a branch** for your feature/fix:
   ```bash
   git checkout -b feature/awesome-feature
   ```
3. **Implement** changes in `src/` and add tests in `tests/`.
4. **Build & Test** locally:
   ```bash
   npm run build
   npm test
   ```
5. **Commit & Push**:
   ```bash
   git commit -m "feat: add awesome feature"
   git push origin feature/awesome-feature
   ```
6. **Open a Pull Request** on GitHub.

---

## License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.
