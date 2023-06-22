import { tmdbApiOptions } from "../apiOptions";

// Movie APIs - Get the top level details of a movie by ID.

// To implement videos from API response
// Youtube: https://www.youtube.com/watch?v=h6hZkvrFIj0
// Vimeo: https://vimeo.com/282875052

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

export const fetchMovieCredits = async (movie_id) => {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/${movie_id}/credits`,
			tmdbApiOptions
		);
		return response.json();
	} catch (err) {
		console.error(err);
		throw new Error("Failed to perform credit search");
	}
};

export const fetchMovieImages = async (movie_id) => {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/${movie_id}/images`,
			tmdbApiOptions
		);
		return response.json();
	} catch (err) {
		console.error(err);
		throw new Error("Failed to perform image search");
	}
};
