import React from "react";

export const LoadingSpinner = () => {
	return (
		<div className="flex items-center justify-center">
			<div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-gray-900"></div>
		</div>
	);
};
