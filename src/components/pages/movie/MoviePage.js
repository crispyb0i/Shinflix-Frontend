import { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
	fetchMovieDetails,
	fetchMovieCredits,
	fetchMovieImages,
	fetchMovieVideos,
} from "../../../api/tmdb/index";
import { LoadingSpinner, VideoModal } from "../../common";
import { Link } from "react-router-dom";
import MediaCard from "../../blocks/MediaCard";
import { MediaButtons } from "../../blocks/MediaButtons";

export const MoviePage = () => {
	const [movieData, setMovieData] = useState(null);
	const [movieCredits, setMovieCredits] = useState(null);
	const [movieImages, setMovieImages] = useState(null);
	const [movieVideos, setMovieVideos] = useState(null);
	const [loading, setLoading] = useState(false);
	const movieID = useParams().movieid;
	const {
		// adult,
		backdrop_path,
		// belongs_to_collection,
		// budget,
		genres,
		// homepage,
		// id,
		// imdb_id,
		// original_language,
		// original_title,
		overview,
		// popularity,
		poster_path,
		// production_companies,
		// production_countries,
		release_date,
		// revenue,
		// runtime,
		// spoken_languages,
		// status,
		tagline,
		title,
		// video,
		// vote_average,
		// vote_count,
	} = movieData || {};

	useEffect(() => {
		const fetchMovieData = async () => {
			setLoading(true);
			try {
				const movieDetailsResponse = await fetchMovieDetails(movieID);
				setMovieData(movieDetailsResponse);
				const creditsResponse = await fetchMovieCredits(movieID);
				setMovieCredits(creditsResponse.cast);
				const movieImages = await fetchMovieImages(movieID);
				setMovieImages(movieImages);
				const movieVideos = await fetchMovieVideos(movieID);
				setMovieVideos(movieVideos.results);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};
		fetchMovieData();
	}, [movieID]);

	console.log(movieData);
	return (
		<>
			{loading ? (
				<div className={"flex min-h-screen items-center justify-center"}>
					<LoadingSpinner />
				</div>
			) : (
				<div>
					<div className={"relative border-b-2 border-#726a5c"}>
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
						<div className={"flex p-20 justify-center items-center"}>
							<img
								src={`${process.env.REACT_APP_TMDB_IMAGE_URL}${poster_path}`}
								alt={`${title} backdrop`}
								className={"flex-none w-72 rounded-lg shadow-lg"}
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
								<MediaButtons mediaData={movieData} />
							</div>
						</div>
					</div>
					<div className="text-black-700 block md:hidden mx-5 my-20">
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
						<MediaButtons mediaData={movieData} />
					</div>
					{/* CREDITS */}
					{movieCredits && movieCredits.length > 0 && (
						<div>
							<div className="flex flex-col m-auto pt-10 px-5 shadow-lg">
								<h1 className="text-3xl mb-10 font-bold">Cast</h1>
								<div className="flex flex-row overflow-x-auto w-full">
									{movieCredits.map(({ id, title, profile_path, name }) => (
										<Link to={`/person/${id}`} key={id}>
											<MediaCard
												title={title}
												media_type={"person"}
												profile_path={profile_path}
												name={name}
											/>
										</Link>
									))}
								</div>
							</div>
						</div>
					)}
					{movieVideos && movieVideos.length > 0 && (
						<div className="flex flex-col m-auto pt-10 px-5">
							<h1 className="text-3xl mb-10 font-bold">Videos</h1>
							<div className="flex flex-row overflow-x-auto">
								{movieVideos.map((video) => (
									<div key={video.key} className="mr-4">
										<VideoModal videoSrc={video.key} />
									</div>
								))}
							</div>
						</div>
					)}
					{movieImages && (
						<div className="flex flex-col justify-center items-center">
							{movieImages.backdrops.length > 0 && (
								<>
									<h1 className="text-3xl m-auto my-10 font-bold">Backdrops</h1>
									<div className="flex flex-row flex-wrap justify-center">
										{movieImages.backdrops.map((image) => (
											<Link
												to={`${process.env.REACT_APP_TMDB_IMAGE_URL}${image.file_path}`}
												key={image.file_path}
											>
												<img
													className="w-96"
													src={`${process.env.REACT_APP_TMDB_IMAGE_URL}${image.file_path}`}
													alt="backdrop"
												/>
											</Link>
										))}
									</div>
								</>
							)}
							<div className="flex flex-col justify-center items-center">
								<h1 className="text-3xl m-auto my-10 font-bold">Posters</h1>
								<div className="flex flex-row flex-wrap justify-center">
									{movieImages.posters.map((image) => (
										<Link
											to={`${process.env.REACT_APP_TMDB_IMAGE_URL}${image.file_path}`}
											key={image.file_path}
										>
											<img
												className="w-60"
												src={`${process.env.REACT_APP_TMDB_IMAGE_URL}${image.file_path}`}
												alt="poster"
											/>
										</Link>
									))}
								</div>
							</div>
						</div>
					)}
					{/* ADD PADDING TO END OF PAGE */}
					<div className="h-40"></div>
				</div>
			)}
		</>
	);
};
