import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	fetchSeasonDetails,
	// fetchSeasonCredits,
	// fetchSeasonImages,
} from "../../../api/tmdb";

export const SeasonPage = () => {
	const { tv_id, season_number } = useParams();
	// console.log(tv_id, season_number);
	// eslint-disable-next-line no-unused-vars
	const [seasonDetails, setSeasonDetails] = useState(null);

	useEffect(() => {
		const fetchSeasonInfo = async () => {
			const seasonDetails = await fetchSeasonDetails(tv_id, season_number);
			setSeasonDetails(seasonDetails);
		};
		fetchSeasonInfo();
	}, [season_number, tv_id]);

	// console.log(seasonDetails);

	return <h1>SEASON PAGE</h1>;
};
