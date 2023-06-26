import { Link } from "react-router-dom";
import { LoadingSpinner } from "../../utils";
import { MediaCard } from "../../blocks/MediaCard";
import { fetchTrendingAllByDay, multiSearch } from "../../../api/tmdb/index";
import { ShinflixLogo } from "../../../../src/assets/images";
import { useState, useEffect } from "react";

export const Home = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState(null);
	const [trending, setTrending] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchTrendingByDay = async () => {
			setLoading(true);
			try {
				const response = await fetchTrendingAllByDay();
				setTrending(response.results);
				setLoading(false);
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
		if (searchQuery.length <= 0) return;
		setLoading(true);
		try {
			const response = await multiSearch(searchQuery, false);
			const results = response && response.results;
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
		<div className="flex flex-col flex-grow p-10 items-center justify-center w-full">
			<img src={ShinflixLogo} className={"sm:h-24 h-20 mb-4"} alt="logo" />
			<div className="my-2 w-full p-12 max-w-4xl">
				<form onSubmit={handleSubmit} className={"mb-10"}>
					<div className="flex items-center py-2">
						<input
							type="text"
							className="p-2 sm:h-14 h-10 w-full border-2 focus:border-primary hover:border-gray-400 outline-none rounded-l-lg text-lg"
							placeholder="Search media"
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
			<div className="w-screen">
				{loading ? (
					<div className="flex items-center justify-center">
						<LoadingSpinner />
					</div>
				) : (
					<div className="w-full px-10">
						{trending && !searchResults && (
							<div className="flex flex-col m-auto pt-10 px-5">
								<h1 className="text-3xl mb-10 text-left">Trending</h1>
								<div className="flex flex-row overflow-x-auto w-full">
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
													key={id}
												/>
											</Link>
										)
									)}
								</div>
							</div>
						)}
						{searchResults && (
							<>
								<div className="mb-10">
									{searchResults.length ? (
										<h1 className="text-center text-xl font-bold">
											Showing search results for "{searchQuery}"
										</h1>
									) : (
										<p className="font-bold text-center">No results found</p>
									)}
								</div>
								<div className="flex flex-row flex-wrap justify-center mx-auto max-w-5xl">
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
							</>
						)}
					</div>
				)}
			</div>
		</div>
	);
};
