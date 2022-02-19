import api from "./api";

export const getMyProfileStuffAction = () => {
  return async (dispatch, getState) => {
    const userId = getState().profile.user.id;
    const token = getState().profile.token;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    };

    try {
      const response = await api.getProfile(userId, headers);

      dispatch({
        type: "ADD_ENTRIES_STORIES",
        payload: {
          myStories: response.data.stories,
          myEntries: response.data.userEntries,
        },
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.response ? error.response.data.error : error.message,
      });
    }
  };
};

export const storedProfileAction = (formInfo) => {
  return async (dispatch) => {
    const retrievedProfile = localStorage.getItem("profile");
    if (retrievedProfile) {
      const storedProfile = JSON.parse(retrievedProfile);
      dispatch({
        type: "ADD_PROFILE",
        payload: storedProfile,
      });
    }
  };
};

export const deleteProfileAction = () => {
  return async (dispatch, getState) => {
    const token = getState().profile.token;
    const profileId = getState().profile.user.id;

    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      };

      await api.deleteProfile(profileId, headers);

      localStorage.clear();
      dispatch({ type: "REMOVE_PROFILE" });
      dispatch({
        type: "TOGGLE_MODAL",
        payload: !getState().page.modal,
      });

      return true;
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.response ? error.response.data.error : error.message,
      });

      return false;
    }
  };
};

export const editProfileAction = (profileInfo) => {
  return async (dispatch, getState) => {
    const token = getState().profile.token;

    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      };

      await api.editProfile(profileInfo, headers);

      dispatch({
        type: "EDIT_PROFILE",
        payload: profileInfo,
      });

      dispatch({
        type: "TOGGLE_MODAL",
        payload: false,
        showingPage: null,
      });

      localStorage.setItem(
        "profile",
        JSON.stringify({ token: token, user: profileInfo })
      );
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.response ? error.response.data.error : error.message,
      });
    }
  };
};
