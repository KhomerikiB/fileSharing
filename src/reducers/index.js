import { combineReducers } from "redux";
import filesReducer from "./filesReducer";
import errorReducer from "./errorReducer";
import downloadReducer from "./downloadReducer";
export default combineReducers({
  files: filesReducer,
  errors: errorReducer,
  receivedFiles: downloadReducer
});
