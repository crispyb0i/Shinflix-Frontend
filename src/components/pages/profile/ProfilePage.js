import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import {
	VerticalTimeline,
	VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import MediaCard from "../../blocks/MediaCard";

export const ProfilePage = () => {
	const { currentUser } = useContext(AuthContext);
	const movieIcon = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke="currentColor"
			className="w-6 h-6 text-black"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"
			/>
		</svg>
	);

	const starIcon = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className="w-6 h-6"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
			/>
		</svg>
	);

	return (
		<main className="flex flex-col flex-grow bg-black-100">
			<section className="relative bg-blueGray-200">
				<div className="container mx-auto px-4">
					<div className="relative flex flex-col break-words bg-white w-full my-12 shadow-2xl rounded-lg">
						<div className="px-6 rounded-lg">
							<div className="flex flex-wrap pt-12 justify-center items-center">
								<div className="lg:w-3/12 px-4 lg:order-2 flex justify-center">
									<img
										alt="..."
										src={
											currentUser.photoURL
												? `${currentUser.photoURL}`
												: `https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg`
										}
										className="border-black object-cover shadow-2xl rounded-full w-48 h-48 items-center border-none max-w-150-px"
									/>
								</div>
								<div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
									<div className="py-6 px-3 mt-6 sm:mt-0 text-center">
										<button
											className="mx-2 bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-4 ease-linear transition-all duration-150"
											type="button"
										>
											Connect
										</button>
										<button
											className="mx-2 bg-blue-500 active:bg-blue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-4 ease-linear transition-all duration-150"
											type="button"
										>
											Message
										</button>
									</div>
								</div>
								<div className="w-full lg:w-4/12 px-4 lg:order-1">
									<div className="flex justify-center py-4 lg:pt-4">
										<div className=" w-24 p-3 text-center">
											<span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
												22
											</span>
											<span className="text-sm text-blueGray-400">Friends</span>
										</div>
										<div className=" w-24 p-3 text-center">
											<span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
												10
											</span>
											<span className="text-sm text-blueGray-400">Photos</span>
										</div>
										<div className=" w-24 lg:mr-4 p-3 text-center">
											<span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
												89
											</span>
											<span className="text-sm text-blueGray-400">
												Comments
											</span>
										</div>
									</div>
								</div>
							</div>
							<div className="mt-4">
								<h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2 text-center ">
									{currentUser.displayName}
								</h3>
								{/* <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
									<i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
									Los Angeles, California
								</div>
								<div className="mb-2 text-blueGray-600 mt-10">
									<i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
									Solution Manager - Creative Tim Officer
								</div>
								<div className="mb-2 text-blueGray-600">
									<i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
									University of Computer Science
								</div> */}
							</div>
							<div className="mt-20 py-10 rounded-xl shadow-lg border-blueGray-200 bg-emerald-100">
								<h1 className="text-3xl font-bold my-10 text-center">
									Watch Timeline
								</h1>
								<VerticalTimeline>
									<VerticalTimelineElement
										className=""
										contentStyle={{
											background: "white",
											color: "black",
										}}
										// contentArrowStyle={{
										// 	// borderRight: "7px solid white",
										// 	borderRight: "7px solid white",
										// }}
										date="June 2023"
										dateClassName={""}
										iconStyle={{
											background: "white",
											color: "white",
										}}
										icon={movieIcon}
									>
										<div className="flex justify-center mt-10">
											<MediaCard
												name={"Spider-Man: Across the Spider-Verse"}
												poster_path="/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg"
												release_date="June 26, 2023"
											/>
										</div>
									</VerticalTimelineElement>
									<VerticalTimelineElement
										className=""
										date="2010"
										dateClassName={""}
										iconStyle={{
											background: "white",
											color: "#fff",
										}}
										icon={movieIcon}
									>
										<div className="flex justify-center mt-10">
											<MediaCard
												name={"Spider-Man: Across the Spider-Verse"}
												poster_path="/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg"
												release_date="June 26, 2023"
											/>
										</div>
									</VerticalTimelineElement>
									<VerticalTimelineElement
										className=""
										date="2008 - 2010"
										iconStyle={{
											background: "white",
											color: "#fff",
										}}
										icon={movieIcon}
									>
										<div className="flex justify-center mt-10">
											<MediaCard
												name={"Spider-Man: Across the Spider-Verse"}
												poster_path="/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg"
												release_date="June 26, 2023"
											/>
										</div>
									</VerticalTimelineElement>
									<VerticalTimelineElement
										className=""
										date="2006 - 2008"
										iconStyle={{
											background: "white",
											color: "#fff",
										}}
										icon={movieIcon}
									>
										<div className="flex justify-center mt-10">
											<MediaCard
												name={"Spider-Man: Across the Spider-Verse"}
												poster_path="/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg"
												release_date="June 26, 2023"
											/>
										</div>
									</VerticalTimelineElement>
									<VerticalTimelineElement
										className="vertical-timeline-element--education"
										date="April 2013"
										iconStyle={{
											background: "white",
											color: "#fff",
										}}
										icon={movieIcon}
									>
										<div className="flex justify-center mt-10">
											<MediaCard
												name={"Spider-Man: Across the Spider-Verse"}
												poster_path="/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg"
												release_date="June 26, 2023"
											/>
										</div>
									</VerticalTimelineElement>
									<VerticalTimelineElement
										className="vertical-timeline-element--education"
										date="November 2012"
										iconStyle={{
											background: "white",
											color: "#fff",
										}}
										icon={movieIcon}
									>
										<div className="flex justify-center mt-10">
											<MediaCard
												name={"Spider-Man: Across the Spider-Verse"}
												poster_path="/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg"
												release_date="June 26, 2023"
											/>
										</div>
									</VerticalTimelineElement>
									<VerticalTimelineElement
										className="vertical-timeline-element--education"
										date="2002 - 2006"
										iconStyle={{
											background: "white",
											color: "#fff",
										}}
										icon={movieIcon}
									>
										<div className="flex justify-center mt-10">
											<MediaCard
												name={"Spider-Man: Across the Spider-Verse"}
												poster_path="/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg"
												release_date="June 26, 2023"
											/>
										</div>
									</VerticalTimelineElement>
									<VerticalTimelineElement
										iconStyle={{
											background: "rgb(16, 204, 82)",
											color: "#fff",
										}}
										icon={starIcon}
									/>
								</VerticalTimeline>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};
