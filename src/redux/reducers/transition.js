const initialState = true;

const transition = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TRANSITION":
      const tr = action.payload;
      return tr;
    default: 
      return state;
  }
};

export default transition;