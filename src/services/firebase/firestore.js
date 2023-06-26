import {
	arrayUnion,
	collection,
	doc,
	getDoc,
	getDocs,
	limit,
	query,
	serverTimestamp,
	setDoc,
	updateDoc,
	where,
} from "firebase/firestore";
import { db } from "./firebase";

// Create a Firestore object when a user registers
export const addNewUserToFirestore = async (uid, email) => {
	return await setDoc(doc(db, "users", uid), {
		createdDate: serverTimestamp(),
		email: email,
		displayName: uid,
		favorites: [],
		followers: {
			count: 0,
			users: [],
		},
		following: {
			count: 0,
			users: [],
		},
		journalEntries: [],
		photoURL: null,
		uid,
	});
};

export const addToUserFavorites = async (user_id, mediaData) => {
	const UserRef = doc(db, "users", user_id);
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

export const findUserByID = async (user_id) => {
	const usersRef = doc(db, "users", user_id);
	const userDoc = await getDoc(usersRef);
	if (userDoc.exists()) {
		return userDoc.data();
	} else {
		console.error("User not found");
	}
};

export const findUserByUsername = async (username) => {
	const q = query(
		collection(db, "users"),
		where("displayName", "==", username),
		limit(1)
	);

	const querySnapshot = await getDocs(q);
	const user = querySnapshot.docs.map((doc) => doc.data());

	if (user.empty) {
		throw new Error("Username doesn't exist");
	}

	return user[0];
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
	} else {
		await addToUserFavorites(user_id, mediaData);
	}
};

export const updateUserDocument = async (user_id, data) => {
	const userDocRef = doc(db, "users", user_id);

	if (data.name) {
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
		updatedAt: serverTimestamp(), // Optionally, update a timestamp field
	});
};
