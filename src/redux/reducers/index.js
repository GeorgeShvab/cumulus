import { combineReducers } from "redux";

import location from "./location.js";
import currentWeatherData from "./currentWeatherData.js";
import overcastWeatherData from "./overcastWeatherData.js";
import transition from "./transition.js";
import sityError from "./sityError.js";

const rootReducer = combineReducers({
  location,
  currentWeatherData,
  overcastWeatherData,
  transition,
  sityError,
});

export default rootReducer;
