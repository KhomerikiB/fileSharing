import { GET_ERROR } from "../types";
const initialState = {
  errors: []
};
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ERROR:
      return {
        ...state,
        errors: action.payload
      };
    default:
      return state;
  }
};
