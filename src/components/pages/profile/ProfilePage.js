import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import {
	VerticalTimeline,
	VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

export const ProfilePage = () => {
	const { currentUser } = useContext(AuthContext);
	const movieIcon = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			className="w-6 h-6 text-black"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"
			/>
		</svg>
	);

	return (
		<main className="flex flex-col flex-grow items-center justify-center bg-black-100">
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
											className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-4 ease-linear transition-all duration-150"
											type="button"
										>
											Connect
										</button>
										<button
											className="bg-blue-500 active:bg-blue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-4 ease-linear transition-all duration-150"
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
							<div className="text-center mt-4">
								<h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
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
							<div className="mt-10 py-10 border-t border-blueGray-200 text-center bg-emerald-100">
								<h1 className="text-3xl font-bold">Timeline</h1>
								{/* <div className="flex flex-wrap justify-center">
									<div className="w-full lg:w-9/12 px-4">
										<p className="mb-4 text-lg leading-relaxed text-blueGray-700">
											An artist of considerable range, Jenna the name taken by
											Melbourne-raised, Brooklyn-based Nick Murphy writes,
											performs and records all of his own music, giving it a
											warm, intimate feel with a solid groove structure. An
											artist of considerable range.
										</p>
										<a href="#pablo" className="font-normal text-pink-500">
											Show more
										</a>
									</div>
								</div> */}
								<VerticalTimeline>
									<VerticalTimelineElement
										className="vertical-timeline-element--work"
										contentStyle={{
											background: "white",
											color: "black",
										}}
										contentArrowStyle={{
											// borderRight: "7px solid rgb(33, 150, 243)",
											borderRight: "7px solid white",
										}}
										date="June 2023"
										iconStyle={{
											background: "white",
											color: "white",
										}}
										icon={movieIcon}
									>
										<h3 className="vertical-timeline-element-title py-3 mb-2 text-black text-2xl">
											Spider-Man: Across the Spider-Verse
										</h3>
										{/* <h4 className="vertical-timeline-element-subtitle">
											Miami, FL
										</h4> */}
										<img
											src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg"
											className="w-full m-auto rounded-lg"
										/>
										{/* <p>
											After reuniting with Gwen Stacy, Brooklyn’s full-time,
											friendly neighborhood Spider-Man is catapulted across the
											Multiverse, where he encounters the Spider Society, a team
											of Spider-People charged with protecting the Multiverse’s
											very existence. But when the heroes clash on how to handle
											a new threat, Miles finds himself pitted against the other
											Spiders and must set out on his own to save those he loves
											most.
										</p> */}
									</VerticalTimelineElement>
									<VerticalTimelineElement
										className="vertical-timeline-element--work"
										date="2010 - 2011"
										iconStyle={{
											background: "rgb(33, 150, 243)",
											color: "#fff",
										}}
										// icon={<WorkIcon />}
									>
										<h3 className="vertical-timeline-element-title">
											Art Director
										</h3>
										<h4 className="vertical-timeline-element-subtitle">
											San Francisco, CA
										</h4>
										<p>
											Creative Direction, User Experience, Visual Design, SEO,
											Online Marketing
										</p>
									</VerticalTimelineElement>
									<VerticalTimelineElement
										className="vertical-timeline-element--work"
										date="2008 - 2010"
										iconStyle={{
											background: "rgb(33, 150, 243)",
											color: "#fff",
										}}
										// icon={<WorkIcon />}
									>
										<h3 className="vertical-timeline-element-title">
											Web Designer
										</h3>
										<h4 className="vertical-timeline-element-subtitle">
											Los Angeles, CA
										</h4>
										<p>User Experience, Visual Design</p>
									</VerticalTimelineElement>
									<VerticalTimelineElement
										className="vertical-timeline-element--work"
										date="2006 - 2008"
										iconStyle={{
											background: "rgb(33, 150, 243)",
											color: "#fff",
										}}
										// icon={<WorkIcon />}
									>
										<h3 className="vertical-timeline-element-title">
											Web Designer
										</h3>
										<h4 className="vertical-timeline-element-subtitle">
											San Francisco, CA
										</h4>
										<p>User Experience, Visual Design</p>
									</VerticalTimelineElement>
									<VerticalTimelineElement
										className="vertical-timeline-element--education"
										date="April 2013"
										iconStyle={{
											background: "rgb(233, 30, 99)",
											color: "#fff",
										}}
										// icon={<SchoolIcon />}
									>
										<h3 className="vertical-timeline-element-title">
											Content Marketing for Web, Mobile and Social Media
										</h3>
										<h4 className="vertical-timeline-element-subtitle">
											Online Course
										</h4>
										<p>Strategy, Social Media</p>
									</VerticalTimelineElement>
									<VerticalTimelineElement
										className="vertical-timeline-element--education"
										date="November 2012"
										iconStyle={{
											background: "rgb(233, 30, 99)",
											color: "#fff",
										}}
										// icon={<SchoolIcon />}
									>
										<h3 className="vertical-timeline-element-title">
											Agile Development Scrum Master
										</h3>
										<h4 className="vertical-timeline-element-subtitle">
											Certification
										</h4>
										<p>Creative Direction, User Experience, Visual Design</p>
									</VerticalTimelineElement>
									<VerticalTimelineElement
										className="vertical-timeline-element--education"
										date="2002 - 2006"
										iconStyle={{
											background: "rgb(233, 30, 99)",
											color: "#fff",
										}}
										// icon={<SchoolIcon />}
									>
										<h3 className="vertical-timeline-element-title">
											Bachelor of Science in Interactive Digital Media Visual
											Imaging
										</h3>
										<h4 className="vertical-timeline-element-subtitle">
											Bachelor Degree
										</h4>
										<p>Creative Direction, Visual Design</p>
									</VerticalTimelineElement>
									<VerticalTimelineElement
										iconStyle={{
											background: "rgb(16, 204, 82)",
											color: "#fff",
										}}
										// icon={<StarIcon />}
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
