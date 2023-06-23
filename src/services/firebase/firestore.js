import {
	collection,
	doc,
	updateDoc,
	getDocs,
	getDoc,
	setDoc,
	where,
	query,
	arrayUnion,
} from "firebase/firestore";
import { db } from "./firebase";

export const addToUserFavorites = async (user_id, mediaData) => {
	console.log(mediaData);
	const UserRef = doc(db, "users", user_id);
	// const favoritesRef = collection(UserRef, "favorites");
	// console.log("FAVORITES COLLECTION", favoritesCollection.data());
	await updateDoc(UserRef, {
		favorites: arrayUnion({
			backdrop_path: mediaData.backdrop_path || null,
			id: mediaData.id || null,
			media_type: mediaData.media_type || null,
			name: mediaData.name || null,
			poster_path: mediaData.poster_path || null,
			release_date: mediaData.release_date || null,
			tagline: mediaData.tagline || null,
			title: mediaData.title || null,
		}),
	});
};

export const handleFavoriteMedia = async (user_id, mediaData) => {
	const userDocRef = doc(db, "users", user_id);
	const querySnapshot = await getDoc(userDocRef);

	const userData = querySnapshot.data();
	const favoritesArray = userData.favorites || [];
	const foundObject = favoritesArray.find(
		(favorite) => favorite.id === mediaData.id
	);
	const updatedFavorites = favoritesArray.filter(
		(favorite) => favorite.id !== mediaData.id
	);

	if (foundObject) {
		await updateDoc(userDocRef, { favorites: updatedFavorites });
		console.log("removed from favs");
	} else {
		await addToUserFavorites(user_id, mediaData);
		console.log("added to favs");
	}
};

export const checkIfDisplayNameIsUnique = async (display_name) => {
	const userDocRef = collection(db, "users");
	const q = await query(userDocRef, where("displayName", "==", display_name));
	const users = await getDocs(q);
	users.forEach((user) => {
		if (user.data()) {
			throw new Error("Username already in use");
		}
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
	console.log("HIIIIIIIT", data);
	const userDocRef = doc(db, "users", user_id);
	console.log("HIT AGAIN");

	if (data.name) {
		console.log("DATA.NAME");
		const q = query(
			collection(db, "users"),
			where("displayName", "==", data.displayName),
			where("uid", "!=", user_id)
		);

		const querySnapshot = await getDocs(q);
		const users = querySnapshot.docs;

		const userExists = users.length > 0;
		if (userExists) {
			throw new Error("Username already in use");
		}
	}

	await updateDoc(userDocRef, {
		...data, // Update all fields in the document
		// updatedAt: serverTimestamp() // Optionally, update a timestamp field
	});

	console.log("User document updated successfully!");
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
