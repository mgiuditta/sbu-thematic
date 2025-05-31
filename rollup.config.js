import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

export default {
    input: "src/index.ts",
    external: [
        "react",
        "react-native",
        "@react-native-async-storage/async-storage"
        // (in seguito, aggiungeremo altri peerDependencies per Google Fonts se serve)
    ],
    output: [
        {
            file: "dist/index.js",
            format: "cjs",
            sourcemap: true
        },
        {
            file: "dist/index.esm.js",
            format: "es",
            sourcemap: true
        }
    ],
    plugins: [
        resolve({ extensions: [".js", ".jsx", ".ts", ".tsx"] }),
        commonjs(),
        typescript({ tsconfig: "./tsconfig.json" })
    ]
};