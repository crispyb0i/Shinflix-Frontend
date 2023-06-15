import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getMovieDetails } from "../../../api/TMDB";
import { LoadingSpinner } from "../../common";

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
				const response = await getMovieDetails(movieId);
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

	return (
		<>
			{loading ? (
				<div
					className={"flex flex-col min-h-screen items-center justify-center"}
				>
					<LoadingSpinner />
				</div>
			) : (
				<div className={"relative h-128"}>
					{/* <div className="absolute inset-0 bg-gradient-to-b from-gray-500 to-transparent opacity-25"></div> */}
					<div
						className="absolute inset-0 bg-cover bg-center"
						style={{
							backgroundImage: `url(${process.env.REACT_APP_TMDB_IMAGE_URL}${backdrop_path})`,
							opacity: 0.3, // Adjust the opacity value as needed (0.0 - 1.0)
							zIndex: "-10",
						}}
					></div>
					<div className={"flex p-20"}>
						<img
							src={`${process.env.REACT_APP_TMDB_IMAGE_URL}${poster_path}`}
							alt={`${title} backdrop`}
							className={"w-72 h-108  rounded-lg mr-20"}
						/>
						<div className="text-white-700 min-w-60 max-w-96 w-auto">
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

					{/* <p>{JSON.stringify(movieData)}</p> */}
				</div>
			)}
		</>
	);
};
