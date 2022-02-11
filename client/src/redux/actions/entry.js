import { history } from "../../index";
import api from "./api";

export const editEntryAction = (entryInfo) => {
  return async (dispatch, getState) => {
    const token = getState().profile.token;
    const storyId = getState().page.current.story.id;
    const entryId = getState().page.current.entry.id;

    try {
      entryInfo = {
        date: entryInfo.date,
        description: entryInfo.description,
        embed: entryInfo.embed,
        format_id: entryInfo.format_id,
        hashtags: entryInfo.hashtags,
        title: entryInfo.title,
      };

      const headers = {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      };

      await api.editEntry(storyId, entryId, entryInfo, headers);
      // after edit get revised entry
      const response = await api.getEntry(storyId, entryId);

      dispatch({
        type: "CURRENT_ENTRY",
        payload: response.data,
      });

      history.push(`/story/${storyId}/entry/${entryId}`);
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.response ? error.response.data.error : error.message,
      });
    }
  };
};

export const createEntryAction = (entryInfo) => {
  return async (dispatch, getState) => {
    const token = getState().profile.token;
    const storyId = getState().page.current.story.id;

    const storyAuthorId = getState().page.current.story.user.id;
    const storyAuthorName = getState().page.current.story.user.username;
    const userId = getState().profile.user.id;

    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      };

      const res = await api.createEntry(storyId, entryInfo, headers);

      console.log("entry successfully saved on db");

      if (storyAuthorId !== userId) {
        dispatch({
          type: "ERROR",
          payload: `* New entry will be visible when ${storyAuthorName} approves it.`,
        });
      }

      history.push(`/story/${storyId}/entry/${res.data.id}`);
    } catch (error) {
      console.log({ error });
      if (error.response.data.error) {
        dispatch({
          type: "ERROR",
          payload: error.response.data.error,
        });
      } else {
        dispatch({
          type: "ERROR",
          payload: error.response.data,
        });
      }
    }
  };
};

export const getSingleEntryAction = (storyId, entryId) => {
  return async (dispatch, getState) => {
    try {
      const res = await api.getEntry(storyId, entryId);

      dispatch({
        type: "CURRENT_ENTRY",
        payload: res.data,
      });
    } catch (error) {
      console.log({ error });

      dispatch({
        type: "ERROR",
        payload: error.response ? error.response.data.error : error.message,
      });
    }
  };
};

export const deleteEntryAction = (entry) => {
  return async (dispatch, getState) => {
    const token = getState().profile.token;
    const userId = getState().profile.user.id;

    const storyId = entry.story.id;
    const entryId = entry.id;

    try {
      const splitEmbed = entry.embed ? entry.embed.split(" ") : "";
      const hash = splitEmbed[1];

      if (entry && entry.embed.includes("imgur")) {
        await api.deleteIMGUR(hash);
        console.log("image deleted from imgur");
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      };

      await api.deleteEntry(storyId, entryId, headers);

      console.log("entry deleted from database");

      const response = await api.getProfile(userId, headers);

      dispatch({
        type: "ADD_ENTRIES_STORIES",
        payload: {
          myStories: response.data.stories,
          myEntries: response.data.userEntries,
        },
      });

      if (history.location.pathname !== "/profile") {
        history.push(`/story/${storyId}`);
      }
    } catch (error) {
      console.log({ error });
      dispatch({
        type: "ERROR",
        payload: error.response ? error.response.data.error : error.message,
      });
    }
  };
};
