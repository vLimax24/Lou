import { defineConfig } from "cypress"

export default defineConfig({
  projectId: "owgfbr",
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
})
