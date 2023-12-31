import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

export function Modal({ isOpen, closeModal, modal, children }) {
	let [isOpenModal, setIsOpenModal] = useState(false);

	useEffect(() => {
		setIsOpenModal(isOpen);
	}, [isOpen]);

	return (
		<>
			<Transition appear show={isOpenModal} as={Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 z-10 overflow-y-auto backdrop-blur-sm bg-black/5"
					onClose={closeModal}
				>
					<div className="min-h-screen px-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0" />
						</Transition.Child>

						{/* This element is to trick the browser into centering the modal contents. */}
						<span
							className="inline-block h-screen align-middle"
							aria-hidden="true"
						>
							&#8203;
						</span>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
								<div className={"flex justify-between align-middle"}>
									<Dialog.Title
										as="h3"
										className="text-2xl font-medium leading-6 text-gray-900 mt-1"
									>
										{modal.title}
									</Dialog.Title>
									<i
										className={"la la-times la-2x text-gray-900 cursor-pointer"}
										onClick={closeModal}
									/>
								</div>

								<div className="mt-2">
									<div className="text-sm text-gray-700 ">{children}</div>
								</div>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
