import { useState, useEffect } from "react";
import { ShinflixLogo } from "../../../../src/assets/images";
import { multiSearch, fetchTrendingAllByDay } from "../../../api/tmdb/index";
import MediaCard from "../../template/MediaCard";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "../../common";

export const Home = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [trending, setTrending] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchTrendingByDay = async () => {
			setLoading(true);
			try {
				const response = await fetchTrendingAllByDay();
				setTrending(response.results);
				setLoading(false);
				console.log(response);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};
		fetchTrendingByDay();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await multiSearch(searchQuery, false);
			const results = response && response.results; // Check if response is defined before accessing the results property
			console.log("TEST", results);
			setSearchResults(results);
			setLoading(false);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (e) => {
		setSearchQuery(e.target.value);
	};

	return (
		<div className="flex flex-col flex-grow py-10 items-center justify-center dark:bg-gray-800 dark:text-white">
			<img src={ShinflixLogo} className={"sm:h-24 h-20 mb-4"} alt="logo" />
			<div className="my-3 w-1/2">
				<form onSubmit={handleSubmit} className={"mb-10"}>
					<div className="flex items-center py-2">
						<input
							type="text"
							className="p-2 sm:h-14 h-10 w-full border-2 focus:border-primary hover:border-gray-400 outline-none dark:bg-gray-700 rounded-l-lg text-lg"
							placeholder="Search for a movie, TV show, or person"
							name="search"
							autoComplete="off"
							value={searchQuery}
							onChange={handleChange}
							minLength={1}
						/>
						<button
							onSubmit={handleSubmit}
							className="flex-shrink-0 sm:h-14 h-10 bg-red-500 md:h-14 h-10 hover:bg-red-700 border-black-500 hover:border-black-700 text-sm border-1 text-white py-3 px-3 rounded-r-lg text-lg"
							type="submit"
						>
							Search
						</button>
					</div>
				</form>
			</div>
			<div>
				{loading ? (
					<LoadingSpinner />
				) : (
					trending && (
						<div className="flex flex-col mx-20 justify-center items-center overflow-scroll">
							<h1 className="text-4xl">Trending</h1>
							<div className="flex flex-row">
								{trending.map(
									({
										media_type,
										id,
										title,
										poster_path,
										release_date,
										name,
										profile_path,
									}) => (
										<Link to={`/${media_type}/${id}`} key={id}>
											<MediaCard
												title={title}
												media_type={media_type}
												poster_path={poster_path}
												release_date={release_date}
												name={name}
												profile_path={profile_path}
											/>
										</Link>
									)
								)}
							</div>
						</div>
					)
				)}
				{loading ? (
					<LoadingSpinner />
				) : (
					searchResults && (
						<div className="flex flex-row flex-wrap justify-center mx-20">
							{searchResults.map(
								({
									media_type,
									id,
									title,
									poster_path,
									release_date,
									name,
									profile_path,
								}) => (
									<Link to={`/${media_type}/${id}`} key={id}>
										<MediaCard
											title={title}
											media_type={media_type}
											poster_path={poster_path}
											release_date={release_date}
											name={name}
											profile_path={profile_path}
										/>
									</Link>
								)
							)}
						</div>
					)
				)}
			</div>
		</div>
	);
};
