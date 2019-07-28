import { GET_LOADING, SEND_FILE } from "../types";
const initialState = {
  status: false,
  loading: false,
  id: ""
};
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LOADING:
      return {
        ...state,
        loading: true
      };
    case SEND_FILE:
      return {
        ...state,
        status: action.payload.success,
        id: action.payload.id,
        loading: false
      };
    default:
      return state;
  }
};
