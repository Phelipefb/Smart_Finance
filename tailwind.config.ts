import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        secondary: 'var(--secondary-button)',
        'secondary-button': 'var(--secondary-button)',
        'muted-foreground': 'var(--muted-foreground)',
        'muted-primary': 'var(--muted-primary)',
        foreground: 'var(--foreground)',
        background: 'var(--background)',
        border: 'var(--border)',
        card: 'var(--card)',
        input: 'var(--input)',
      },
    },
  },
} satisfies Config
