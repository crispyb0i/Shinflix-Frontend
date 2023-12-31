import { Link, useParams } from "react-router-dom";
import { LoadingSpinner, VideoModal } from "../../utils";
import { MediaButtons } from "../../blocks/MediaButtons";
import { MediaCard } from "../../blocks/MediaCard";
import { useState, useEffect } from "react";
import {
	fetchShowDetails,
	fetchShowImages,
	fetchShowCredits,
	fetchShowVideos,
} from "../../../api/tmdb";

export const TvPage = () => {
	const showID = useParams().tvid;
	const [loading, setLoading] = useState(false);
	const [tvData, setTvData] = useState(null);
	const [tvImages, setTvImages] = useState(null);
	const [tvCredits, setTvCredits] = useState(null);
	const [tvVideos, setTvVideos] = useState(null);
	const {
		backdrop_path,
		genres,
		id,
		name,
		seasons,
		overview,
		poster_path,
		release_date,
		tagline,
	} = tvData || {};

	useEffect(() => {
		const fetchMovieData = async () => {
			setLoading(true);
			try {
				const tvDetailResponse = await fetchShowDetails(showID);
				setTvData(tvDetailResponse);
				const creditsResponse = await fetchShowCredits(showID);
				setTvCredits(creditsResponse.cast);
				const showImages = await fetchShowImages(showID);
				setTvImages(showImages);
				const showVideos = await fetchShowVideos(showID);
				setTvVideos(showVideos.results);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};
		fetchMovieData();
	}, [showID]);

	return (
		<>
			{loading ? (
				<div className={"flex min-h-screen items-center justify-center"}>
					<LoadingSpinner />
				</div>
			) : (
				<div>
					<div className={"relative h-128 border-b-2 border-#726a5c"}>
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
								alt={`${name} backdrop`}
								className={"flex-none w-72 h-108 rounded-lg shadow-lg"}
							/>
							<div className="text-white-700 hidden md:block ml-20">
								<h1 className={"text-5xl font-bold"}>{name}</h1>
								{tagline && <p className={"py-3 mb-3"}>{tagline}</p>}
								{genres && (
									<div className={"mb-3 italic"}>
										{genres.map((genre) => (
											<span key={genre.name}>{genre.name} </span>
										))}
									</div>
								)}

								{release_date && (
									<>
										<h4 className="text-xl font-bold">Release Date</h4>
										<p className="mb-3">{release_date}</p>
										<h4 className="text-xl font-bold">Overview</h4>
									</>
								)}

								<p>{overview}</p>
								<MediaButtons mediaData={tvData} />
							</div>
						</div>
					</div>
					<div className="text-white-700 block md:hidden mx-10 my-20">
						<h1 className={"text-5xl font-bold"}>{name}</h1>
						{tagline && <p className={"py-3 mb-3"}>{tagline}</p>}
						{genres && (
							<div className={"mb-3 italic"}>
								{genres.map((genre) => (
									<span key={genre.name}>{genre.name} </span>
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
					{tvCredits && tvCredits.length > 0 && (
						<div>
							<div className="flex flex-col m-auto pt-10 pl-6 shadow-lg">
								<h1 className="text-3xl mb-10 font-bold">Cast</h1>
								<div className="flex flex-row overflow-x-auto w-full">
									{tvCredits.map(
										({ id, title, profile_path, name, release_date }) => (
											<Link to={`/person/${id}`} key={id}>
												<MediaCard
													title={title}
													media_type={"person"}
													profile_path={profile_path}
													name={name}
													release_date={release_date}
												/>
											</Link>
										)
									)}
								</div>
							</div>
						</div>
					)}
					{tvVideos && tvVideos.length > 0 && (
						<div className="flex flex-col m-auto pt-10 px-5">
							<h1 className="text-3xl mb-10 font-bold">Videos</h1>
							<div className="flex flex-row overflow-x-auto">
								{tvVideos.map((video) => (
									<div key={video.key} className="mr-4">
										<VideoModal videoSrc={video.key} />
									</div>
								))}
							</div>
						</div>
					)}
					{seasons && (
						<div>
							<div className="flex flex-col m-auto pt-10 pl-6">
								<h1 className="text-3xl mb-10 font-bold">Seasons</h1>
								<div className="flex flex-row overflow-x-auto w-full">
									{seasons.map(({ name, poster_path, season_number }) => (
										<a
											href={`/tv/${id}/season/${season_number}`}
											key={season_number}
											target="_blank"
											rel="noreferrer"
										>
											<MediaCard
												title={name}
												media_type={"tv"}
												poster_path={poster_path}
												name={name}
											/>
										</a>
									))}
								</div>
							</div>
						</div>
					)}
					{tvImages && (
						<div className="flex flex-col justify-center items-center bg-black-800">
							{tvImages && tvImages.backdrops.length > 0 && (
								<>
									<h1 className="text-3xl m-auto my-10 font-bold">Backdrops</h1>
									<div className="flex flex-row flex-wrap justify-center">
										{tvImages.backdrops.map((image) => (
											<a
												href={`${process.env.REACT_APP_TMDB_IMAGE_URL}${image.file_path}`}
												key={image.file_path}
												target="_blank"
												rel="noreferrer"
											>
												<img
													className="w-96"
													src={`${process.env.REACT_APP_TMDB_IMAGE_URL}${image.file_path}`}
													alt="backdrop"
												/>
											</a>
										))}
									</div>
								</>
							)}
							<div className="flex flex-col justify-center items-center">
								<h1 className="text-3xl m-auto my-10 font-bold">Posters</h1>
								<div className="flex flex-row flex-wrap justify-center">
									{tvImages.posters.map((image) => (
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

// adult,
// first_air_date,
// homepage,
// original_language,
// original_title,
// popularity,
// production_companies,
// production_countries,
// revenue,
// runtime,
// spoken_languages,
// status,
// title,
// video,
// vote_average,
// vote_count,
