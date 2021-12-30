import React from "react";
import style from "./style.scss";

import { useSelector } from "react-redux";

const iconsUrls = {
	clouds: "/cumulus/icons/clouds_icon.svg",
	cloudsAndSun:
		"/cumulus/icons/cloud_sun_icon.svg",
	rain: "/cumulus/icons/rain_icon.svg",
	sunny: "/cumulus/icons/sun_icon.svg",
	clear: "/cumulus/icons/sun_icon.svg",
	thunderstorm:
		"/cumulus/icons/thunderstorm_icon.svg",
	fog: "/cumulus/icons/fog_icon.svg",
	haze: "/cumulus/icons/fog_icon.svg",
	mist: "/cumulus/icons/fog_icon.svg",
	snow: "/cumulus/icons/snow_icon.svg",
};

const translatedConditions = {
	fog: "Туман",
	mist: "Туман",
	haze: "Туман",
	clouds: "Хмарно",
	rain: "Дощ",
	sunny: "Сонячно",
	clear: "Сонячно",
	snow: "Сніг",
};

const MainInfo = React.memo(function MainInfo() {
	const currentWeatherData = useSelector(
		({ currentWeatherData }) => currentWeatherData.data
	);

	const transition = useSelector(({ transition }) => transition);

	console.log(transition);

	return (
		<div className="main">
			<header className="header">
				<div className="header__logo">
					<span className="header__logo-main">Cumulus</span>
					<span className="header__logo-prefix">°C</span>
				</div>
			</header>
			{currentWeatherData.main && (
				<div
					className={`info ${transition ? "transition_active" : ""}`}
				>
					<div className="info__temperature">{`${Math.round(
						currentWeatherData.main.temp
					)}°`}</div>
					<div className="info__location-date">
						<div className="info__location">
							{currentWeatherData.location}
						</div>
						<div className="info__date">{`${currentWeatherData.time} - ${currentWeatherData.dayOfWeek}, ${currentWeatherData.date} ${currentWeatherData.month}`}</div>
					</div>
					<div className="info__conditions">
						<div className="info__conditions-img">
							<img
								className="info__conditions-img"
								src={
									iconsUrls[
										currentWeatherData.weather[0].main.toLowerCase()
									]
										? iconsUrls[
												currentWeatherData.weather[0].main.toLowerCase()
										  ]
										: ""
								}
								alt={currentWeatherData.weather[0].main.toLowerCase()}
							/>
						</div>
						<div className="info__conditions-text">
							{translatedConditions[
								currentWeatherData.weather[0].main.toLowerCase()
							]
								? translatedConditions[
										currentWeatherData.weather[0].main.toLowerCase()
								  ]
								: ""}
						</div>
					</div>
				</div>
			)}
		</div>
	);
});

export default MainInfo;
