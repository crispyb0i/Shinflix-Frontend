import { tmdbApiOptions } from "../apiOptions";

// Movie APIs - Get the top level details of a movie by ID.

export const fetchSeasonDetails = async (tv_id, season_number) => {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/tv/${tv_id}/season/${season_number}`,
			tmdbApiOptions
		);
		return response.json();
	} catch (err) {
		console.error(err);
		throw new Error("Failed to perform image search");
	}
};

export const fetchSeasonCredits = async (tv_id, season_number) => {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/tv/${tv_id}/season/${season_number}/credits`,
			tmdbApiOptions
		);
		return response.json();
	} catch (error) {
		throw new Error("failed to fetch season credits");
	}
};

export const fetchSeasonImages = async (tv_id, season_number) => {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/tv/${tv_id}/season/${season_number}/images`,
			tmdbApiOptions
		);
		return response.json();
	} catch (error) {
		throw new Error("failed to fetch season images");
	}
};

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

export const fetchShowVideos = async (tv_id) => {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/tv/${tv_id}/videos`,
			tmdbApiOptions
		);
		return response.json();
	} catch (error) {
		throw new Error("Failed to perform video search");
	}
};
