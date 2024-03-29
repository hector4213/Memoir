export const initialState = {
  user: null,
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case "REMOVE_PROFILE":
      return {};

    case "ADD_PROFILE":
      return { ...state, ...action.payload };

    case "EDIT_PROFILE":
      return { ...state, user: action.payload };

    case "ADD_ENTRIES_STORIES":
      return { ...state, ...action.payload };

    case "FOREIGN_ENTRIES":
      return { ...state, foreignEntries: action.payload };

    default:
      return state;
  }
};

export default profile;
