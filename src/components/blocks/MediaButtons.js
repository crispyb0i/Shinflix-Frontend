import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
	addToUserFavorites,
	handleFavoriteMedia,
} from "../../services/firebase/firestore";

export const MediaButtons = ({ mediaData }) => {
	const authContext = useContext(AuthContext);
	const { currentUser, currentUserData } = authContext;
	const [favorited, setFavorited] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (currentUserData && mediaData) {
			console.log("HHHHH", mediaData);
			const favorites = currentUserData.favorites;
			for (let i = 0; i < favorites.length; i++) {
				if (favorites[i].id === mediaData.id) setFavorited(true);
			}
		}
	}, [currentUserData, mediaData]);

	const handleWatched = async () => {
		console.log("clicked watch");
	};

	const handleFavorite = async () => {
		if (!currentUser) {
			navigate("/login");
			return;
		}
		try {
			// await addToUserFavorites(currentUser.uid, mediaData);
			await handleFavoriteMedia(currentUser.uid, mediaData);
			setFavorited(!favorited);
		} catch (error) {
			console.error("ERROR adding to favorites ", error);
		}
	};
	const handleJournal = () => {
		console.log("handleJournal clicked");
	};

	const buttonStyle =
		"flex justify-center items-center mr-1 rounded-lg h-12 w-12 hover:text-white";
	const svgStyle = "w-8 h-8";
	return (
		<div className="flex flex-row mt-10">
			{/* Favorite */}
			<button onClick={handleFavorite} className={buttonStyle}>
				{!favorited ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className={svgStyle}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
						/>
					</svg>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className={svgStyle}
					>
						<path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
					</svg>
				)}
			</button>
			{/* Journal */}
			<button onClick={handleJournal} className={buttonStyle}>
				{true ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className={svgStyle}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
						/>
					</svg>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className={svgStyle}
					>
						<path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
					</svg>
				)}
			</button>
			<button className={buttonStyle} onClick={handleWatched}>
				{true ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className={svgStyle}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
						/>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className={svgStyle}
					>
						<path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
						<path
							fillRule="evenodd"
							d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
							clipRule="evenodd"
						/>
					</svg>
				)}
			</button>
		</div>
	);
};
