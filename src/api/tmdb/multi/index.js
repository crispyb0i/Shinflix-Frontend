import { tmdbApiOptions } from "../apiOptions";
// MULTI SEARCH API
// Use multi search when you want to search for
// movies, TV shows and people in a single request.

export const multiSearch = (
	query,
	include_adult = false,
	language = "en-US",
	page = 1
) =>
	fetch(
		`${process.env.REACT_APP_TMDB_API_URL}/search/multi?query=${query}&include_adult=${include_adult}&language=${language}&page=${page}`,
		tmdbApiOptions
	)
		.then((response) => response.json())
		.catch((err) => {
			console.err(err);
			throw new Error("Failed to perform multi-search");
		});
