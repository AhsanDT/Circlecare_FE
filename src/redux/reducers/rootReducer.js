import { combineReducers } from "redux";
import authReducer from "./authReducer";
import healthReducer from "./healthReducer";


const rootReducer = combineReducers({
  auth: authReducer,
  health: healthReducer,
});

export default rootReducer;
