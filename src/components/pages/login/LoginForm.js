import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Modal } from "../../common";
import { AuthContext } from "../../../contexts/AuthContext";

const LoginForm = () => {
	const { login, currentUser } = useContext(AuthContext);
	const [inputs, setInputs] = useState({
		username: "",
		password: "",
	});
	const [status, setStatus] = useState("");
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
		const { email, password } = inputs;
		login(email, password).catch((err) => {
			setStatus(err.message);
			openModal({
				...modal,
				title: "Error logging in",
				content: err.status,
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

	// console.log(status);

	return currentUser ? (
		<Navigate to={"/"} />
	) : (
		<>
			<Modal modal={modal} closeModal={closeModal} isOpen={isOpen}>
				{status}
			</Modal>

			<div>
				<h1
					className={
						"font-thin text-3xl text-center mb-6 flex items-end justify-center items-center"
					}
				>
					<span className={"font-bold pr-2 mr-2 border-gray-500 text-4xl"}>
						Login
					</span>
				</h1>
				<p className={"text-center text-sm mb-8 text-white-800"}>
					Don't have an account?{" "}
					<Link className={"font-bold hover:text-black"} to={"/register"}>
						Register
					</Link>
				</p>
				<form onSubmit={handleSubmit}>
					<div className={"my-3"}>
						<label className={"text-sm mb-1 inline-block"}>Email</label>
						<input
							type="email"
							className={
								"p-2 rounded-lg w-full border-2 focus:border-primary hover:border-gray-400 outline-none dark:bg-gray-700"
							}
							placeholder={"Email"}
							name={"email"}
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
							required
							minLength={7}
						/>
					</div>
					<div className={"flex justify-end mt-6"}>
						<button
							type={"submit"}
							className={
								"py-3 px-6 w-full rounded bg-gray-500 hover:bg-gray-800 text-white rounded-lg"
							}
						>
							Login
						</button>
					</div>
				</form>
				<div className="flex w-full justify-center text-blue-600 mt-6">
					<Link to="/forgot-password">Forgot Password?</Link>
				</div>
			</div>
		</>
	);
};

export default LoginForm;
