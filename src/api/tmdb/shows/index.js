import { tmdbApiOptions } from "../apiOptions";

// Movie APIs - Get the top level details of a movie by ID.

export const fetchShowDetails = async (tv_id) => {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/tv/${tv_id}`,
			tmdbApiOptions
		);
		return response.json();
	} catch (err) {
		console.error(err);
		throw new Error("Failed to perform show search");
	}
};

export const fetchShowCredits = async (tv_id) => {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/tv/${tv_id}/aggregate_credits`,
			tmdbApiOptions
		);
		return response.json();
	} catch (err) {
		console.error(err);
		throw new Error("Failed to perform credit search");
	}
};

export const fetchShowImages = async (tv_id) => {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/tv/${tv_id}/images`,
			tmdbApiOptions
		);
		return response.json();
	} catch (err) {
		console.error(err);
		throw new Error("Failed to perform image search");
	}
};
