const initialState = {
  data: [],
};

const overcastWeatherData = (state = initialState, action) => {
  switch (action.type) {
    case "SET_OVERCAST_WEATHER_DATA":
      const data = action.payload;
      return data;
    default: 
      return state;
  }
};

export default overcastWeatherData;