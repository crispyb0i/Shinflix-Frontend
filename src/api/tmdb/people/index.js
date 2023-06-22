import { tmdbApiOptions } from "../apiOptions";

export const fetchPersonDetails = async (person_id) => {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/person/${person_id}`,
			tmdbApiOptions
		);
		return response.json();
	} catch (err) {
		console.error(err);
		throw new Error("Failed to perform show search");
	}
};

export const fetchPersonSocials = async (person_id) => {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/person/${person_id}/external_ids`,
			tmdbApiOptions
		);
		return response.json();
	} catch (err) {
		console.error(err);
		throw new Error("Failed to fetch socials");
	}
};

export const fetchPersonCombinedCredits = async (person_id) => {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/person/${person_id}/combined_credits`,
			tmdbApiOptions
		);
		return response.json();
	} catch (err) {
		console.error(err);
		throw new Error("Failed to fetch combined credits");
	}
};

export const fetchPersonImages = async (person_id) => {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/person/${person_id}/images`,
			tmdbApiOptions
		);
		return response.json();
	} catch (err) {
		console.error(err);
		throw new Error("Failed to fetch images");
	}
};
