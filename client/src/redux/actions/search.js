import api from "./api";

export const clearSearchAction = (searchTerm) => {
  return (dispatch, getState) => {
    dispatch({
      type: "SEARCH_RESULTS",
      payload: null,
    });

    dispatch({
      type: "ERROR",
      payload: null,
    });
  };
};

export const searchAction = (searchType, searchTerm) => {
  return async (dispatch, getState) => {
    if (searchTerm.length < 3) {
      dispatch({
        type: "SEARCH_RESULTS",
        payload: null,
      });

      dispatch({
        type: "ERROR",
        payload: null,
      });
    } else {
      try {
        let res;
        if (searchType === "tag") {
          res = await api.searchTag(searchTerm);
        } else if (searchType === "title") {
          res = await api.searchTitle(searchTerm);
        } else if (searchType === "date") {
          const m = searchTerm.month;
          const d = searchTerm.day;
          const y = searchTerm.year;

          if (m > 0 && d > 0 && y > 0) {
            res = await api.searchDate_full(m, d, y);
          } else if (m === 0 && d === 0 && y > 0) {
            res = await api.searchDate_year(y);
          }
        }

        if (res.data.length > 0) {
          dispatch({
            type: "SEARCH_RESULTS",
            payload: res.data,
          });

          dispatch({
            type: "ERROR",
            payload: null,
          });
        } else {
          dispatch({
            type: "ERROR",
            payload: "no entries found",
          });
        }
      } catch (error) {
        dispatch({
          type: "ERROR",
          payload: error.response ? error.response.data.msg : error.message,
        });
      }
    }
  };
};
