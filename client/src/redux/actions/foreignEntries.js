import api from "./api";

export const getForeignEntriesAction = () => {
  return async (dispatch, getState) => {
    const userId = getState().profile.user.id;
    const token = getState().profile.token;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    };

    try {
      const response = await api.getForeignEntries(userId, headers);
      dispatch({
        type: "FOREIGN_ENTRIES",
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.response ? error.response.data.error : error.message,
      });
    }
  };
};

export const editForeignEntriesAction = (entryId, entryStatus) => {
  return async (dispatch, getState) => {
    const userId = getState().profile.user.id;
    const token = getState().profile.token;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    };

    try {
      await api.editForeignEntries(userId, entryId, entryStatus, headers);
      // edit Foreign Entries then get Updated
      const res = await api.getForeignEntries(userId, headers);

      dispatch({
        type: "FOREIGN_ENTRIES",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.response ? error.response.data.error : error.message,
      });
    }
  };
};
