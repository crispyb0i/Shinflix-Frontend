import { auth } from "./firebase";

// Example function for user authentication
export const signUp = (email, password) => {
	return auth.createUserWithEmailAndPassword(email, password);
};

// Example function for user login
export const signIn = (email, password) => {
	return auth.signInWithEmailAndPassword(email, password);
};

// Example function for user logout
export const signOut = () => {
	return auth.signOut();
};

// Other authentication-related functions...
