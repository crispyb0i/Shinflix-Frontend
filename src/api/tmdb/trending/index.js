import { tmdbApiOptions } from "../apiOptions";

// All the API calls for fetching Trending data for ALL media types

export const fetchTrendingAllByDay = async () => {
	try {
		const response = await fetch(
			`${process.env.REACT_APP_TMDB_API_URL}/trending/all/day`,
			tmdbApiOptions
		);
		return response.json();
	} catch (err) {
		console.error(err);
		throw new Error("Failed to fetch trending all by day");
	}
};

export const fetchTrendingAllByWeek = async () => {
	try {
		const response = await fetch(
			`${process.env.REACT_APP_TMDB_API_URL}/trending/all/week`,
			tmdbApiOptions
		);
		return response.json();
	} catch (err) {
		console.error(err);
		throw new Error("Failed to fetch trending all by week");
	}
};
