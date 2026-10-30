import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		fontFamily: {
			heading: ['"Inter Tight"', 'Golos Text', 'sans-serif'],
			body: ['Golos Text', 'sans-serif'],
			oswald: ['Oswald', 'sans-serif'],
		},
		extend: {
			colors: {
				brand: {
					blue: '#2A7FFF',
					'blue-light': '#4DA8FF',
					'blue-dark': '#1A2A3A',
					'sky': '#E6F4FF',
				},
				ink: {
					DEFAULT: '#1A2A3A',
					soft: '#4A5868',
					mute: '#5E6B79',
				},
				night: {
					DEFAULT: '#0A1628',
					mid: '#1A3356',
					text: '#C5CFDA',
					mute: '#9AA8B8',
				},
				paper: {
					DEFAULT: '#F6F5F1',
					alt: '#EFEDE7',
					line: '#E3E1DA',
				},
				alert: {
					DEFAULT: '#B91C1C',
					night: '#F87171',
				},
				blue: {
					50:  '#E6F4FF',
					100: '#D9EBFF',
					200: '#B3D6FF',
					300: '#7DB8FF',
					400: '#4DA8FF',
					500: '#2A7FFF',
					600: '#1A6FEF',
					700: '#1558CC',
					800: '#1044A3',
					900: '#0C337A',
					950: '#081E4D',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
			},
			transitionTimingFunction: {
				quint: 'cubic-bezier(0.22, 1, 0.36, 1)',
			},
			maxWidth: {
				site: '1240px',
			},
			borderRadius: {
				card: '20px',
				ctl: '14px',
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-up': {
					from: { opacity: '0', transform: 'translateY(30px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				'slide-left': {
					from: { opacity: '0', transform: 'translateX(-30px)' },
					to: { opacity: '1', transform: 'translateX(0)' }
				},
				'scale-in': {
					from: { opacity: '0', transform: 'scale(0.9)' },
					to: { opacity: '1', transform: 'scale(1)' }
				},
				'blink': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.2' }
				},
				'car-drive': {
					from: { transform: 'translateY(0)' },
					to: { transform: 'translateY(calc(100vh - 60px))' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-up': 'fade-up 0.6s ease-out forwards',
				'fade-in': 'fade-in 0.5s ease-out forwards',
				'slide-left': 'slide-left 0.6s ease-out forwards',
				'scale-in': 'scale-in 0.5s ease-out forwards',
				'blink': 'blink 0.6s ease-in-out infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;