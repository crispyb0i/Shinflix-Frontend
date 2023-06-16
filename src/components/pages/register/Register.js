import React from "react";
import RegisterForm from "./RegisterForm";

export const Register = () => {
	return (
		<div
			className={
				"flex flex-grow items-center justify-center flex-col dark:bg-gray-800 dark:text-gray-100 transition-all"
			}
		>
			<RegisterForm />
		</div>
	);
};
