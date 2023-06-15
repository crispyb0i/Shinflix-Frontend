import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Modal } from "../../common";

const RegisterForm = () => {
	const [login, setLogin] = useState(false);
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

	const handleSubmit = (event) => {
		event.preventDefault();
		const { username, password, confirmPassword } = inputs;
		console.log(username, password);

		fetch("http://localhost:8000/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(inputs),
		})
			.then((res) => {
				console.log(res);
				if (res.ok) {
					setLogin(true);
				} else {
					console.log("Problem creating account");
				}
			})
			// .then((data) => console.log(data))
			.catch((error) => {
				console.error(error);
				setStatus({
					type: "danger",
					message: "Something went wrong",
					error: error,
				});
			});
	};

	const openModal = (modal) => {
		setModal(modal);
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	return login ? (
		<Navigate to={"/"} />
	) : (
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
						Register
					</span>
				</h1>
				<p className={"text-center text-sm mb-8 text-white-800"}>
					Already have an account?{" "}
					<Link className={"font-bold hover:text-black"} to={"/login"}>
						Login
					</Link>
				</p>
				<form onSubmit={handleSubmit}>
					<div className={"my-3"}>
						<label className={"text-sm mb-1 inline-block"}>Email</label>
						<input
							type="text"
							className={
								"p-2 rounded-lg w-full border-2 focus:border-primary hover:border-gray-400 outline-none dark:bg-gray-700"
							}
							placeholder={"Email"}
							name={"username"}
							onChange={handleChange}
							autoComplete={"off"}
						/>
					</div>
					<div className={"my-3"}>
						<label className={"text-sm mb-1 inline-block"}>Password</label>
						<input
							type="password"
							className={
								"p-2 rounded-lg w-full border-2 focus:border-primary hover:border-gray-400 outline-none dark:bg-gray-700"
							}
							placeholder={"Password"}
							name={"password"}
							onChange={handleChange}
						/>
					</div>
					<div className={"my-3"}>
						<label className={"text-sm mb-1 inline-block"}>
							Confirm Password
						</label>
						<input
							type="password"
							className={
								"p-2 rounded-lg w-full border-2 focus:border-primary hover:border-gray-400 outline-none dark:bg-gray-700"
							}
							placeholder={"Confirm Password"}
							name={"confirmPassword"}
							onChange={handleChange}
						/>
					</div>
					<div className={"flex justify-end mt-6"}>
						<button
							type={"submit"}
							className={"py-3 px-6 rounded bg-white text-black"}
						>
							Register
						</button>
					</div>
				</form>
			</div>
			{/* <div
				className={
					"login-wrapper text-white rounded-2xl px-8 py-6 mt-6 " +
					(status.type !== "" ? "bg-" + status.type : "")
				}
			>
				{status.error}
			</div> */}
		</>
	);
};

export default RegisterForm;
