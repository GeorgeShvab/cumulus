import "./scss/main.scss";
import "./scss/reset.scss";
import React from "react";

import fetchWeather from "./scripts/fetchWeather.js";
import translate from "./scripts/translate.js";

import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";

import { useSelector, useDispatch } from "react-redux";

import { MainInfo, SideBar, Alert } from "./components";

import { setCurrentWeatherData } from "./redux/actions/setCurrentWeatherData.js";
import { setOvercastWeatherData } from "./redux/actions/setOvercastWeatherData.js";
import { setTransition } from "./redux/actions/setTransition.js";
import { setSityError } from "./redux/actions/setSityError.js";

const daysOfWeek = {
  1: "Пн",
  2: "Вт",
  3: "Ср",
  4: "Чт",
  5: "Пт",
  6: "Сб",
  0: "Нд",
};
const months = {
  1: "Січня",
  2: "Лютого",
  3: "Березня",
  4: "Квітня",
  5: "Травня",
  6: "Червня",
  7: "Липня",
  8: "Серпня",
  9: "Вересня",
  10: "Жовтня",
  11: "Листопада",
  12: "Грудня",
};

const backgrounds = {
  rain: "/images/background_rain_1.jpg",
  drizzle: "/images/background_rain_1.jpg",
  snow: "/images/background_snow_1.jpg",
  fog: "/images/background_fog_1.jpg",
  haze: "/images/background_fog_1.jpg",
  mist: "/images/background_fog_1.jpg",
  sunny: "/images/background_sunny_1.jpg",
  clear: "/images/background_sunny_1.jpg",
  thunderstorm:
    "/images/background_thunderstorm_1.jpg",
  clouds:
    "/images/background_clouds_1.jpg",
  initial:
    "/images/background_initial.jpg",
};

let data;

