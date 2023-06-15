import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
// import { Link } from "react-router-dom";

export function Secret() {
	const { loggedIn } = useContext(AuthContext);
	return <h1>{loggedIn ? "AUTHENTICATED" : "FRAUD"}</h1>;
}
