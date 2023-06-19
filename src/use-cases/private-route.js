import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export function PrivateRoute(props) {
	const { currentUser } = useContext(AuthContext);
	return currentUser ? props.children : <Navigate to={"/login"} />;
}