function App() {
  const searchValue = useSelector(({ location }) => location.place);

  const [conditions, setConditions] = React.useState(
    reactLocalStorage.get("lastConditions")
      ? reactLocalStorage.get("lastConditions")
      : "initial"
  );

  const dispatch = useDispatch();

  const currentDate = new Date();

  const overcastDayOneDate = new Date(currentDate.getTime() + 86400000);
  const overcastDayTwoDate = new Date(currentDate.getTime() + 86400000 * 2);
  const overcastDayThreeDate = new Date(currentDate.getTime() + 86400000 * 3);
  const overcastDayFourDate = new Date(currentDate.getTime() + 86400000 * 4);

  const todaysDate = {
    time:
      (String(currentDate.getHours()).split("").length == 1
        ? "0" + String(currentDate.getHours())
        : currentDate.getHours()) +
      ":" +
      (String(currentDate.getMinutes()).split("")[0] == 0 &&
      String(currentDate.getMinutes()).split("").length == 2
        ? "0" + String(currentDate.getMinutes())
        : currentDate.getMinutes()),
    dayOfWeek: daysOfWeek[currentDate.getDay()],
    date: currentDate.getDate(),
    month: months[currentDate.getMonth() + 1],
  };

  const overcastDates = [
    {
      dayOfWeek: daysOfWeek[overcastDayOneDate.getDay()],
      date: overcastDayOneDate.getDate(),
      month: months[overcastDayOneDate.getMonth() + 1],
      year: overcastDayOneDate.getFullYear(),
      dt_txt: `${overcastDayOneDate.getFullYear()}-${
        String(overcastDayOneDate.getMonth() + 1).split("").length == 1
          ? "0" + String(overcastDayOneDate.getMonth() + 1)
          : overcastDayOneDate.getMonth() + 1
      }-${
        String(overcastDayOneDate.getDate()).split("").length == 1
          ? "0" + String(overcastDayOneDate.getDate())
          : overcastDayOneDate.getDate()
      } 12:00:00`,
    },
    {
      dayOfWeek: daysOfWeek[overcastDayTwoDate.getDay()],
      date: overcastDayTwoDate.getDate(),
      month: months[overcastDayTwoDate.getMonth() + 1],
      year: overcastDayTwoDate.getFullYear(),
      dt_txt: `${overcastDayTwoDate.getFullYear()}-${
        String(overcastDayTwoDate.getMonth() + 1).split("").length == 1
          ? "0" + String(overcastDayTwoDate.getMonth() + 1)
          : overcastDayTwoDate.getMonth() + 1
      }-${
        String(overcastDayTwoDate.getDate()).split("").length == 1
          ? "0" + String(overcastDayTwoDate.getDate())
          : overcastDayTwoDate.getDate()
      } 12:00:00`,
    },
    {
      dayOfWeek: daysOfWeek[overcastDayThreeDate.getDay()],
      date: overcastDayThreeDate.getDate(),
      month: months[overcastDayThreeDate.getMonth() + 1],
      year: overcastDayThreeDate.getFullYear(),
      dt_txt: `${overcastDayThreeDate.getFullYear()}-${
        String(overcastDayThreeDate.getMonth() + 1).split("").length == 1
          ? "0" + String(overcastDayThreeDate.getMonth() + 1)
          : overcastDayThreeDate.getMonth() + 1
      }-${
        String(overcastDayThreeDate.getDate()).split("").length == 1
          ? "0" + String(overcastDayThreeDate.getDate())
          : overcastDayThreeDate.getDate()
      } 12:00:00`,
    },
    {
      dayOfWeek: daysOfWeek[overcastDayFourDate.getDay()],
      date: overcastDayFourDate.getDate(),
      month: months[overcastDayFourDate.getMonth() + 1],
      year: overcastDayFourDate.getFullYear(),
      dt_txt: `${overcastDayFourDate.getFullYear()}-${
        String(overcastDayFourDate.getMonth() + 1).split("").length == 1
          ? "0" + String(overcastDayFourDate.getMonth() + 1)
          : overcastDayFourDate.getMonth() + 1
      }-${
        String(overcastDayFourDate.getDate()).split("").length == 1
          ? "0" + String(overcastDayFourDate.getDate())
          : overcastDayFourDate.getDate()
      } 12:00:00`,
    },
  ];

  const setOvercast = (overcast, location) => {
    return [
      {
        ...overcast.find((item) => item.dt_txt === overcastDates[0].dt_txt),
        ...overcastDates[0],
      },
      {
        ...overcast.find((item) => item.dt_txt === overcastDates[1].dt_txt),
        ...overcastDates[1],
      },
      {
        ...overcast.find((item) => item.dt_txt === overcastDates[2].dt_txt),
        ...overcastDates[2],
      },
      {
        ...overcast.find((item) => item.dt_txt === overcastDates[3].dt_txt),
        ...overcastDates[3],
      },
    ];
  };

  React.useEffect(() => {
    async function getWeather() {
      try {
        await translate(searchValue).then(async (translatedLocation) => {
          data = {
            overcast: setOvercast(
              (
                await fetchWeather(
                  `http://api.openweathermap.org/data/2.5/forecast?q=${translatedLocation}&appid=c1e2a2b668f3b1b6a8c6c3a71d33f44f&units=metric&lang=ua`
                )
              ).data.list
            ),
            currentWeather: {
              ...(
                await fetchWeather(
                  `https://api.openweathermap.org/data/2.5/weather?q=${translatedLocation}&appid=c1e2a2b668f3b1b6a8c6c3a71d33f44f&units=metric&lang=ua`
                )
              ).data,
              ...todaysDate,
              location: searchValue,
            },
          };
          dispatch(setSityError(false));
          dispatch(setTransition(true));
          setTimeout(() => {
            dispatch(setTransition(false));
          }, 1000);
          setTimeout(() => {
            dispatch(setCurrentWeatherData(data.currentWeather));
            dispatch(setOvercastWeatherData(data.overcast));
          }, 500);
          setConditions(data.currentWeather.weather[0].main.toLowerCase());
          reactLocalStorage.set(
            "lastConditions",
            data.currentWeather.weather[0].main.toLowerCase()
          );
        });
      } catch (error) {
        dispatch(setSityError(true));
        console.log(error);
      }
    }
    getWeather();
  }, [searchValue]);

  return (
    <div
      style={{
        backgroundImage: `url(${backgrounds[conditions]})`,
      }}
      className="wrapper"
    >
      <MainInfo />
      <SideBar />
    </div>
  );
}

export default App;
