import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Modal } from "../../common";

const LoginForm = () => {
	const [login, setLogin] = useState(false);
	const [inputs, setInputs] = useState({
		email: "",
		password: "",
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
		const { username, email, password } = inputs;
		console.log(username, email, password);
		// let api_base = process.env.REACT_APP_API_BASE;

		fetch("http://localhost:8000/register", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(inputs),
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((error) => {
				console.log(error);
				setStatus({
					type: "danger",
					message: "Something went wrong",
					error: error,
				});
			});
	};
	//     .then((result) => {
	//         /*
	//          * NOTE:
	//          * Only an example. make the authentication stronger by using your own authentication.
	//          * */

	//         if (result.message === 'OK') {
	//             localStorage.setItem('orange_login', 'true');
	//             localStorage.setItem('orange_user', JSON.stringify(result.user));

	//             setLogin(true);
	//         } else {
	//             localStorage.setItem('orange_login', 'false');
	//             setLogin(false);
	//             setStatus({
	//                 type: 'danger',
	//                 message: 'Something went wrong',
	//                 error: result.message,
	//             });
	//             openModal({
	//                 title:'Error',
	//             })
	//         }
	//     })

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
					{/* <div className={"my-3"}>
						<label className={"text-sm mb-1 inline-block"}>Username</label>
						<input
							type="text"
							className={
								"p-2 rounded-lg w-full border-2 focus:border-primary hover:border-gray-400 outline-none dark:bg-gray-700"
							}
							placeholder={"Username"}
							name={"username"}
							onChange={handleChange}
							autoComplete={"off"}
						/>
					</div> */}
					<div className={"my-3"}>
						<label className={"text-sm mb-1 inline-block"}>Email</label>
						<input
							type="text"
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
						/>
					</div>
					<div className={"flex justify-end mt-6"}>
						<button
							type={"submit"}
							className={"py-3 px-6 rounded bg-white text-black"}
						>
							Login
						</button>
					</div>
				</form>
			</div>
			<div
				className={
					"login-wrapper text-white rounded-2xl px-8 py-6 mt-6 " +
					(status.type !== "" ? "bg-" + status.type : "")
				}
			>
				{status.error}
			</div>
		</>
	);
};

export default LoginForm;
