import { useParams } from "react-router-dom";

export const ProfilePage = () => {
	const userid = useParams().userid;
	return <h1>{userid}</h1>;
};
