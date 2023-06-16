import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useAuth, isLoggedIn } from "./index";
import { AuthContext } from "../contexts/AuthContext";

export function PrivateRoute(props) {
	const { currentUser } = useContext(AuthContext);
	const auth = useAuth(props);
	return currentUser ? props.children : <Navigate to={"/login"} />;
}
