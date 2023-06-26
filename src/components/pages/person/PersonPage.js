import { Link } from "react-router-dom";
import { LoadingSpinner } from "../../common";
import { MediaCard } from "../../blocks/MediaCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	fetchPersonDetails,
	fetchPersonSocials,
	fetchPersonCombinedCredits,
	// fetchPersonImages,
} from "../../../api/tmdb";

export const PersonPage = () => {
	const personID = useParams().personid;
	const [personDetails, setPersonDetails] = useState(null);
	const [personSocials, setPersonSocials] = useState(null);
	const [personCombinedCredits, setPersonCombinedCredits] = useState(null);
	const [loading, setLoading] = useState(true);
	// const [personImages, setPersonImages] = useState(null);

	useEffect(() => {
		const fetchPerson = async () => {
			try {
				const personDetailsResponse = await fetchPersonDetails(personID);
				setPersonDetails(personDetailsResponse);
				const personSocialsResponse = await fetchPersonSocials(personID);
				setPersonSocials(personSocialsResponse);
				const personCombinedCreditsResponse = await fetchPersonCombinedCredits(
					personID
				);
				setPersonCombinedCredits(personCombinedCreditsResponse);
				// const personImages = await fetchPersonImages(personID);
				// setPersonImages(personImages);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};
		fetchPerson();
	}, [personID]);

	const {
		// adult,
		also_known_as,
		biography,
		birthday,
		deathday,
		// gender,
		// homepage,
		// id,
		// imdb_id,
		known_for_department,
		name,
		place_of_birth,
		profile_path,
	} = personDetails || {};

	const {
		imdb_id,
		facebook_id,
		instagram_id,
		// tiktok_id,
		twitter_id,
		// youtube_id,
	} = personSocials || {};

	return (
		<>
			{loading ? (
				<div className="flex min-h-screen items-center justify-center">
					<LoadingSpinner />
				</div>
			) : (
				<div className="flex flex-row flex-grow-1 h-screen px-20 py-10 ">
					<div className="flex flex-col w-72 p-5 h-full ">
						{name && (
							<div>
								<img
									src={`${process.env.REACT_APP_TMDB_IMAGE_URL}${profile_path}`}
									alt={`${name} backdrop`}
									className={"flex-none w-72 h-108 rounded-lg"}
								/>
							</div>
						)}
						<div>
							{/* <h2 className="text-2xl font-bold my-2">Personal Info</h2> */}
							{personSocials && (
								<>
									<div class="container pt-9">
										<div class="mb-9 flex">
											{/* IMDB */}
											{imdb_id && (
												<a
													href={`https://www.imdb.com/name/${imdb_id}/`}
													class="mr-7 text-black "
													target="_blank"
													rel="noreferrer"
												>
													<svg
														role="img"
														class="h-5 w-5"
														viewBox="0 0 24 24"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path d="M14.31 9.588v.005c-.077-.048-.227-.07-.42-.07v4.815c.27 0 .44-.06.5-.165.062-.104.095-.405.095-.885v-2.866c0-.33-.004-.54-.033-.63-.022-.096-.067-.163-.14-.204zM22.416 0H1.62C.742.06.06.744 0 1.596V22.38c.06.874.712 1.542 1.555 1.617.015.003.03.003.045.003h20.845c.88-.088 1.55-.826 1.555-1.71V1.71C24 .82 23.305.07 22.416 0zM4.792 15.626H2.887V8.26h1.905v7.366zm6.54-.002H9.67v-4.97L9 15.623H7.812l-.698-4.86-.007 4.86H5.44V8.26h2.468c.083.523.16 1.048.23 1.574l.27 1.87.442-3.444h2.483v7.364zm4.977-2.18c0 .655-.044 1.094-.104 1.32-.062.22-.17.4-.326.52-.15.13-.34.218-.57.266-.223.045-.57.075-1.02.075l-.004-.002H11.98V8.26h1.426c.914 0 1.45.047 1.77.128.325.09.575.225.745.42.165.18.273.404.313.645.05.235.076.705.076 1.402v2.588zm4.944.475c0 .45-.045.764-.09.99-.06.224-.195.404-.405.568-.226.166-.48.24-.78.24-.22 0-.5-.06-.68-.136-.19-.094-.358-.237-.515-.427l-.116.47h-1.717V8.26l-.02-.003h1.8v2.4c.15-.175.315-.31.51-.4.196-.083.466-.127.69-.127.226-.003.45.036.66.115.17.07.32.185.436.33.09.125.15.27.18.42.03.138.044.43.044.87v2.054zM19.08 11.205c-.12 0-.194.04-.225.12-.03.08-.06.29-.06.624v1.946c0 .324.03.533.06.623.04.086.13.14.226.134.12 0 .272-.047.3-.14.03-.097.046-.32.046-.674l.03-.002v-1.89c0-.303-.015-.508-.06-.603-.044-.1-.195-.14-.315-.14z" />
													</svg>
												</a>
											)}
											{/* Facebook */}
											{facebook_id && (
												<a
													href={`https://www.facebook.com/${facebook_id}/`}
													class="mr-7 text-black "
													target="_blank"
													rel="noreferrer"
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														class="h-5 w-5"
														fill="currentColor"
														viewBox="0 0 24 24"
													>
														<path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
													</svg>
												</a>
											)}
											{/* Twitter */}
											{twitter_id && (
												<a
													href={`https://www.twitter.com/${twitter_id}/`}
													class="mr-7 text-black "
													target="_blank"
													rel="noreferrer"
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														class="h-5 w-5"
														fill="currentColor"
														viewBox="0 0 24 24"
													>
														<path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
													</svg>
												</a>
											)}
											{/* Instagram */}
											{instagram_id && (
												<a
													href={`https://www.instagram.com/${instagram_id}/`}
													class="mr-7 text-black "
													target="_blank"
													rel="noreferrer"
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														class="h-5 w-5"
														fill="currentColor"
														viewBox="0 0 24 24"
													>
														<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
													</svg>
												</a>
											)}
											{/* TODO - FIND AND ADD TIKTOK AND YOUTUBE SVGS */}
											{/* Tiktok  */}
											{/* <a
										href={`https://www.tiktok.com/${tiktok_id}/`}
										class="mr-7 text-black "
										target="_blank"
										rel="noreferrer"
									></a> */}
											{/* YouTube  */}
											{/* <a
										href={`https://www.tiktok.com/${tiktok_id}/`}
										class="mr-7 text-black "
										target="_blank"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-5 w-5"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
										</svg>
									</a> */}
										</div>
									</div>
								</>
							)}
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
							{also_known_as && also_known_as.length > 0 && (
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
							<h1 className="text-4xl font-bold">{name}</h1>
						</div>
						{biography && (
							<div>
								<h2 className="text-2xl font-bold mb-2">Biography</h2>
								<p>{biography}</p>
							</div>
						)}
						{personCombinedCredits && (
							<div className="my-5">
								<h1 className="text-2xl font-bold mb-5">Roles</h1>
								<div className="flex flex-row overflow-x-auto w-full">
									{personCombinedCredits.cast.map(
										({ name, title, poster_path, media_type, id }) => (
											<Link
												to={`/${media_type}/${id}`}
												key={`${id}${crypto.randomUUID()}`}
											>
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
						{/* {personImages && (
					<div>
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
					</div>
				)} */}
					</div>
				</div>
			)}
		</>
	);
};
