import React, { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { Modal } from "../../common";
import { AuthContext } from "../../../contexts/AuthContext";

export const UpdateCredentials = () => {
	const { currentUser, updateUserPassword, updateUserEmail } =
		useContext(AuthContext);
	const [loading, setLoading] = useState(false);
	const [inputs, setInputs] = useState({
		username: "",
		password: "",
		confirmPassword: "",
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

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		const { email, password, confirmPassword } = inputs;
		if (password !== confirmPassword) {
			setStatus({
				type: "danger",
				message: "Passwords do not match",
				error: "Passwords do not match",
			});
			openModal({
				title: "Error",
				content: "Passwords do not match",
				button: "HELLO",
			});
		}
		const promises = [];
		if (email !== currentUser.email) {
			promises.push(updateUserEmail(email));
		}

		if (password) {
			promises.push(updateUserPassword(password));
		}

		Promise.all(promises)
			.then(() => {
				setStatus({
					type: "Success",
					message: "Credentials have been updated!",
					error: "",
				});
				<Navigate to="/" />;
			})
			.catch((err) => {
				setStatus({
					type: "danger",
					message: "Update failed",
					error: err.message,
				});
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const openModal = (modal) => {
		setModal(modal);
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	return !currentUser ? (
		<Navigate to={"/"} />
	) : (
		<>
			<Modal modal={modal} closeModal={closeModal} isOpen={isOpen}>
				{status.error}
			</Modal>

			<div className="flex flex-grow items-center justify-center flex-col transition-all">
				<h1
					className={
						"font-thin text-3xl text-center mb-6 flex items-end justify-center items-center"
					}
				>
					<span className={"font-bold pr-2 mr-2 border-gray-500 text-4xl"}>
						Update Credentials
					</span>
				</h1>
				<form onSubmit={handleSubmit}>
					<div className={"my-3"}>
						<label className={"text-sm mb-1 inline-block"}>Email</label>
						<input
							type="text"
							className={
								"p-2 rounded-lg w-full border-2 focus:border-primary hover:border-gray-400 outline-none"
							}
							placeholder={"Email"}
							name={"email"}
							onChange={handleChange}
							autoComplete={"off"}
							defaultValue={currentUser.email}
						/>
					</div>
					<div className={"my-3"}>
						<label className={"text-sm mb-1 inline-block"}>New Password</label>
						<input
							type="password"
							className={
								"p-2 rounded-lg w-full border-2 focus:border-primary hover:border-gray-400 outline-none"
							}
							placeholder={"Leave blank to leave the same"}
							name={"password"}
							onChange={handleChange}
							minLength={6}
						/>
					</div>
					<div className={"my-3"}>
						<label className={"text-sm mb-1 inline-block"}>
							Confirm Password
						</label>
						<input
							type="password"
							className={
								"p-2 rounded-lg w-full border-2 focus:border-primary hover:border-gray-400 outline-none"
							}
							placeholder={"Leave blank to leave the same"}
							name={"confirmPassword"}
							onChange={handleChange}
							minLength={6}
						/>
					</div>
					<div className={"flex justify-end mt-6"}>
						<button
							type={"submit"}
							className={"py-3 px-6 rounded bg-white text-black"}
						>
							Update
						</button>
					</div>
					<div
						className={
							"login-wrapper text-white rounded-2xl px-8 py-6 mt-6 " +
							(status.type !== "" ? "bg-" + status.type : "")
						}
					>
						{status.error.message}
					</div>
				</form>
			</div>
		</>
	);
};
