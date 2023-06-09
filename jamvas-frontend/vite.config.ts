/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/jamvas", // required for Github Pages deployment
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./config/vitestSetup.ts",
    reporters: "vitest-sonar-reporter",
    outputFile: "test-report.xml",
    coverage: {
      reporter: ["lcov"],
    },
  },
});
