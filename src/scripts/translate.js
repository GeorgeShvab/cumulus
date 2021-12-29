import axios from "axios";

export default async function translate(phrase) {
	const options = {
		method: "GET",
		url: "https://translated-mymemory---translation-memory.p.rapidapi.com/api/get",
		params: {
			langpair: "uk|en",
			q: phrase,
			mt: "1",
			onlyprivate: "0",
			de: "a@b.c",
		},
		headers: {
			"x-rapidapi-host":
				"translated-mymemory---translation-memory.p.rapidapi.com",
			"x-rapidapi-key":
				"49e2fe5cf1mshabccf049ab3cc58p10eb01jsne67acd52d7ca",
		},
	};
	const response = await axios(options);
	return response.data.responseData.translatedText;
}
