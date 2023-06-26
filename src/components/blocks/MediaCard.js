import { useState } from "react";
import { formatDate } from "../utils";

export const MediaCard = ({
	id,
	media_type,
	poster_path,
	title,
	release_date,
	profile_path,
	name,
}) => {
	const [imageError, setImageError] = useState(false);

	const formattedDate = formatDate(release_date) || null;

	const handleImageError = () => {
		setImageError(true);
	};

	let image_url = `${process.env.REACT_APP_TMDB_IMAGE_URL}${
		profile_path || poster_path
	}`;
	if (imageError) {
		// Set a default image URL when the original image fails to load
		// TODO: Upload a default image on Fire Storage and use that image link
		image_url =
			"https://moviereelist.com/wp-content/uploads/2019/07/poster-placeholder.jpg";
	}

	return (
		<div key={id} className={"w-40 h-88 mx-2 mb-4"} dir="ltr">
			<div className={"w-full"}>
				<img
					src={image_url}
					alt={`${title || name}`}
					className={"w-full rounded-lg shadow-xl"}
					onError={handleImageError}
				/>
			</div>

			<div className="p-3">
				<h1 className="font-bold text-sm max-h-10 overflow-hidden">
					{title || name}
				</h1>
				<p className="mt-1 text-sm font-light">{formattedDate}</p>
			</div>
		</div>
	);
};
