import api from "./api";

export const logInAction = (formInfo) => {
  return async (dispatch, getState) => {
    if (formInfo && formInfo.email && formInfo.password) {
      try {
        const response = await api.logIn(formInfo);

        dispatch({
          type: "ERROR",
          payload: null,
        });
        dispatch({
          type: "ADD_PROFILE",
          payload: response.data,
        });
        dispatch({
          type: "TOGGLE_MODAL",
          payload: !getState().page.modal,
        });

        localStorage.setItem("profile", JSON.stringify(response.data));
        return true;
      } catch (error) {
        if (error.response.data.error) {
          dispatch({
            type: "ERROR",
            payload: error.response ? error.response.data.error : error.message,
          });
        } else {
          dispatch({
            type: "ERROR",
            payload: error.response ? error.response.data : error.message,
          });
        }
      }
    } else {
      dispatch({
        type: "ERROR",
        payload: "All input fields must be filled out",
      });
    }

    return false;
  };
};

export const logOutAction = () => {
  localStorage.clear();
  return async (dispatch) => {
    dispatch({ type: "REMOVE_PROFILE" });
  };
};
