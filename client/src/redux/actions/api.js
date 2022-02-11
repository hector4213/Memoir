/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const baseUrl =
  process.env.REACT_APP_production ||
  process.env.production ||
  "http://localhost:3001/api";

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//  S T O R Y
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const getAllStories = async () => {
  return await axios.get(`${baseUrl}/stories`);
};

const getStory = async (storyId) => {
  return await axios.get(`${baseUrl}/stories/${storyId}`);
};

const createStory = async (formInfo, headers) => {
  return await axios.post(`${baseUrl}/stories/create`, formInfo, {
    headers: headers,
  });
};

const editStory = async (storyId, entryInfo, headers) => {
  return await axios.put(`${baseUrl}/stories/edit/${storyId}`, entryInfo, {
    headers: headers,
  });
};

const deleteStory = async (storyId, headers) => {
  return await axios.delete(`${baseUrl}/stories/${storyId}`, {
    headers: headers,
  });
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//  E N T R Y
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const getEntry = async (storyId, entryId) => {
  return await axios.get(`${baseUrl}/stories/${storyId}/entries/${entryId}`);
};

const editEntry = async (storyId, entryId, entryInfo, headers) => {
  return await axios.put(
    `${baseUrl}/stories/${storyId}/entries/edit/${entryId}`,
    entryInfo,
    { headers: headers }
  );
};

const createEntry = async (storyId, entryInfo, headers) => {
  return await axios.post(`${baseUrl}/stories/${storyId}/entries`, entryInfo, {
    headers: headers,
  });
};

const deleteEntry = async (storyId, entryId, headers) => {
  return await axios.delete(
    `${baseUrl}/stories/${storyId}/entries/${entryId}`,
    { headers: headers }
  );
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//  P R O F I L E
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const getProfile = async (userId, headers) => {
  return await axios.get(`${baseUrl}/profile/${userId}`, { headers: headers });
};

const deleteProfile = async (profileId, headers) => {
  return await axios.delete(`${baseUrl}/profile/${profileId}`, {
    headers: headers,
  });
};

const editProfile = async (profileInfo, headers) => {
  return await axios.put(`${baseUrl}/profile/${profileInfo.id}`, profileInfo, {
    headers: headers,
  });
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//  A U T H
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const logIn = async (formInfo) => {
  return await axios.post(`${baseUrl}/auth/login`, formInfo);
};

const register = async (formInfo) => {
  return await axios.post(`${baseUrl}/auth/signup`, formInfo);
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//  F O R E I G N  E N T R I E S
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const getForeignEntries = async (userId, headers) => {
  return await axios.get(`${baseUrl}/profile/${userId}/manage`, {
    headers: headers,
  });
};

const editForeignEntries = async (userId, entryId, entryStatus, headers) => {
  return await axios.put(
    `${baseUrl}/profile/${userId}/manage/${entryId}`,
    {
      entry_status: entryStatus,
    },
    { headers: headers }
  );
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//  I N S P I R E D
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const setInspired = async (storyId, headers) => {
  return await axios.post(`${baseUrl}/stories/${storyId}/inspire`, null, {
    headers: headers,
  });
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//  S E A R C H
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const searchTag = async (searchTerm) => {
  return await axios.get(`${baseUrl}/search/entries?tag=${searchTerm}`);
};

const searchTitle = async (searchTerm) => {
  return await axios.get(`${baseUrl}/search/entries/title?title=${searchTerm}`);
};

const searchDate_full = async (m, d, y) => {
  return await axios.get(
    `${baseUrl}/search/entries/date?year=${y}&month=${m}&day=${d} `
  );
};

const searchDate_year = async (y) => {
  return await axios.get(`${baseUrl}/search/entries/date?year=${y}`);
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//  I M G U R
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const deleteIMGUR = async (hash) => {
  return await axios({
    method: "DELETE",
    url: `https://api.imgur.com/3/image/${hash}`,
    headers: {
      Authorization: `Client-ID 39612fe2e37daed`,
      "Content-Type": "image",
    },
  });
};

export default {
  getAllStories,
  getStory,
  editStory,
  createStory,
  deleteStory,

  createEntry,
  getEntry,
  editEntry,
  deleteEntry,

  getProfile,
  deleteProfile,
  editProfile,

  logIn,
  register,

  getForeignEntries,
  editForeignEntries,

  setInspired,

  searchTag,
  searchTitle,
  searchDate_full,
  searchDate_year,

  deleteIMGUR,
};
