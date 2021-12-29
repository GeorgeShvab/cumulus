import React from "react";
import { reactLocalStorage } from "reactjs-localstorage";

const initLoc = reactLocalStorage.getObject("searchs") ? 
 (reactLocalStorage.getObject("searchs").length ? 
  (typeof(reactLocalStorage.getObject("searchs")[0]) === "string") ? reactLocalStorage.getObject("searchs")[0] : "Лугини"
  : "Лугини")
 : "Лугини";

const initialState = {
  place: initLoc,
};

const location = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOCATION":
      const place = action.payload.location;
      return {
        place,
      };
    default:
      return state;
  }
};

export default location;
