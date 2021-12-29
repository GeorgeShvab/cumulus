import axios from "axios";

export default async function fetchWeather(url) {
	const response = await axios.get(url);
	return await response;
}
