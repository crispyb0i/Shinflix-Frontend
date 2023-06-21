import { AuthContext } from "../../contexts/AuthContext";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShinflixLogo } from "../../../src/assets/images";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useLocation } from "react-router-dom";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
	const [navigation, setNavigation] = useState([
		{ name: "Home", href: "/", current: false },
		{ name: "Movies", href: "/movies", current: false },
		{ name: "Shows", href: "/shows", current: false },
		{ name: "People", href: "/people", current: false },
	]);

	const { currentUser, currentUserData } = useContext(AuthContext);
	const currentPage = useLocation().pathname;

	useEffect(() => {
		const updatedNav = navigation.map((item) => ({
			...item,
			current: item.href === currentPage,
		}));
		setNavigation(updatedNav);
	}, [currentPage]);

	return (
		<Disclosure
			as="nav"
			className="bg-gray-800 sticky top-0 border-b-2 border-indigo-500 z-50"
		>
			{({ open }) => (
				<>
					<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
						<div className="relative flex h-16 items-center justify-between">
							<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
								{/* Mobile menu button*/}
								<Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
									<span className="sr-only">Open main menu</span>
									{open ? (
										<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
									) : (
										<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
									)}
								</Disclosure.Button>
							</div>
							<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
								<Link className="flex flex-shrink-0 items-center" to={"/"}>
									<img
										className="block h-8 w-auto lg:hidden"
										src={ShinflixLogo}
										alt="Shinflix"
									/>
									<img
										className="hidden h-8 w-auto lg:block"
										src={ShinflixLogo}
										alt="Shinflix"
									/>
								</Link>
								<div className="hidden sm:ml-6 sm:block">
									<div className="flex space-x-4">
										{navigation.map((item) => (
											<a
												key={item.name}
												href={item.href}
												className={classNames(
													item.current
														? "bg-gray-900 text-white"
														: "text-gray-300 hover:bg-gray-700 hover:text-white",
													"rounded-md px-3 py-2 text-sm font-medium"
												)}
												aria-current={item.current ? "page" : undefined}
											>
												{item.name}
											</a>
										))}
									</div>
								</div>
							</div>
							<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
								<Menu as="div" className="relative ml-3">
									<div>
										<Menu.Button className="flex rounded-full bg-white text-sm ring-2 ring-red-700 ring-offset-2 ">
											<span className="sr-only">Open user menu</span>
											{currentUser && currentUser.photoURL ? (
												<img
													className="h-8 w-8 rounded-full object-cover"
													src={currentUser.photoURL}
													alt="profile"
												/>
											) : (
												<UserCircleIcon
													className="h-8 w-8 object-cover text-gray-300"
													aria-hidden="true"
												/>
											)}
										</Menu.Button>
									</div>
									<Transition
										as={Fragment}
										enter="transition ease-out duration-100"
										enterFrom="transform opacity-0 scale-95"
										enterTo="transform opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95"
									>
										<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
											{currentUser && (
												<Menu.Item>
													{({ active }) => (
														<a
															href={`/user/profile/${currentUser.displayName}`}
															className={classNames(
																active ? "bg-gray-100" : "",
																"block px-4 py-2 text-sm text-gray-700"
															)}
														>
															Your Profile
														</a>
													)}
												</Menu.Item>
											)}
											{currentUser && (
												<Menu.Item>
													{({ active }) => (
														<a
															href="/settings/profile"
															className={classNames(
																active ? "bg-gray-100" : "",
																"block px-4 py-2 text-sm text-gray-700"
															)}
														>
															Settings
														</a>
													)}
												</Menu.Item>
											)}
											{currentUser ? (
												<Menu.Item>
													{({ active }) => (
														<a
															href="/logout"
															className={classNames(
																active ? "bg-gray-100" : "",
																"block px-4 py-2 text-sm text-gray-700"
															)}
														>
															Logout
														</a>
													)}
												</Menu.Item>
											) : (
												<Menu.Item>
													{({ active }) => (
														<a
															href="/login"
															className={classNames(
																active ? "bg-gray-100" : "",
																"block px-4 py-2 text-sm text-gray-700"
															)}
														>
															Login
														</a>
													)}
												</Menu.Item>
											)}
											{!currentUser && (
												<Menu.Item>
													{({ active }) => (
														<a
															href="/register"
															className={classNames(
																active ? "bg-gray-100" : "",
																"block px-4 py-2 text-sm text-gray-700"
															)}
														>
															Register
														</a>
													)}
												</Menu.Item>
											)}
										</Menu.Items>
									</Transition>
								</Menu>
							</div>
						</div>
					</div>

					<Disclosure.Panel className="sm:hidden">
						<div className="space-y-1 px-2 pb-3 pt-2">
							{navigation.map((item) => (
								<Disclosure.Button
									key={item.name}
									as="a"
									href={item.href}
									className={classNames(
										item.current
											? "bg-gray-900 text-white"
											: "text-gray-300 hover:bg-gray-700 hover:text-white",
										"block rounded-md px-3 py-2 text-base font-medium"
									)}
									aria-current={item.current ? "page" : undefined}
								>
									{item.name}
								</Disclosure.Button>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
