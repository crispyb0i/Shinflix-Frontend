import { useState, useEffect, useRef } from "react";

export const VideoModal = ({ videoSrc }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const modalRef = useRef(null);

	const openModal = () => {
		setModalVisible(true);
	};

	const closeModal = () => {
		setModalVisible(false);
	};

	const youtubeUrl = `https://www.youtube.com/embed/${videoSrc}?autoplay=1`;

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (modalRef.current && !modalRef.current.contains(event.target)) {
				closeModal();
			}
		};

		const handleKeyPress = (event) => {
			if (event.key === "Escape") {
				closeModal();
			}
		};

		if (modalVisible) {
			document.addEventListener("mousedown", handleClickOutside);
			document.addEventListener("keydown", handleKeyPress);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleKeyPress);
		};
	}, [modalVisible]);

	return (
		<>
			<div className="w-80">
				<div onClick={openModal} className="cursor-pointer">
					<img
						src={`https://img.youtube.com/vi/${videoSrc}/mqdefault.jpg`}
						alt="Video Thumbnail"
					/>
				</div>
			</div>

			{modalVisible && (
				<div className="fixed inset-0 z-50 flex items-center justify-center h-11/12">
					<div className="fixed inset-0 bg-gray-900 opacity-50"></div>
					<div className="z-10 w-5/6 h-2/3" ref={modalRef}>
						<div className="relative aspect-w-16 aspect-h-9 h-full">
							<iframe
								title="YouTube Video"
								src={youtubeUrl}
								className="w-full h-full"
								allowFullScreen
							></iframe>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
