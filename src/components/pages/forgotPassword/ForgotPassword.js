import { AuthContext } from "../../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Modal } from "../../common";
import { Navigate } from "react-router-dom";
import { useContext, useState } from "react";

export const ForgotPassword = () => {
	const { currentUser, resetPassword } = useContext(AuthContext);
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
	// eslint-disable-next-line no-unused-vars
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

	// const openModal = (modal) => {
	// 	setModal(modal);
	// 	setIsOpen(true);
	// };

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

	return currentUser ? (
		<Navigate to={"/"} />
	) : (
		<>
			<div
				className={
					"flex flex-grow items-center justify-center flex-col transition-all"
				}
			>
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
								className={
									"py-3 px-6 w-full rounded bg-gray-500 hover:bg-gray-800 text-white rounded-lg"
								}
								type="submit"
							>
								Reset Password
							</button>
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
			</div>
		</>
	);
};
