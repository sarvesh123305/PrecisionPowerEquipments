const initialState = false;

const adminAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ADMIN_AUTH":
      return action.payload;
    default:
      return state;
  }
};

export default adminAuthReducer;