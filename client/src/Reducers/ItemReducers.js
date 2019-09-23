import {
  FetchItem,
  FetchItems,
  AddItem,
  DeleteItem,
  DeleteCategory,
  UpdateItem,
  UnMountAlert,
  AddCategory,
  FetchCategories,
  FetchAll,
  DeleteItemMultiple,
  UpdateSales
} from "../Actions/Actions";

const initialState = {
  items: [],
  item: {},
  categories: [],
  Success: false,
  message: "",
  Loaded: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FetchAll:
      if (action.categories.success === true && action.items.success === true) {
        return {
          ...state,
          items: action.items.Items,
          categories: action.categories.Categories,
          Success: true,
          Loaded: true
        };
      } else {
        return {
          ...state,
          Success: false,
          message: action.items.message + " " + action.categories.message
        };
      }
    case FetchItems:
      if (action.payload.success === true) {
        return {
          ...state,
          items: action.payload.Items,
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
    case FetchCategories:
      if (action.payload.success === true) {
        return {
          ...state,
          categories: action.payload.Categories,
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
    case FetchItem:
      if (action.payload.success === true) {
        return {
          ...state,
          item: action.payload.Item,
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
    case AddItem:
      if (action.payload.success === true) {
        return {
          ...state,
          items: [...state.items, action.payload.Item],
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
    case AddCategory:
      if (action.payload.success === true) {
        return {
          ...state,
          categories: [...state.categories, action.payload.Category],
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
    case UpdateSales:
      let Item = []
      let FilteredItems = []
      if (state.items.length !== 0) {
        Item = state.items.filter(item => item._id === action.payload.Sale.ItemID)
        Item[0].Quantity = Item[0].Quantity - action.quantity
      }
      if (state.items.length !== 0) {
        FilteredItems = state.items.filter(item => item._id !== action.payload.Sale.ItemID)
      }
      return {
        ...state,
        items: [...FilteredItems, Item[0]]
      }



    case UpdateItem:
      if (action.payload.success === true) {
        let FilteredItems = []
        let Category = []
        if (state.items.length !== 0) {
          FilteredItems = state.items.filter(
            item => item._id !== action.payload.Item._id
          );
        }
        if (state.categories.length !== 0) {
          Category = state.categories.filter(
            category => category._id === action.payload.Item.Category
          );
          action.payload.Item.Category = Category[0];
        }

        return {
          ...state,
          items: [...FilteredItems, action.payload.Item],
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

    case DeleteItem:
      if (action.payload.success === true) {
        let items = state.items.filter(
          item => item._id !== action.payload.Item._id
        );
        return {
          ...state,
          items: items,
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
    case DeleteItemMultiple:
      if (action.payload.success === true) {
        let items = state.items;
        action.payload.Item.map(item =>
          items = items.filter(thisitem => thisitem._id !== item.id)
        );
        return {
          ...state,
          items: items,
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
    case DeleteCategory:
      if (action.payload.success === true) {
        let categories = state.categories.filter(
          category => category._id !== action.payload.Category._id
        );
        return {
          ...state,
          categories: categories,
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
    case UnMountAlert:
      return {
        ...state,
        Success: false,
        message: ""
      };
    default:
      return {
        ...state
      };
  }
};
