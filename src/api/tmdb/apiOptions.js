export const tmdbApiOptions = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization: `Bearer ${process.env.REACT_APP_TMDB_AUTH_TOKEN}`,
	},
};
