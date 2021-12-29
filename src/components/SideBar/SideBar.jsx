import React from "react";
import style from "./style.scss";

import OvercastCard from "./OvercastCard.jsx";

import { useSelector, useDispatch } from "react-redux";

import { setLocation } from "../../redux/actions/setLocation.js";

import { reactLocalStorage } from "reactjs-localstorage";

let searchsValues = [];

const degs = [
	"Пн.",
	"Пн. Сх.",
	"Сх.",
	"Пд. Сх.",
	"Пд.",
	"Пд. Зх",
	"Зх.",
	"Пн. Зх.",
];

const setDeg = (deg) => {
	if (deg >= 337.5 || deg < 22.5) {
		return degs[0];
	} else if (deg >= 22.5 && deg < 67.5) {
		return degs[1];
	} else if (deg >= 67.5 && deg < 112.5) {
		return degs[2];
	} else if (deg >= 112.5 && deg < 157.5) {
		return degs[3];
	} else if (deg >= 157.5 && deg < 202.5) {
		return degs[4];
	} else if (deg >= 202.5 && deg < 247.5) {
		return degs[5];
	} else if (deg >= 247.5 && deg < 292.5) {
		return degs[6];
	} else if (deg >= 292.5 && deg < 337.5) {
		return degs[7];
	}
};

const SideBar = React.memo(function SideBar() {
	const dispatch = useDispatch();

	const [overcastCards, setOvercastCards] = React.useState([]);

	const [searchs, setSearchs] = React.useState(
		reactLocalStorage.getObject("searchs")
			? reactLocalStorage.getObject("searchs")
			: []
	);

	const overcast = useSelector(
		({ overcastWeatherData }) => overcastWeatherData.data
	);

	const currentWeather = useSelector(
		({ currentWeatherData }) => currentWeatherData.data
	);

	const transition = useSelector(
		({ transition }) => transition
	);

	const sityError = useSelector(
		({ sityError }) => sityError
	);

	const submit = (event) => {
		event.preventDefault();
		dispatch(setLocation(event.target.elements.location.value.toLowerCase()));
	};

	const oldValueClick = (loc) => {
		dispatch(setLocation(loc.toLowerCase()));
	};

	React.useEffect(() => {
		if (!Array.isArray(reactLocalStorage.getObject("searchs"))) {
			reactLocalStorage.setObject("searchs", []);
		}
	}, []);

	React.useEffect(() => {
		setOvercastCards(overcast);
	}, [overcast]);

	React.useEffect(() => {
		searchsValues = reactLocalStorage.getObject("searchs")
			? reactLocalStorage.getObject("searchs")
			: [];
		if (
			typeof currentWeather.location === "string" &&
			reactLocalStorage.getObject("searchs") &&
			searchsValues[0] !== currentWeather.location
		) {
			const newArr = searchsValues.filter(
				(item) => item !== currentWeather.location
			);
			newArr.unshift(currentWeather.location);
			setSearchs(newArr);
			reactLocalStorage.setObject("searchs", newArr);
		}
	}, [currentWeather]);

	return (
		<aside className="sidebar">
				<>
					<div className="sidebar__item">
						<form onSubmit={submit} action="">
							<div className={`sidebar__form-error ${!sityError && "transition_active"}`}>Місто не знайдено</div>
							<input
								className="sidebar__search"
								placeholder="Місто"
								name="location"
								type="text"
								autoComplete="off"
							/>
						</form>
						<span className="sidebar__item-line"></span>
						<div className="sidebar__values">
							{searchs && searchs.length
								? searchs.slice(0, 4).map((item, index) => (
										<div key={index} className="sidebar__value-container">
											<span
												onClick={() => oldValueClick(item)}
												className="sidebar__value"
											>
												{item}
											</span>
										</div>
								  ))
								: ""}
						</div>
					</div>
					<div className="sidebar__item">
						<h3 className="sidebar__title">Деталі</h3>
						<span className="sidebar__item-line"></span>
						<div className="sidebar__values">
							<div className="sidebar__value-container">
								<span className="sidebar__value">Хмарність</span>
								<span className={`sidebar__value ${transition ? "transition_active" : ""}`}>{currentWeather.clouds ? `${currentWeather.clouds.all} %` : ""}</span>
							</div>
							<div className="sidebar__value-container">
								<span className="sidebar__value">Вологість</span>
								<span className={`sidebar__value ${transition ? "transition_active" : ""}`}>{currentWeather.clouds ? `${currentWeather.main.humidity} %` : ""}</span>
							</div>
							<div className="sidebar__value-container">
								<span className="sidebar__value">Швидкість вітру</span>
								<span className={`sidebar__value ${transition ? "transition_active" : ""}`}>{currentWeather.clouds ? `${currentWeather.wind.speed} м/с` : ""}</span>
							</div>
							<div className="sidebar__value-container">
								<span className="sidebar__value">Напрямок вітру</span>
								<span className={`sidebar__value ${transition ? "transition_active" : ""}`}>{currentWeather.clouds ? `${setDeg(
									currentWeather.wind.deg
								)}` : ""}</span>
							</div>
							<div className="sidebar__value-container">
								<span className="sidebar__value">Тиск</span>
								<span className={`sidebar__value ${transition ? "transition_active" : ""}`}>{currentWeather.clouds ? `${currentWeather.main.pressure} мм. рт. ст.` : ""}</span>
							</div>
						</div>
					</div>
					<div className="sidebar__item">
						<h3 className="sidebar__title">Прогноз</h3>
						<span className="sidebar__item-line"></span>
						<div className={`overcast__container ${transition ? "transition_active" : ""}`}>
							{overcast && overcast.length
								? overcast.map((item, index) => (
										<OvercastCard
											key={index}
											temp={Math.round(item.main.temp)}
											conditions={item.weather[0].main}
											date={`${item.dayOfWeek}, ${item.date} ${item.month}`}
										/>
								  ))
								: ""}
						</div>
					</div>
				</>
		</aside>
	);
})

export default SideBar;
