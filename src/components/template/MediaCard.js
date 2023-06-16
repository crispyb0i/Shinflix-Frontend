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
		<div key={id} className={"w-40 p-5"}>
			<div className={"w-100"}>
				<img
					src={image_url}
					alt={`${title}`}
					className={"rounded-lg"}
					onError={handleImageError}
				/>
			</div>

			<div>
				<h1>{title || name}</h1>
				<p>{release_date}</p>
			</div>
		</div>
	);
};

export default MediaCard;
