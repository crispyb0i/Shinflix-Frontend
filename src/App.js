import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./use-cases/";
import {
	Home,
	Login,
	Logout,
	NotFound,
	Single,
	Register,
	Secret,
	MoviePage,
} from "./components/pages";
import { SiteSettingsProvider, ThemeProvider, AuthProvider } from "./contexts";
import Navbar from "./components/template/Navbar";

function App() {
	return (
		<ThemeProvider>
			<SiteSettingsProvider>
				<AuthProvider>
					<BrowserRouter basename={""}>
						<Navbar />
						<Routes>
							<Route path={"/"} element={<Home />} />
							<Route
								path={"/single-title"}
								element={
									<PrivateRoute roles={["ROLE_USER"]} minlevel={2}>
										<Single />
									</PrivateRoute>
								}
							/>
							<Route
								path={"/users"}
								element={
									<PrivateRoute roles={["ROLE_ADMIN"]} minlevel={4}>
										<Single />
									</PrivateRoute>
								}
							/>
							<Route path={"/login"} element={<Login />} />
							<Route path={"/logout"} element={<Logout />} />
							<Route path={"/secret"} element={<Secret />} />
							<Route path={"/register"} element={<Register />} />
							<Route path={"/movie/:movieid"} element={<MoviePage />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</BrowserRouter>
				</AuthProvider>
			</SiteSettingsProvider>
		</ThemeProvider>
	);
}

export default App;
