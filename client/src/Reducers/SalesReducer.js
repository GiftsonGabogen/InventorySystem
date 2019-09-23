import { UpdateSales, FetchAll, FetchAllSales } from "../Actions/Actions";

const initialState = {
  Success: false,
  message: "",
  Sales: [],
  Sale: {},
  MonthSale: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UpdateSales:
      if (action.payload.success === true) {
        let FilteredSales = []
        if (state.Sales.length !== 0) {
          FilteredSales = state.Sales.filter(
            Sale => Sale._id !== action.payload.Sale._id
          );
        }

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
    case FetchAllSales:
      if (action.payload.success === true) {
        let MonthSale
        let Sales
        if (action.Month === true) {
          Sales = state.sales
          MonthSale = action.payload.Sales
        } else {
          Sales = action.payload.Sales
          MonthSale = []
        }
        return {
          ...state,
          Sales: Sales,
          Success: true,
          MonthSale: MonthSale
        };
      } else {
        return {
          ...state,
          Success: false,
          message: action.payload.message
        };
      }
    case FetchAll:
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
