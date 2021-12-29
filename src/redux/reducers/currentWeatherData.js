const initialState = {
  data: {},
};

const currentWeatherData = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENT_WEATHER_DATA":
      const data = action.payload;
      return data;
    default: 
      return state;
  }
};

export default currentWeatherData;