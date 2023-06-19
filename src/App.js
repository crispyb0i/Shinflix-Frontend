import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./use-cases/";
import {
	Home,
	Login,
	Logout,
	ForgotPassword,
	NotFound,
	ProfilePage,
	Register,
	MoviePage,
	UpdateProfile,
	UpdateCredentials,
} from "./components/pages";
import { SiteSettingsProvider, ThemeProvider, AuthProvider } from "./contexts";
import Navbar from "./components/template/Navbar";

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
								<Route
									path={"/user/profile/:userid"}
									element={<ProfilePage />}
								/>
								<Route path={"/movie/:movieid"} element={<MoviePage />} />

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
						</div>
					</BrowserRouter>
				</AuthProvider>
			</SiteSettingsProvider>
		</ThemeProvider>
	);
}

export default App;
