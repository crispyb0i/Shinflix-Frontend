import { useState } from "react";

const MediaCard = ({
	id,
	media_type,
	poster_path,
	title,
	release_date,
	profile_path,
	name,
}) => {
	const [imageError, setImageError] = useState(false);

	const handleImageError = () => {
		console.log("HANDLEIMAGEERROR");
		setImageError(true);
	};

	let image_url = `${process.env.REACT_APP_TMDB_IMAGE_URL}${
		profile_path || poster_path
	}`;
	if (imageError) {
		// Set a default image URL when the original image fails to load
		image_url =
			"https://moviereelist.com/wp-content/uploads/2019/07/poster-placeholder.jpg";
	}

	return (
		<div key={id} className={"w-36 h-88 mr-5 mb-4"} dir="ltr">
			<div className={"w-full"}>
				<img
					src={image_url}
					alt={`${title || name}`}
					className={"w-full rounded-lg shadow-lg"}
					onError={handleImageError}
				/>
			</div>

			<div className="p-3">
				<h1 className="font-bold">{title || name}</h1>
				<p className="mt-1">{release_date}</p>
			</div>
		</div>
	);
};

export default MediaCard;
