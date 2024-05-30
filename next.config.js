/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js")
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin()

/** @type {import("next").NextConfig} */
const config = {
  images: {
    domains: ["img.clerk.com", "brilliant.org"],
  },
}

export default withNextIntl(config)
