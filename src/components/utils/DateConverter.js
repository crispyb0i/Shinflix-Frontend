// This function changes the format of the date
// "YYYY-MM-DD" => "MM/DD/YYYY"
export const formatDate = (date) => {
	if (!date) return;
	const originalDate = date;
	const splitDate = originalDate.split("-");
	const formattedDate = `${splitDate[1]}/${splitDate[2]}/${splitDate[0]}`;
	return formattedDate;
};
