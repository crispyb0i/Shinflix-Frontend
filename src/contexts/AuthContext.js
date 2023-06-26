import { auth } from "../services/firebase/firebase";
import { createContext, useState, useEffect } from "react";
import { getStorage, ref, deleteObject } from "firebase/storage";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	sendPasswordResetEmail,
	updateEmail,
	updatePassword,
	updateProfile,
} from "@firebase/auth";
import {
	addNewUserToFirestore,
	findUserByID,
	updateUserDocument,
} from "../services/firebase/firestore";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [currentUserData, setCurrentUserData] = useState(null);
	const [loading, setLoading] = useState(true);

	const addNewUser = (uid, email) => addNewUserToFirestore(uid, email);

	const deleteUserProfilePicture = async (url_path) => {
		const storage = getStorage();
		const startIndex = url_path.lastIndexOf("%2F") + 3;
		const endIndex = url_path.lastIndexOf("?alt=media");
		const filename = url_path.substring(startIndex, endIndex);
		const profilePictureRef = ref(storage, `profile-pictures/${filename}`);
		try {
			await deleteObject(profilePictureRef);
			console.log("Profile picture deleted");
			// Additional actions after deleting the profile picture
			await updateProfile(auth.currentUser, { photoURL: "" });
			setCurrentUser((prev) => ({ ...prev, photoURL: null }));
		} catch (error) {
			console.error("Error deleting profile picture:", error);
		}
	};

	const login = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const logout = () => {
		return signOut(auth);
	};

	const resetPassword = (email) => {
		return sendPasswordResetEmail(auth, email);
	};

	const updateUserDisplayName = async (display_name) => {
		try {
			await updateProfile(auth.currentUser, { displayName: display_name });
			const updatedUser = auth.currentUser; // Fetch the updated user profile
			setCurrentUser(updatedUser); // Update the local state with the updated user profile
			console.log("Username successfully updated!");
		} catch (error) {
			console.error("Error updating username:", error);
		}
	};

	const updateUserEmail = async (email) => {
		try {
			await updateEmail(auth.currentUser, email);
			setCurrentUser((prev) => ({ ...prev, email }));
		} catch (error) {}
	};

	const updateUserPassword = (password) => {
		updatePassword(auth.currentUser, password);
	};

	const updateUserProfilePicture = async (image_url) => {
		try {
			await updateProfile(auth.currentUser, { photoURL: image_url });
			setCurrentUser((prev) => ({ ...prev, photoURL: image_url }));
			await updateUserDocument(auth.currentUser.uid, {
				photoURL: image_url,
			});
			console.log("Profile picture updated successfully!");
		} catch (error) {
			console.error("Error updating profile picture:", error);
		}
	};

	const signup = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			user
				? findUserByID(user.uid).then((user) => {
						setCurrentUserData(user);
				  })
				: setCurrentUserData(null);
			setLoading(false);
		});
		return unsubscribe;
	}, []);

	const value = {
		addNewUser,
		currentUser,
		currentUserData,
		deleteUserProfilePicture,
		signup,
		login,
		logout,
		resetPassword,
		updateUserEmail,
		updateUserPassword,
		updateUserProfilePicture,
		updateUserDisplayName,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};
