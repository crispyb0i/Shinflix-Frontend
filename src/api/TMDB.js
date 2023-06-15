const TMDB_API_URL = process.env.REACT_APP_TMDB_API_URL;

// options for API authentication
const options = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization: `Bearer ${process.env.REACT_APP_TMDB_AUTH_TOKEN}`,
	},
};

// TRENDING ALL

export const fetchTrendingAllByDay = async () => {
	try {
		const response = await fetch(`${TMDB_API_URL}/trending/all/day`, options);
		return response.json();
	} catch (err) {
		console.error(err);
		throw new Error("Failed to fetch trending all by day");
	}
};

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
		`${TMDB_API_URL}/search/multi?query=${query}&include_adult=${include_adult}&language=${language}&page=${page}`,
		options
	)
		.then((response) => response.json())
		.catch((err) => {
			console.err(err);
			throw new Error("Failed to perform multi-search");
		});

// Movie APIs
//Get the top level details of a movie by ID.

export const getMovieDetails = async (movie_id) => {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`,
			options
		);
		return response.json();
	} catch (err) {
		console.error(err);
		throw new Error("Failed to perform movie search");
	}
};

// IMAGE DOCUMENTATION
// https://developer.themoviedb.org/docs/image-basics
