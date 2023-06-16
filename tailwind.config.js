/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	mode: "jit",
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			margin: {
				0: "0",
			},
			padding: {
				0: "0",
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
