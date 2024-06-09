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
  webpack(config, { dev: isDev, isServer }) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      resourceQuery: /svgr/, // only use svgr to load svg if path ends with *.svg?svgr
      use: ["@svgr/webpack"],
    })

    // Re-add default nextjs loader for svg
    config.module.rules.push({
      test: /\.svg$/i,
      loader: "next-image-loader",
      issuer: { not: /\.(css|scss|sass)$/ },
      dependency: { not: ["url"] },
      resourceQuery: { not: [/svgr/] }, // Ignore this rule if the path ends with *.svg?svgr
      options: { isServer, isDev, basePath: "", assetPrefix: "" },
    })

    return config
  },
  async redirects() {
    return [
      {
        source: "/bCccDwkKkN",
        destination: "/", // Matched parameters can be used in the destination
        permanent: true,
      },
    ]
  },
}

export default withNextIntl(config)
