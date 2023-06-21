import React from "react";
import RegisterForm from "./RegisterForm";

export const Register = () => {
	return (
		<div
			className={
				"flex flex-grow items-center justify-center flex-col transition-all"
			}
		>
			<RegisterForm />
		</div>
	);
};
