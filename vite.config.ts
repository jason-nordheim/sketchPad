import { defineConfig } from "vite";
import dtsPlugin from "vite-plugin-dts";
import react from "@vitejs/plugin-react";
import reactRefresh from "@vitejs/plugin-react-refresh";
import typescript from "@rollup/plugin-typescript";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dtsPlugin({
      exclude: ["src/App.tsx", "src/main.tsx", "index.html", "**/**.svg"],
      tsconfigPath: "./tsconfig.build.json",
    }),
    reactRefresh(),
  ],
  build: {
    emptyOutDir: true,
    manifest: true,
    sourcemap: true,
    lib: {
      entry: "./src/index.ts",
      name: "sketchPad",
      fileName: (format) => `sketchPad.${format}.js`,
    },
    rollupOptions: {
      treeshake: true,
      input: "./src/index.ts",
      external: ["react", "react-dom", "vite"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
      plugins: [
        typescript({
          tsconfig: "./tsconfig.build.json",
          sourceMap: true,
          declaration: true,
          noEmit: true,
        }),
      ],
    },
  },
});
