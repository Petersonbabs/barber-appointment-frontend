/** @type {import('tailwindcss').Config} */


export default {
	darkMode: "media",
	content: ["./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",],
	theme: {
		extend: {
			colors: {
				//    
				blue: {
					500: "#79B5EC",
					600: "#152432",
				},
				red: {
					500: "#F37877",
					600: "#3E1716",
					700: "#F24E43",
				},
				light: {
					200: "#E8E9E9",
				},
				dark: {
					200: "#0D0F10",
					300: "#131619",
					400: "#1A1D21",
					500: "#363A3D",
					600: "#76828D",
					700: "#ABB8C4",
				},
			},

			backgroundImage: {
				appointments: "url('/assets/images/appointments-bg.png')",
				pending: "url('/assets/images/pending-bg.png')",
				cancelled: "url('/assets/images/cancelled-bg.png')",
				button: 'linear-gradient(90deg, rgba(32,26,89,1) 0%, rgba(9,9,121,1) 35%, rgba(140,95,248,1) 100%)',
				'instagram-gradient': 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
				'insta-sunset': 'linear-gradient(45deg, #fdc830, #f37335)',
				'insta-vibrant': 'linear-gradient(45deg, #f58529, #dd2a7b, #8134af, #515bd4)',
				'insta-deep': 'linear-gradient(45deg, #ff512f, #dd2476)',
				'insta-warm': 'linear-gradient(45deg, #fa709a, #fee140)',
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
				"caret-blink": {
					"0%,70%,100%": { opacity: "1" },
					"20%,50%": { opacity: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"caret-blink": "caret-blink 1.25s ease-out infinite",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
}

