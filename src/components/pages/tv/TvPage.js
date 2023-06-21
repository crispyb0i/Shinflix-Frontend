import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
	fetchShowDetails,
	fetchShowImages,
	fetchShowCredits,
} from "../../../api/tmdb";
import { LoadingSpinner } from "../../common";
import MediaCard from "../../blocks/MediaCard";
import { MediaButtons } from "../../blocks/MediaButtons";

export const TvPage = () => {
	const showId = useParams().tvid;
	const [loading, setLoading] = useState(false);
	const [tvData, setTvData] = useState(null);
	const [tvImages, setTvImages] = useState(null);
	const [tvCredits, setTvCredits] = useState(null);
	const {
		adult,
		backdrop_path,
		first_air_date,
		genres,
		homepage,
		id,
		name,
		seasons,
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
	} = tvData || {};

	useEffect(() => {
		const fetchMovieData = async () => {
			setLoading(true);
			try {
				const tvDetailResponse = await fetchShowDetails(showId);
				setTvData(tvDetailResponse);
				const creditsResponse = await fetchShowCredits(showId);
				setTvCredits(creditsResponse.cast);
				const showImages = await fetchShowImages(showId);
				setTvImages(showImages);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};
		fetchMovieData();
	}, []);

	return (
		<>
			{loading ? (
				<div className={"flex min-h-screen items-center justify-center"}>
					<LoadingSpinner />
				</div>
			) : (
				<div>
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
								alt={`${name} backdrop`}
								className={"flex-none w-72 h-108  rounded-lg"}
							/>
							<div className="text-white-700 hidden md:block ml-20">
								<h1 className={"text-5xl font-bold"}>{name}</h1>
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
								<MediaButtons mediaData={tvData} />
							</div>
						</div>
					</div>
					<div className="text-white-700 block md:hidden ml-20 my-20">
						<h1 className={"text-5xl font-bold"}>{name}</h1>
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
						<MediaButtons mediaData={tvData} />
					</div>

					{/* CREDITS */}
					{tvCredits && (
						<div>
							<div className="flex flex-col m-auto bg-gray-200 items-center pt-10">
								<h1 className="text-3xl mb-10 font-bold">Cast</h1>
								<div className="flex flex-row overflow-x-auto w-full">
									{tvCredits.map(({ id, title, profile_path, name }) => (
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
					{seasons && (
						<div>
							<div className="flex flex-col m-auto bg-gray-200 items-center pt-10">
								<h1 className="text-3xl mb-10 font-bold">Seasons</h1>
								<div className="flex flex-row overflow-x-auto w-full">
									{seasons.map(({ name, poster_path, season_number }) => (
										<Link
											to={`/tv/${id}/season/${season_number}`}
											key={season_number}
										>
											<MediaCard
												title={name}
												media_type={"tv"}
												poster_path={poster_path}
												name={name}
											/>
										</Link>
									))}
								</div>
							</div>
						</div>
					)}
					{tvImages && (
						<div className="flex flex-col justify-center items-center bg-black-800">
							<h1 className="text-3xl m-auto my-10 font-bold">Backdrops</h1>
							<div className="flex flex-row flex-wrap justify-center">
								{tvImages.backdrops.map((image) => (
									<Link
										to={`${process.env.REACT_APP_TMDB_IMAGE_URL}${image.file_path}`}
									>
										<img
											className="w-96"
											src={`${process.env.REACT_APP_TMDB_IMAGE_URL}${image.file_path}`}
											alt="backdrop"
										/>
									</Link>
								))}
							</div>
							<div className="flex flex-col justify-center items-center">
								<h1 className="text-3xl m-auto my-10 font-bold">Posters</h1>
								<div className="flex flex-row flex-wrap justify-center">
									{tvImages.posters.map((image) => (
										<Link
											to={`${process.env.REACT_APP_TMDB_IMAGE_URL}${image.file_path}`}
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
				</div>
			)}
		</>
	);
};
