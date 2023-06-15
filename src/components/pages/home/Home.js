import { useState } from "react";
import { ShinflixLogo } from "../../../../src/assets/images";
import { multiSearch } from "../../../api/TMDB";
import MediaCard from "../../template/MediaCard";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "../../common";

export const Home = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState(null);
	const [loading, setLoading] = useState(false);

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
		<div className="py-10 px-15 flex flex-col min-h-screen items-center justify-center dark:bg-gray-800 dark:text-white">
			<img src={ShinflixLogo} className={"h-24"} alt="logo" />
			<div className="my-3 w-1/2">
				<form onSubmit={handleSubmit} className={"mb-10"}>
					<div className="flex items-center py-2">
						<input
							type="text"
							className="p-2 w-full border-2 focus:border-primary hover:border-gray-400 outline-none dark:bg-gray-700"
							placeholder="Enter search query"
							name="search"
							autoComplete="off"
							value={searchQuery}
							onChange={handleChange}
							minLength={1}
						/>
						<button
							onSubmit={handleSubmit}
							className="flex-shrink-0 bg-red-500 hover:bg-red-700 border-black-500 hover:border-black-700 text-sm border-1 text-white py-3 px-3"
							type="submit"
						>
							Submit
						</button>
					</div>
				</form>
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
