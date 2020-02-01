import { FetchCategories, AddCategories, DeleteCategories, UnMountAlert, EditCategories } from "../Actions/Actions";

const initialState = {
  Success: false,
  message: "",
  Categories: [],
  Loading: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UnMountAlert:
      return {
        ...state,
        message: "",
        Success: false,
        Loading: false
      };
    case FetchCategories:
      if (action.payload.success === true) {
        return {
          ...state,
          Categories: action.payload.Categories,
          Success: true,
          Loading: false
        };
      } else {
        return {
          ...state,
          Loading: false
        };
      }
    case DeleteCategories:
      if (action.payload.success === true) {
        let filteredCategories = state.Categories.filter(category => category._id !== action.payload.Category._id);
        return {
          ...state,
          Categories: [...filteredCategories],
          Success: true,
          message: action.payload.message,
          Loading: false
        };
      } else {
        return {
          ...state,
          Loading: false
        };
      }
    case EditCategories:
      if (action.payload.success === true) {
        let filteredCategories = state.Categories.filter(category => category._id !== action.payload.Category._id);
        return {
          ...state,
          Categories: [...filteredCategories, action.payload.Category],
          Success: true,
          message: action.payload.message,
          Loading: false
        };
      } else {
        return {
          ...state,
          Loading: false
        };
      }
    case AddCategories:
      if (action.payload.success === true) {
        return {
          ...state,
          Categories: [...state.Categories, action.payload.Category],
          message: action.payload.message,
          Success: true,
          Loading: false
        };
      } else {
        return {
          ...state,
          Loading: false
        };
      }
    default:
      return {
        ...state,
        Loading: false
      };
  }
};
