import { combineReducers } from "redux";
import ItemReducers from "./ItemReducers";
import CredentialReducers from "./CredentialReducers";

export default combineReducers({
  items: ItemReducers,
  credential: CredentialReducers
});
