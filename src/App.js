import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./use-cases/";
import {
	Home,
	Login,
	Logout,
	ForgotPassword,
	NotFound,
	PersonPage,
	ProfilePage,
	Register,
	MoviePage,
	SeasonPage,
	UpdateProfile,
	UpdateCredentials,
} from "./components/pages";
import { SiteSettingsProvider, ThemeProvider, AuthProvider } from "./contexts";
import Navbar from "./components/blocks/Navbar";
import { TvPage } from "./components/pages/tv/TvPage";
import { Footer } from "./components/blocks/Footer";

function App() {
	return (
		<ThemeProvider>
			<SiteSettingsProvider>
				<AuthProvider>
					<BrowserRouter basename={""}>
						<div className="flex flex-col h-screen">
							<Navbar />
							<Routes>
								<Route path={"/"} element={<Home />} />
								<Route path={"/login"} element={<Login />} />
								<Route path={"/logout"} element={<Logout />} />
								<Route path={"/forgot-password"} element={<ForgotPassword />} />
								<Route path={"/register"} element={<Register />} />
								<Route path={"/person/:personid"} element={<PersonPage />} />
								<Route path={"/movie/:movieid"} element={<MoviePage />} />
								<Route path={"/tv/:tvid"} element={<TvPage />} />
								<Route
									path={"/tv/:tv_id/season/:season_number"}
									element={<SeasonPage />}
								/>
								<Route
									path={"/user/profile/:userid"}
									element={<ProfilePage />}
								/>

								<Route
									path={"/settings/profile"}
									element={
										<PrivateRoute>
											<UpdateProfile />
										</PrivateRoute>
									}
								/>
								<Route
									path={"/settings/update-credentials"}
									element={
										<PrivateRoute>
											<UpdateCredentials />
										</PrivateRoute>
									}
								/>
								<Route path="*" element={<NotFound />} />
							</Routes>
							{/* <Footer /> */}
						</div>
					</BrowserRouter>
				</AuthProvider>
			</SiteSettingsProvider>
		</ThemeProvider>
	);
}

export default App;
