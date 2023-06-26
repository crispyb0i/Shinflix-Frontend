import { createContext, useEffect, useState } from "react";

const getInitialTheme = () => {
	if (typeof window !== "undefined" && window.localStorage) {
		const storedTheme = window.localStorage.getItem("wallet-theme");
		if (typeof storedTheme === "string") {
			return storedTheme;
		}

		const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
		if (userMedia.matches) {
			return "dark";
		}
	}

	return "light"; // light theme as the default;
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ initialTheme, children }) => {
	const [theme, setTheme] = useState(getInitialTheme);

	const rawSetTheme = (rawTheme) => {
		const root = window.document.documentElement;
		const isDark = rawTheme === "dark";

		root.classList.remove(isDark ? "light" : "dark");
		root.classList.add(rawTheme);

		localStorage.setItem("wallet-theme", rawTheme);
	};

	if (initialTheme) {
		rawSetTheme(initialTheme);
	}

	useEffect(() => {
		rawSetTheme(theme);
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
