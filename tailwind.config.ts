import type { Config } from "tailwindcss"
import colors from "tailwindcss/colors"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    transparent: "transparent",
    current: "currentColor",
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
        xs: "480px",
      },
    },
    fontSize: {
      xs: ["0.75rem", "1rem"],
      sm: ["0.875rem", "1.25rem"],
      base: ["1rem", "1.5rem"],
      lg: ["1.125rem", "1.75rem"],
      xl: ["1.25rem", "1.875rem"],
      "2xl": ["1.5rem", "2rem"],
      "3xl": ["1.875rem", "2.25rem"],
      "4xl": ["2.25rem", "2.5rem"],
      "5xl": ["3rem", "3rem"],
      "6xl": ["3.75rem", "3.75rem"],
      "7xl": ["4.5rem", "4.5rem"],
    },
    fontWeight: {
      regular: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      black: "900",
    },
    fontFamily: {
      "open-sans": ["var(--font-open-sans)"],
      "ibm-plex-mono": ["var(--font-ibm-plex-mono)"],
    },
    extend: {
      colors: {
        primaryBlue: "#0089EC",
        primaryHover: "#0082E0",
        tremor: {
          brand: {
            faint: colors.blue[50],
            muted: colors.blue[200],
            subtle: colors.blue[400],
            DEFAULT: colors.blue[500],
            emphasis: colors.blue[700],
            inverted: colors.white,
          },
          background: {
            muted: colors.gray[50],
            subtle: colors.gray[100],
            DEFAULT: colors.white,
            emphasis: colors.gray[700],
          },
          border: {
            DEFAULT: colors.gray[200],
          },
          ring: {
            DEFAULT: colors.gray[200],
          },
          content: {
            subtle: colors.gray[400],
            DEFAULT: colors.gray[500],
            emphasis: colors.gray[700],
            strong: colors.gray[900],
            inverted: colors.white,
          },
        },
        "dark-tremor": {
          brand: {
            faint: "#0B1229",
            muted: colors.blue[950],
            subtle: colors.blue[800],
            DEFAULT: colors.blue[500],
            emphasis: colors.blue[400],
            inverted: colors.blue[950],
          },
          background: {
            muted: "#131A2B",
            subtle: colors.gray[800],
            DEFAULT: colors.gray[900],
            emphasis: colors.gray[300],
          },
          border: {
            DEFAULT: colors.gray[800],
          },
          ring: {
            DEFAULT: colors.gray[800],
          },
          content: {
            subtle: colors.gray[600],
            DEFAULT: colors.gray[500],
            emphasis: colors.gray[200],
            strong: colors.gray[50],
            inverted: colors.gray[950],
          },
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primaryGray: "#303030",
        primaryHoverGray: "#252525",
        mutedGray: "#C6C5C6",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        green: {
          100: "#EDF2EB",
          200: "#C5E5B4",
          300: "#99CC7D",
          400: "#84BA64",
          500: "#5FA04E",
          600: "#417E38",
          700: "#2C682C",
          800: "#2C682C",
          900: "#1A3F1D",
        },
        neutral: {
          100: "#F6F7F9",
          200: "#E9EDF0",
          300: "#D9E1E4",
          400: "#CBD4D9",
          500: "#B1BCC2",
          600: "#929FA5",
          700: "#6E7B83",
          800: "#556066",
          900: "#2C3437",
          950: "#0D121C",
        },
        danger: {
          100: "#FBF1F0",
          200: "#FAD3D4",
          300: "#FAB6B7",
          400: "#FA8E8E",
          500: "#F65354",
          600: "#DE1A1B",
          700: "#B80C0C",
          800: "#900E0E",
          900: "#661514",
        },
        warning: {
          100: "#FDF3E7",
          200: "#FAD9B0",
          300: "#F5BC75",
          400: "#E99C40",
          500: "#D07912",
          600: "#AE5F00",
          700: "#8B4D04",
          800: "#683D08",
          900: "#4D2F0B",
        },
        info: {
          100: "#E9F4FA",
          200: "#BCE6FC",
          300: "#8ED4F8",
          400: "#52BAED",
          500: "#229AD6",
          600: "#0C7BB3",
          700: "#066291",
          800: "#074D71",
          900: "#0A3953",
        },
        accent1: {
          100: "#F7F1FB",
          200: "#EAD9FB",
          300: "#DBBDF9",
          400: "#C79BF2",
          500: "#AF74E8",
          600: "#9756D6",
          700: "#7D3CBE",
          800: "#642B9E",
          900: "#361B52",
        },
        accent2: {
          100: "#FBF0F4",
          200: "#FBD4E6",
          300: "#FBB4D2",
          400: "#F68BB7",
          500: "#ED5393",
          600: "#D6246E",
          700: "#B01356",
          800: "#8B1245",
          900: "#411526",
        },
        white: "#FFFFFF",
        transparent: "transparent",
        shadow: "#101828",
      },
      screens: { xs: { max: "670px", min: "0px" } },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-subtle":
          "linear-gradient(180deg, theme(colors.neutral.100 / 50%) 0%, theme(colors.neutral.100 / 0%) 48.32%)",
        "gradient-subtle-dark":
          "linear-gradient(180deg, theme(colors.neutral.900 / 50%) 0%, theme(colors.neutral.900 / 0%) 48.32%)",
        "gradient-subtle-gray":
          "linear-gradient(180deg, theme(colors.neutral.900) 0%, theme(colors.neutral.900 / 80%) 100%)",
        "gradient-subtle-white":
          "linear-gradient(180deg, theme(colors.white) 0%, theme(colors.white / 80%) 100%)",
        "gradient-glow-backdrop":
          "radial-gradient(8em circle at calc(50%) 10px, theme(colors.green.500), transparent 30%)",
      },
      boxShadow: {
        xs: "0px 1px 2px 0px theme(colors.shadow / 5%)",
        lg: "0px 4px 6px -2px theme(colors.shadow / 3%), 0px 12px 16px -4px theme(colors.shadow / 8%)",
        "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "tremor-card":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "tremor-dropdown":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        "dark-tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "dark-tremor-card":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "dark-tremor-dropdown":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
      spacing: { "4.5": "1.125rem", "18": "4.5rem" },
      aria: { current: 'current="page"' },
      maxWidth: { "8xl": "95rem" },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "tremor-small": "0.375rem",
        "tremor-default": "0.5rem",
        "tremor-full": "9999px",
      },
      fontSize: {
        "tremor-label": ["0.75rem", { lineHeight: "1rem" }],
        "tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
        "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
        "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  safelist: [
    "ProseMirror",
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    ...["[#0089EC]"].flatMap(customColor => [
      `bg-${customColor}`,
      `border-${customColor}`,
      `hover:bg-${customColor}`,
      `hover:border-${customColor}`,
      `hover:text-${customColor}`,
      `fill-${customColor}`,
      `ring-${customColor}`,
      `stroke-${customColor}`,
      `text-${customColor}`,
      `ui-selected:bg-${customColor}`,
      `ui-selected:border-${customColor}`,
      `ui-selected:text-${customColor}`,
    ]),
    ...["[#0cdcf8]"].flatMap(customColor => [
      `bg-${customColor}`,
      `border-${customColor}`,
      `hover:bg-${customColor}`,
      `hover:border-${customColor}`,
      `hover:text-${customColor}`,
      `fill-${customColor}`,
      `ring-${customColor}`,
      `stroke-${customColor}`,
      `text-${customColor}`,
      `ui-selected:bg-${customColor}`,
      `ui-selected:border-${customColor}`,
      `ui-selected:text-${customColor}`,
    ]),
  ],
  plugins: [
    require("@headlessui/tailwindcss"),
    require("@tailwindcss/forms"),
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
} satisfies Config

export default config
