import { useContext, useEffect } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../../../contexts/AuthContext";

export const Logout = () => {
	const { logout } = useContext(AuthContext);
	useEffect(() => {
		logout();
	}, []);
	return <Navigate to={"/"} />;
};
