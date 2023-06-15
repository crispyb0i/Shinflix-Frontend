import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [user, setUser] = useState(null);

	useEffect(() => {
		// Check if the user is logged in from local storage
		const isLoggedIn = localStorage.getItem("loggedIn") === "true";
		if (isLoggedIn) {
			setLoggedIn(isLoggedIn);
			fetch("http://localhost:8000/fetchUser", { credentials: "include" })
				.then((res) => res.json())
				.then((data) => console.log("FETCH USER DATA", data));
		}
	}, [loggedIn]);

	const login = (credentials) => {
		fetch("http://localhost:8000/login", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(credentials),
		})
			.then((res) => {
				if (res.ok) {
					console.log(res.json()); // Return the promise
				} else {
					throw new Error("Login failed"); // Throw an error to be caught in the catch block
				}
			})
			.then((data) => {
				console.log(data);
				setLoggedIn(true);
				setUser(data);
				localStorage.setItem("loggedIn", "true");
			})
			.catch((error) => {
				console.log("ERROR", error);
			});
	};

	const logout = () => {
		fetch("http://localhost:8000/logout", {
			method: "POST",
			credentials: "include",
		})
			.then((res) => {
				if (res.ok) {
					console.log("success");
					setLoggedIn(false);
					setUser(null);
					localStorage.removeItem("loggedIn");
				} else {
					console.error("Logout failed");
				}
			})
			.catch((err) => {
				console.error("Error occurred during logout: ", err);
			});
	};

	return (
		<AuthContext.Provider value={{ loggedIn, login, logout, user }}>
			{children}
		</AuthContext.Provider>
	);
};
