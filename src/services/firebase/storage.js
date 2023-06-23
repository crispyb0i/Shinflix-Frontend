import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Example function for uploading a file to Firebase Storage
export const uploadFile = (image, path = "images") => {
	if (image == null) return Promise.reject("No image provided");

	const imageRef = ref(storage, `${path}/${image.name + crypto.randomUUID()}`);

	return uploadBytes(imageRef, image).then((snapshot) => {
		return getDownloadURL(snapshot.ref);
	});
};
