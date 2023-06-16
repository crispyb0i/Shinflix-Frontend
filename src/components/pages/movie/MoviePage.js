import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { fetchMovieDetails } from "../../../api/tmdb/index";
import { LoadingSpinner } from "../../common";
import { addToUserFavorites } from "../../../services/firebase/firestore";

export const MoviePage = () => {
	const [movieData, setMovieData] = useState(null);
	const [loading, setLoading] = useState(false);
	const movieId = useParams().movieid;
	const {
		adult,
		backdrop_path,
		belongs_to_collection,
		budget,
		genres,
		homepage,
		id,
		imdb_id,
		original_language,
		original_title,
		overview,
		popularity,
		poster_path,
		production_companies,
		production_countries,
		release_date,
		revenue,
		runtime,
		spoken_languages,
		status,
		tagline,
		title,
		video,
		vote_average,
		vote_count,
	} = movieData || {};

	useEffect(() => {
		const fetchMovieData = async () => {
			setLoading(true);
			try {
				const response = await fetchMovieDetails(movieId);
				setMovieData(response);
				setLoading(false);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};
		fetchMovieData();
	}, []);

	console.log(movieData);

	const handleFavorite = async () => {
		console.log("HANDLE FAVORITE");
		try {
			await addToUserFavorites("3fVeoMn3XURhHmnVG5ea", {
				title,
				id,
				poster_path,
			});
			console.log("ADDED TO FAVORITES");
		} catch (error) {
			console.error("ERROR adding to favorites ", error);
		}
	};

	return (
		<>
			{loading ? (
				<div className={"flex min-h-screen items-center justify-center"}>
					<LoadingSpinner />
				</div>
			) : (
				<div className={"relative h-128  border-b-2 border-#726a5c"}>
					<div
						className="absolute inset-0 bg-cover bg-center from-pink-500 hover:to-yellow-500"
						style={{
							backgroundImage: backdrop_path
								? `url(${process.env.REACT_APP_TMDB_IMAGE_URL}${backdrop_path})`
								: "linear-gradient(to bottom, white, red)",
							opacity: backdrop_path && 0.2, // Adjust the opacity value as needed (0.0 - 1.0)
							zIndex: "-9999",
						}}
					></div>
					<div className={"flex p-20 justify-center"}>
						<img
							src={`${process.env.REACT_APP_TMDB_IMAGE_URL}${poster_path}`}
							alt={`${title} backdrop`}
							className={"flex-none w-72 h-108  rounded-lg"}
						/>
						<div className="text-white-700 hidden md:block ml-20">
							<h1 className={"text-5xl font-bold"}>{title}</h1>
							{tagline && <p className={"py-3 mb-3"}>{tagline}</p>}
							{genres && (
								<div className={"mb-3 italic"}>
									{genres.map((genre) => (
										<span key={genre.id}>{genre.name} </span>
									))}
								</div>
							)}
							<h4 className="text-xl font-bold">Release Date</h4>

							{release_date && (
								<>
									<p className="mb-3">{release_date}</p>
									<h4 className="text-xl font-bold">Overview</h4>
								</>
							)}

							<p>{overview}</p>
						</div>
					</div>
					<button onClick={handleFavorite} className={"h20 w20"}>
						FAVORITE
					</button>
				</div>
			)}
		</>
	);
};
