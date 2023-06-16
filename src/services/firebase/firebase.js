import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "@firebase/storage";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
	measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

// import { initializeApp } from "firebase/app";

// import { getAuth } from "firebase/auth";
// import {
// 	collection,
// 	getFirestore,
// 	addDoc,
// 	doc,
// 	updateDoc,
// 	arrayRemove,
// 	getDoc,
// } from "firebase/firestore";
// import {
// 	getStorage,
// 	ref,
// 	uploadBytes,
// 	getDownloadURL,
// } from "@firebase/storage";

// const firebaseConfig = {
// 	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
// 	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
// 	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
// 	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
// 	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
// 	appId: process.env.REACT_APP_FIREBASE_APP_ID,
// 	measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const storage = getStorage(app);
// const db = getFirestore(app);
// const userRef = collection(db, "users");
// const favoritesRef = collection(db, "favorites");

// // Firebase FIRESTORE DATABASE related code
// const addUserToFirestore = async (user) => {
// 	const docRef = await ref(userRef);
// 	addDoc(docRef, {
// 		username: user.username,
// 		id: user.id,
// 		journal: {},
// 		favorites: {},
// 	});
// };

// export const addToUserFavorites = async (user_id, movie) => {
// 	console.log("Movie:", movie); // Log the movie object for debugging

// 	if (!movie || typeof movie !== "object") {
// 		throw new Error("Invalid movie object provided");
// 	}

// 	const favoritesCollection = collection(db, "favorites");
// 	await addDoc(favoritesCollection, {
// 		user_id,
// 		favorite: {
// 			movie,
// 		},
// 	});

// 	const userDocRef = doc(db, "users", user_id); // Use doc() to get a reference to the user document

// 	// Retrieve the existing favorites array from the user document
// 	const userDoc = await getDoc(userDocRef);
// 	const existingFavorites = userDoc.data().favorites;

// 	// Check if the movie already exists in the favorites array
// 	const isDuplicate = existingFavorites.some((fav) => fav.id === movie.id);

// 	if (!isDuplicate) {
// 		// Append the new favorite to the existing favorites array
// 		const updatedFavorites = [...existingFavorites, movie];

// 		// Update the document with the updated favorites array
// 		await updateDoc(userDocRef, {
// 			favorites: updatedFavorites,
// 		});
// 	}
// };

// // Firebase STORAGE related code
// export const uploadFile = (image, path = "images") => {
// 	if (image == null) return Promise.reject("No image provided");

// 	const imageRef = ref(storage, `${path}/${image.name + crypto.randomUUID()}`);

// 	return uploadBytes(imageRef, image).then((snapshot) => {
// 		return getDownloadURL(snapshot.ref);
// 	});
// };
