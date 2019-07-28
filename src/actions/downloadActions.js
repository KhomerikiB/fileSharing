import { RECEIVED_FILES, GET_ERROR } from "../types";
import axios from "axios";
export const receiveFilesAction = (confirm_id, history) => dispatch => {
  axios
    .get(`/api/download/${confirm_id}`)
    .then(result => {
      return dispatch({
        type: RECEIVED_FILES,
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
export const downloadFiles = fileID => dispatch => {
  axios.get(`/api/download/files/${fileID}`).then(res => {
    res.download("./ragaca.zip", "ragaca.zip", err => {
      if (err) {
        return res.status(404).json({ error: { error: "File Not Found" } });
      } else {
        return res.status(200).json({ success: true });
      }
    });
  });
};
