const initialState = false;

const sityError = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SITYERROR":
      const error = action.payload;
      return error;
    default: 
      return state;
  }
};

export default sityError;