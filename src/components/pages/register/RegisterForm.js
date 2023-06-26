import { AuthContext } from "../../../contexts/AuthContext";
import { Link, Navigate } from "react-router-dom";
import { Modal } from "../../common";
import { useState, useContext } from "react";

const RegisterForm = () => {
	const { addNewUser, currentUser, signup, updateUserDisplayName } =
		useContext(AuthContext);
	const [inputs, setInputs] = useState({
		username: "",
		password: "",
		confirmPassword: "",
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
		const { username, password, confirmPassword } = inputs;
		const errorMessage = "Passwords do not match";
		if (password !== confirmPassword) {
			setStatus(errorMessage);
			openModal({
				...modal,
				title: "Error",
				content: errorMessage,
			});
		} else {
			signup(username, password)
				.then((userCredential) => {
					addNewUser(userCredential.user.uid, userCredential.user.email);
					updateUserDisplayName(userCredential.user.uid);
				})
				.catch((err) => {
					setStatus(err.message);
					openModal({
						...modal,
						title: "Error singing up",
						content: err.message,
					});
				});
		}
	};

	const openModal = (modal) => {
		setModal(modal);
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

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
								"p-2 rounded-lg w-full border-2 focus:border-primary hover:border-gray-400 outline-none"
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
								"p-2 rounded-lg w-full border-2 focus:border-primary hover:border-gray-400 outline-none"
							}
							placeholder={"Password"}
							name={"password"}
							onChange={handleChange}
							required
							minLength={7}
							autoComplete={"off"}
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
							placeholder={"Confirm Password"}
							name={"confirmPassword"}
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
							Register
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default RegisterForm;
