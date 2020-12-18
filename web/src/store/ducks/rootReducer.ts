import { combineReducers } from "redux";

import user from "./user";
import userDelivery from "./userDelivery";
import token from "./token";
import tokenDelivery from "./tokenDelivery";
import filterName from "./filterName";
import cart from "./cart";

export default combineReducers({
  user,
  userDelivery,
  token,
  tokenDelivery,
  filterName,
  cart,
});
