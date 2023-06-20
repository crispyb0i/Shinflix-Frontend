import {
	collection,
	doc,
	updateDoc,
	getDoc,
	addDoc,
	setDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export const addToUserFavorites = async (user_id, movie) => {
	const favoritesCollection = collection(db, "favorites");
	await addDoc(favoritesCollection, {
		user_id,
		favorite: {
			movie,
		},
	});

	const userDocRef = doc(db, "users", user_id);
	const userDoc = await getDoc(userDocRef);
	if (userDoc.exists()) {
		const existingFavorites = userDoc.data().favorites;
		const isDuplicate = existingFavorites.some((fav) => fav.id === movie.id);

		if (!isDuplicate) {
			const updatedFavorites = [...existingFavorites, movie];
			await updateDoc(userDocRef, {
				favorites: updatedFavorites,
			});
		}
	}
};

export const addNewUser = async (uid, email) => {
	await setDoc(doc(db, "users", uid), {
		email: email,
		displayName: uid,
		favorites: {},
		photoURL: null,
		uid,
	});
};

export const updateUserDocument = async (user_id, data) => {
	const userDocRef = doc(db, "users", user_id);
	await updateDoc(userDocRef, data);
};

export const getUserDocument = async (user_id) => {
	const userDocRef = doc(db, "users", user_id);
	const userDoc = await getDoc(userDocRef);
	if (userDoc.exists()) {
		return userDoc.data();
	} else {
		throw new Error("User document not found");
	}
};

// Other Firestore-related functions...
