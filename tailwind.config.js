export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          light: "hsl(var(--primary-light))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          light: "hsl(var(--secondary-light))",
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
          light: "hsl(var(--accent-light))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        pattern: {
          primary: "hsl(var(--pattern-primary))",
          secondary: "hsl(var(--pattern-secondary))",
          light: "hsl(var(--pattern-light))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        arabic: ["Cairo", "Tajawal", "Noto Sans Arabic", "sans-serif"],
        english: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
        "gradient-hero": "var(--gradient-hero)",
        "gradient-card": "var(--gradient-card)",
        "heritage-pattern":
          'url("data:image/svg+xml,%3Csvg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23D4A574" fill-opacity="0.12"%3E%3Cpath d="M60 60c16.569 0 30-13.431 30-30S76.569 0 60 0 30 13.431 30 30s13.431 30 30 30z"/%3E%3Cpath d="M0 0h20v20H0zM40 20h20v20H40zM20 40h20v20H20zM60 0h20v20H60zM100 20h20v20h-20zM80 40h20v20H80z" fill="%23059669" fill-opacity="0.06"/%3E%3Cpath d="M20 0l20 20L20 40 0 20z" fill="%23D4A574" fill-opacity="0.08"/%3E%3Cpath d="M80 60l20 20-20 20-20-20z" fill="%23D4A574" fill-opacity="0.08"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        card: "var(--shadow-card)",
        hero: "var(--shadow-hero)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "count-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 20px hsl(var(--primary) / 0.3)",
          },
          "50%": {
            boxShadow: "0 0 40px hsl(var(--primary) / 0.6)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "count-up": "count-up 0.6s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

