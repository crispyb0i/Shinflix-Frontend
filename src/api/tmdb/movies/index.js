import { tmdbApiOptions } from "../apiOptions";

// Movie APIs - Get the top level details of a movie by ID.

export const fetchMovieDetails = async (movie_id) => {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`,
			tmdbApiOptions
		);
		return response.json();
	} catch (err) {
		console.error(err);
		throw new Error("Failed to perform movie search");
	}
};
