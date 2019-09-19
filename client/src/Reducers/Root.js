import { combineReducers } from "redux";
import ItemReducers from "./ItemReducers";
import SalesReducers from "./SalesReducer";
import CredentialReducers from "./CredentialReducers";
import UsersReducers from "./UsersReducers";

export default combineReducers({
  items: ItemReducers,
  credential: CredentialReducers,
  sales: SalesReducers,
  users: UsersReducers
});
