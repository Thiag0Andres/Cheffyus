import { combineReducers } from "redux";

import user from "./user";
import token from "./token";
import filterName from "./filterName";

export default combineReducers({
  user,
  token,
  filterName,
});
