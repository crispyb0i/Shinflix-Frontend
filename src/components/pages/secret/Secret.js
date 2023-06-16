import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
// import { Link } from "react-router-dom";

export function Secret() {
	const { currentUser } = useContext(AuthContext);
	console.log("CUR", currentUser);
	return <h1>{currentUser ? "AUTHENTICATED" : "FRAUD"}</h1>;
}
