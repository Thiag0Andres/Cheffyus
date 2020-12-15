import { createStore, applyMiddleware, Store } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { UserState } from "./ducks/user/types";
import { UserDeliveryState } from "./ducks/userDelivery/types";
import { TokenState } from "./ducks/token/types";
import { TokenDeliveryState } from "./ducks/tokenDelivery/types";
import { FilterNameState } from "./ducks/filterName/types";

import rootReducer from "./ducks/rootReducer";

export interface ApplicationState {
  user: UserState;
  userDelivery: UserDeliveryState;
  token: TokenState;
  tokenDelivery: TokenDeliveryState;
  filterName: FilterNameState;
}
let middleware: any = [];

if (process.env.NODE_ENV === "development") {
  middleware = [...middleware, thunk, logger];
} else {
  middleware = [...middleware, thunk];
}

const store: Store<ApplicationState> = createStore(
  rootReducer,
  applyMiddleware(...middleware)
);

export default store;
