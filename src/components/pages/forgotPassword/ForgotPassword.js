import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Modal } from "../../common";
import { AuthContext } from "../../../contexts/AuthContext";

export const ForgotPassword = () => {
	const { resetPassword } = useContext(AuthContext);
	// const [login, setLogin] = useState(false);
	const [inputs, setInputs] = useState({
		email: "",
	});
	const [status, setStatus] = useState({
		type: "",
		message: "",
		error: "",
	});

	const [isOpen, setIsOpen] = useState(false);
	const [modal, setModal] = useState({
		title: "",
		content: "",
		buttons: ["Submit"],
	});

	const handleChange = (event) => {
		setInputs({
			...inputs,
			[event.target.name]: event.target.value,
		});
	};

	const openModal = (modal) => {
		setModal(modal);
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const { email } = inputs;
			await resetPassword(email);
			setStatus({
				type: "primary",
				message: "Check your inbox for further instructions",
				error: "",
			});
		} catch (err) {
			setStatus({
				type: "danger",
				message: "Failed to reset password",
				error: err,
			});
		}
	};

	return (
		<>
			<Modal modal={modal} closeModal={closeModal} isOpen={isOpen}>
				{status.error}
			</Modal>
			<div className="login-wrapper rounded-2xl px-8 md:px-16 pt-14 mt-6">
				<h1
					className={
						"font-thin text-3xl text-center mb-6 flex items-end justify-center items-center"
					}
				>
					<span className={"font-bold pr-2 mr-2 border-gray-500 text-4xl"}>
						Reset Password
					</span>
				</h1>
				<form onSubmit={handleSubmit}>
					<div className={"my-3"}>
						<label className={"text-sm mb-1 inline-block"}>Email</label>
						<input
							type="email"
							className={
								"p-2 rounded-lg w-full border-2 focus:border-primary hover:border-gray-400 outline-none"
							}
							placeholder={"Email"}
							name={"email"}
							onChange={handleChange}
							autoComplete={"off"}
						/>
					</div>
					<div className={"flex justify-end mt-6"}>
						<button
							onSubmit={handleSubmit}
							className="flex-shrink-0 bg-blue-500 h-12 hover:bg-blue-700 border-black-500 hover:border-black-700 border-1 text-white py-3 px-3 rounded-lg"
							type="submit"
						>
							Reset Password
						</button>
					</div>
					<div
						className={
							"login-wrapper text-black rounded-2xl px-8 py-6 mt-6 " +
							(status.type !== "" ? "bg-" + status.type : "")
						}
					>
						{status.error.message}
					</div>
				</form>
				<div className="flex w-full justify-center text-blue-600 mt-6">
					<Link to="/login">Login</Link>
				</div>
				<p className={"text-center mt-3 text-sm mb-8"}>
					Don't have an account?{" "}
					<Link className={"font-bold hover:text-black"} to={"/register"}>
						Register
					</Link>
				</p>
			</div>
		</>
	);
};
