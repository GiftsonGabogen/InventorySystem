import { UpdateSales, FetchAll } from "../Actions/Actions";

const initialState = {
  Success: false,
  message: "",
  Sales: [],
  Sale: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UpdateSales:
      if (action.payload.success === true) {
        let FilteredSales = state.Sales.filter(
          Sale => Sale._id !== action.payload.Sale._id
        );

        return {
          ...state,
          Sales: [...FilteredSales, action.payload.Sale],
          Success: true,
          message: action.payload.message
        };
      } else {
        return {
          ...state,
          Success: false,
          message: action.payload.message
        };
      }
    case FetchAll:
      console.log(action);
      if (action.sales.success === true) {
        return {
          ...state,
          Sales: action.sales.Sales,
          Success: true
        };
      } else {
        return {
          ...state,
          Success: false,
          message: action.items.message + " " + action.categories.message
        };
      }
    default:
      return {
        ...state
      };
  }
};
