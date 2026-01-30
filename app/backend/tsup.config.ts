import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],
  format: ["esm"],
  clean: true,
  dts: true,
  minify: true,
  sourcemap: true,
});
