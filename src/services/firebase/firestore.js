import {
	collection,
	doc,
	updateDoc,
	getDocs,
	getDoc,
	addDoc,
	setDoc,
	where,
	query,
	arrayUnion,
} from "firebase/firestore";
import { db } from "./firebase";

export const addToUserFavorites = async (user_id, movie) => {
	const UserRef = doc(db, "users", user_id);
	// const favoritesRef = collection(UserRef, "favorites");
	// console.log("FAVORITES COLLECTION", favoritesCollection.data());
	await updateDoc(UserRef, {
		favorites: arrayUnion({
			backdrop_path: movie.backdrop_path,
			homepage: movie.homepage,
			id: movie.id,
			imdb_id: movie.imdb_id,
			overview: movie.overview,
			poster_path: movie.poster_path,
			release_date: movie.release_date,
			tagline: movie.tagline,
			title: movie.title,
		}),
	});
};

export const addNewUserToFirestore = async (uid, email) => {
	return await setDoc(doc(db, "users", uid), {
		email: email,
		displayName: uid,
		favorites: [],
		photoURL: null,
		uid,
	});
};

export const updateUserDocument = async (user_id, data) => {
	const userDocRef = doc(db, "users", user_id);
	await updateDoc(userDocRef, data);
};

export const findUserByID = async (user_id) => {
	const usersRef = doc(db, "users", user_id);
	const userDoc = await getDoc(usersRef);
	if (userDoc.exists()) {
		return userDoc.data();
	} else {
		console.log("User not found");
	}
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
