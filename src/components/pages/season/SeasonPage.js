import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	fetchSeasonDetails,
	fetchSeasonCredits,
	fetchSeasonImages,
} from "../../../api/tmdb";

export const SeasonPage = () => {
	const { tv_id, season_number } = useParams();
	console.log(tv_id, season_number);
	const [seasonDetails, setSeasonDetails] = useState(null);

	useEffect(() => {
		const fetchSeasonInfo = async () => {
			const seasonDetails = await fetchSeasonDetails(tv_id, season_number);
			setSeasonDetails(seasonDetails);
		};
		fetchSeasonInfo();
	}, []);

	console.log(seasonDetails);

	return <h1>SEASON PAGE</h1>;
};
