const TMDB_API_URL = process.env.REACT_APP_TMDB_API_URL;

const options = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization: `Bearer ${process.env.REACT_APP_TMDB_AUTH_TOKEN}`,
	},
};

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

//https://api.themoviedb.org/3/search/multi?query=toy&include_adult=false&language=en-US&page=1

// "results": [
//   {
//       "adult": false,
//       "backdrop_path": null,
//       "id": 936958,
//       "name": "Hello Yasothorn Collection",
//       "original_language": "en",
//       "original_name": "Hello Yasothorn Collection",
//       "overview": "The story is set in 1967 in Yasothon Province, Thailand, where Yam is a hard-working, humble, and kind farmer—kind, that is, except when it comes to the attentions of Joei, the homely maid of Soy, who is the girlfriend of Yam's cousin, Tong. Yam nurses stray and injured animals of all kinds, but he never has nice things to say to Joei. Despite this, she persists in flirting with Yam and making unwanted physical advances. Meanwhile, Soy and Tong cuddle, kiss and hug each other at every opportunity.",
//       "poster_path": null
//   },
// ],

// IMAGE DOCUMENTATION
// https://developer.themoviedb.org/docs/image-basics
