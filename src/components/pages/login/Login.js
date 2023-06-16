import React from "react";
import LoginForm from "./LoginForm";

export const Login = () => {
	return (
		<div
			className={
				"flex flex-grow items-center justify-center flex-col dark:bg-gray-800 dark:text-gray-100 transition-all"
			}
		>
			<LoginForm />
		</div>
	);
};
