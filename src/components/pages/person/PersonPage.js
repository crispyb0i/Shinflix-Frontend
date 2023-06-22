import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	fetchPersonDetails,
	fetchPersonSocials,
	fetchPersonCombinedCredits,
	fetchPersonImages,
} from "../../../api/tmdb";
import MediaCard from "../../blocks/MediaCard";
import { Link } from "react-router-dom";

export const PersonPage = () => {
	const personID = useParams().personid;
	const [personDetails, setPersonDetails] = useState(null);
	const [personSocials, setPersonSocials] = useState(null);
	const [personCombinedCredits, setPersonCombinedCredits] = useState(null);
	const [personImages, setPersonImages] = useState(null);

	useEffect(() => {
		const fetchPerson = async () => {
			const personDetailsResponse = await fetchPersonDetails(personID);
			setPersonDetails(personDetailsResponse);
			const personSocialsResponse = await fetchPersonSocials(personID);
			setPersonSocials(personSocialsResponse);
			const personCombinedCreditsResponse = await fetchPersonCombinedCredits(
				personID
			);
			setPersonCombinedCredits(personCombinedCreditsResponse);
			const personImages = await fetchPersonImages(personID);
			setPersonImages(personImages);
		};
		fetchPerson();
	}, []);

	const {
		adult,
		also_known_as,
		biography,
		birthday,
		deathday,
		gender,
		homepage,
		id,
		imdb_id,
		known_for_department,
		name,
		place_of_birth,
		profile_path,
	} = personDetails || {};

	return (
		<div className="flex flex-row flex-grow-1 h-screen px-20 py-10">
			<div className="flex flex-col w-72 p-5 h-full">
				<div className="">
					<img
						src={`${process.env.REACT_APP_TMDB_IMAGE_URL}${profile_path}`}
						alt={`${name} backdrop`}
						className={"flex-none w-72 h-108 rounded-lg"}
					/>
				</div>
				<div>
					<h2 className="text-2xl font-bold my-2">Personal Info</h2>
					{known_for_department && (
						<div className="mb-4">
							<h4 className="font-bold">Known For</h4>
							<p>{known_for_department}</p>
						</div>
					)}
					{birthday && (
						<div className="mb-4">
							<h4 className="font-bold">Birthday</h4>
							<p>{birthday}</p>
						</div>
					)}
					{deathday && (
						<div className="mb-4">
							<h4 className="font-bold">Deathday</h4>
							<p>{deathday}</p>
						</div>
					)}
					{place_of_birth && (
						<div className="mb-4">
							<h4 className="font-bold">Place of Birth</h4>
							<p>{place_of_birth}</p>
						</div>
					)}
					{also_known_as && (
						<div className="mb-4">
							<h4 className="font-bold">Also Known As</h4>
							{also_known_as.map((name) => (
								<p>{name}</p>
							))}
						</div>
					)}
				</div>
			</div>
			<div className="flex flex-col h-full w-3/4 p-10">
				<div className="mb-6">
					<h1 className="text-4xl">{name}</h1>
				</div>
				<div>
					<h2 className="text-2xl font-bold mb-2">Biography</h2>
					<p>{biography}</p>
				</div>
				{personCombinedCredits && (
					<div className="my-10">
						<h1 className="text-2xl font-bold mb-5">Roles</h1>
						<div className="flex flex-row overflow-x-auto w-full">
							{personCombinedCredits.cast.map(
								({ name, title, poster_path, media_type, id }) => (
									<Link to={`/${media_type}/${id}`} key={id}>
										<MediaCard
											title={title}
											media_type={media_type}
											poster_path={poster_path}
											name={name}
										/>
									</Link>
								)
							)}
						</div>
					</div>
				)}
				{personImages && (
					<>
						<h1 className="text-2xl m-auto my-10 font-bold">Images</h1>
						<div className="flex flex-row flex-wrap justify-center">
							{personImages.profiles.map((image) => (
								<Link
									to={`${process.env.REACT_APP_TMDB_IMAGE_URL}${image.file_path}`}
								>
									<img
										className="w-48"
										src={`${process.env.REACT_APP_TMDB_IMAGE_URL}${image.file_path}`}
										alt="backdrop"
									/>
								</Link>
							))}
						</div>
					</>
				)}
			</div>
		</div>
	);
};
