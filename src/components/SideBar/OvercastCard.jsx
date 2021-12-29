import React from "react";
import style from "./style.scss";

const darkIconsUrls = {
	clouds: "https://georgeshvab.github.io/cumulus/icons/clouds_icon_dark.svg",
	cloudsAndSun:
		"https://georgeshvab.github.io/cumulus/icons/cloud_sun_icon_dark.svg",
	rain: "https://georgeshvab.github.io/cumulus/icons/rain_icon_dark.svg",
	drizzle: "https://georgeshvab.github.io/cumulus/icons/rain_icon_dark.svg",
	sunny: "https://georgeshvab.github.io/cumulus/icons/sun_icon_dark.svg",
	clear: "https://georgeshvab.github.io/cumulus/icons/sun_icon_dark.svg",
	thunderstorm:
		"https://georgeshvab.github.io/cumulus/icons/thunderstorm_icon_dark.svg",
	fog: "https://georgeshvab.github.io/cumulus/icons/fog_icon_dark.svg",
	haze: "https://georgeshvab.github.io/cumulus/icons/fog_icon_dark.svg",
	mist: "https://georgeshvab.github.io/cumulus/icons/fog_icon_dark.svg",
	snow: "https://georgeshvab.github.io/cumulus/icons/snow_icon_dark.svg",
};

const translatedConditions = {
	fog: "Туман",
	mist: "Туман",
	haze: "Туман",
	clouds: "Хмарно",
	rain: "Дощ",
	drizzle: "Дощ",
	sunny: "Сонячно",
	clear: "Сонячно",
	snow: "Сніг",
};

function OvercastCard({ temp, conditions, date }) {
	return (
		<div className="overcast__card">
			<div className="overcast__temperature">
				<div className="overcast__temperature-text">{`${temp}°`}</div>
			</div>
			<div className="overcast__conditions">
				<img
					src={darkIconsUrls[conditions.toLowerCase()]}
					alt="Rain"
				/>
				<div className="overcast__conditions-text">{translatedConditions[conditions.toLowerCase()]}</div>
			</div>
			<div className="overcast__date">{date}</div>
		</div>
	);
}

export default OvercastCard;
