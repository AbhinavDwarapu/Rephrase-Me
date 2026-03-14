import type { Preview } from "@storybook/nextjs-vite";
import "../app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
    a11y: {
      // 'todo' = show in Storybook UI + Vitest; 'error' = fail Vitest on violations (set in CI)
      test:
        typeof process !== "undefined" && process.env?.CI ? "error" : "todo",
      options: {},
    },
  },
};

export default preview;
