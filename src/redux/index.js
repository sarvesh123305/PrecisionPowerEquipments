import { combineReducers } from "redux";
import adminAuthReducer from "./adminAuthReducer";

const rootReducer = combineReducers({
  adminAuth: adminAuthReducer,
  // Add other reducers here if needed
});

export default rootReducer;
