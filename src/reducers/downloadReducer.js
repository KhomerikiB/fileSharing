import { RECEIVED_FILES } from "../types";
const initialState = {
  receivedFiles: []
};
export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVED_FILES:
      return {
        ...state,
        receivedFiles: action.payload
      };
    default:
      return state;
  }
};
