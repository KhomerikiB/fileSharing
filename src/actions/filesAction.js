import { SEND_FILE, GET_ERROR, GET_LOADING } from "../types";
import axios from "axios";
export const sendFileAction = data => dispatch => {
  dispatch({
    type: GET_LOADING
  });
  axios
    .post("/api/upload", data)
    .then((result, err) => {
      if (!result || err)
        return dispatch({
          type: GET_ERROR,
          payload: "Something went wrong"
        });
      dispatch({
        type: SEND_FILE,
        payload: result.data
      });
    })
    .catch(err => {
      return dispatch({
        type: GET_ERROR,
        payload: err.response.data
      });
    });
};
