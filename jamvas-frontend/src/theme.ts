import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

export const modalTheme = defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    dialog: {
      bg: `var(--background-secondary-color)`,
    },
  }),
});

export const theme: Record<string, any> = extendTheme(
  {
    styles: {
      global: {
        body: {
          fontFamily: "TR-909, Helvetica, Arial, sans-serif",
          fontSynthesis: "none",
          textRendering: "optimizeLegibility",
          backgroundColor: "var(--background-color)",
          color: "var(--foreground-color)",
          margin: 0,
          display: "flex",
          placeItems: "center",
          minWidth: "320px",
          minHeight: "100vh",
          lineHeight: 1.5,
          fontWeight: 400,
        },
        h1: {
          fontSize: "3.2em",
          lineHeight: 1.1,
        },
        h2: {
          fontSize: "1.8em",
          lineHeight: 1.1,
        },
        a: {
          fontWeight: 500,
          textDecoration: "inherit",
        },
      },
    },
    components: { Modal: modalTheme },
  },
  withDefaultColorScheme({ colorScheme: "teal" })
);
