import { useParams } from "react-router";

export const MoviePage = () => {
	const params = useParams();
	const movieId = params.movieid;
	console.log(movieId);
	return (
		<div>
			<h1>MOVIE PAGE</h1>
		</div>
	);
};
