import { ActionType } from "./action";
const AppReducer = (state, action) => {
  switch (action.type) {
    case ActionType.START_LOAD_MEDIA:
      console.log("Start fetch...");
      return {
        ...state,
        isLoading: true,
      };
    case ActionType.START_RELOAD_MEDIA:
      console.log("Start fetch...");
      return {
        ...state,
        isLoading: true,
        mediaList: [],
      };
    case ActionType.RELOAD_MEDIA_SUCCESSFUL:
      console.log("End fetch...Reload state");
      return {
        ...state,
        isLoading: false,
        currentPage: action.pageNum,
        mediaList: action.mediaList,
      };
    case ActionType.LOAD_MEDIA_SUCCESSFUL: {
      console.log("End fetch...Assign state");
      if (action.pageNum === state.currentPage) {
        console.log("End fetch...Dup state");
        return { ...state, isLoading: false };
      }
      let appendedMediaList = state.mediaList.concat(action.mediaList);
      return {
        ...state,
        isLoading: false,
        currentPage: action.pageNum,
        mediaList: appendedMediaList,
      };
    }
    case ActionType.LOAD_MEDIA_FAILED:
      console.log("End fetch...Error");
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    case ActionType.UPDATE_SORT_FILTER:
      return {
        ...state,
        sortFilter: {
          ...state.sortFilter, 
          sortBy: action.sortBy,
          sortDirection: action.sortDirection,
          collection: action.collection
        },
      };
    case ActionType.SET_COLLECTION_LIST:
      return {
        ...state,
        collections: action.collections
      };
    case ActionType.FILTER_BY_COLLECTION:
      return {
        ...state,
        collections: action.collections,
        sortFilter: {
          ...state.sortFilter,
          collection: action.collection
        },
      };
    default:
      throw new Error();
  }
};
export default AppReducer;
