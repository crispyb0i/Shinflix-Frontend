import { AuthContext } from "../../contexts/AuthContext";
import { handleFavoriteMedia } from "../../services/firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export const MediaButtons = ({ mediaData }) => {
	const authContext = useContext(AuthContext);
	const { currentUser, currentUserData } = authContext;
	const [favorited, setFavorited] = useState(false);
	const media_type = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (currentUserData && mediaData) {
			const favorites = currentUserData.favorites;
			for (let i = 0; i < favorites.length; i++) {
				if (favorites[i].id === mediaData.id) setFavorited(true);
			}
		}
	}, [currentUserData, mediaData]);

	const handleFavorite = async () => {
		if (!currentUser) {
			navigate("/login");
			return;
		}
		const newFavorited = !favorited; // Store the new value in a variable

		setFavorited(newFavorited); // Update the state immediately

		try {
			// await addToUserFavorites(currentUser.uid, mediaData);
			await handleFavoriteMedia(currentUser.uid, {
				...mediaData,
				media_type: media_type.tvid ? "tv" : "movie",
			});
		} catch (error) {
			setFavorited(!newFavorited); // Revert the state back to the previous value
			console.error("ERROR adding to favorites ", error);
		}
	};

	const handleJournal = () => {};

	const buttonStyle = "flex items-center mr-1 rounded-lg h-12 w-12";
	const svgStyle = "w-8 h-8";
	return (
		<div className="flex flex-row mt-10">
			{/* Favorite Icon*/}
			<button
				onClick={handleFavorite}
				className={buttonStyle + " hover:text-gray-500"}
			>
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
						className={svgStyle + " text-red-700"}
					>
						<path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
					</svg>
				)}
			</button>
			{/* Journal Icon */}
			<button
				onClick={handleJournal}
				className={buttonStyle + " hover:text-blue-700"}
			>
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
						className={svgStyle + " text-blue-700"}
					>
						<path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
					</svg>
				)}
			</button>
		</div>
	);
};
