import { combineReducers } from "redux";
import CredentialReducers from "./CredentialReducers";
import InventoriesReducers from "./InventoriesReducers";
import UsersReducers from "./UsersReducers";

export default combineReducers({
  credential: CredentialReducers,
  users: UsersReducers,
  inventories: InventoriesReducers
});
