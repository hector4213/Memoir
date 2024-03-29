export const initialState = {
  modal: false,
};

const page = (state = initialState, action) => {
  switch (action.type) {
    case "ERROR":
      return { ...state, error: action.payload };

    case "TOGGLE_MODAL":
      return {
        ...state,
        modal: action.payload,
        showingPage: action.showingPage,
      };

    case "SET_ALL_STORIES":
      return { ...state, stories: action.payload };

    case "CURRENT_STORY":
      return { ...state, current: { ...state.current, story: action.payload } };

    case "CURRENT_ENTRY":
      return { ...state, current: { ...state.current, entry: action.payload } };

    case "CLEAR_CURRENT":
      return { ...state, current: null };

    case "SEARCH_RESULTS":
      return { ...state, results: action.payload };

    default:
      return state;
  }
};

export default page;
