import { useState, useEffect } from "react";
import { ShinflixLogo } from "../../../../src/assets/images";
import { multiSearch, fetchTrendingAllByDay } from "../../../api/TMDB";
import MediaCard from "../../template/MediaCard";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "../../common";

export const Home = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState(null);
	const [trending, setTrending] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchTrendingByDay = async () => {
			setLoading(true);
			try {
				const response = await fetchTrendingAllByDay();
				setTrending(response);
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
		<div className="py-10 px-15 flex flex-col items-center justify-center dark:bg-gray-800 dark:text-white">
			<img src={ShinflixLogo} className={"h-24"} alt="logo" />
			<div className="my-3 w-1/2">
				<form onSubmit={handleSubmit} className={"mb-10"}>
					<div className="flex items-center py-2">
						<input
							type="text"
							className="p-2 w-full h-14 border-2 focus:border-primary hover:border-gray-400 outline-none dark:bg-gray-700 rounded-l-lg text-lg"
							placeholder="Search for a movie, TV show, or person"
							name="search"
							autoComplete="off"
							value={searchQuery}
							onChange={handleChange}
							minLength={1}
						/>
						<button
							onSubmit={handleSubmit}
							className="flex-shrink-0 bg-red-500 h-14 hover:bg-red-700 border-black-500 hover:border-black-700 text-sm border-1 text-white py-3 px-3 rounded-r-lg text-lg"
							type="submit"
						>
							Search
						</button>
					</div>
				</form>
			</div>
			<div>
				<h1>{JSON.stringify(trending)}</h1>
			</div>
			{loading ? (
				<LoadingSpinner />
			) : (
				searchResults && (
					<div className="flex flex-wrap justify-center mx-20">
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
	);
};
