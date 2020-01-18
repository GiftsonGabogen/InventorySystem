import { combineReducers } from "redux";
import CredentialReducers from "./CredentialReducers";
import InventoriesReducers from "./InventoriesReducers";
import CategoriesReducers from "./CategoriesReducers";
import LocationsReducers from "./LocationsReducers";
import UsersReducers from "./UsersReducers";

export default combineReducers({
  credential: CredentialReducers,
  users: UsersReducers,
  inventories: InventoriesReducers,
  categories: CategoriesReducers,
  locations: LocationsReducers
});
