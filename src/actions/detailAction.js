import axios from "axios";
import { gameDetailsUrl, gameScreenshotsUrl } from "../api";

const loadDetail = (id) => async (dispatch) => {
  dispatch({
    type: "LOADING_DETAIL",
  });
  const detailData = await axios.get(gameDetailsUrl(id));
  const screenShotData = await axios.get(gameScreenshotsUrl(id));

  dispatch({
    type: "GET_DETAIL",
    payload: {
      game: detailData.data,
      screen: screenShotData.data,
    },
  });
};

export default loadDetail;
