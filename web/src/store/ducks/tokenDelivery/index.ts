import { Reducer } from "redux";
import { TokenDeliveryState, TokenTypes } from "./types";
import { environment } from "../../../environment/environment";

const { REACT_APP_LOCAL_STORAGE_TOKEN_DELIVERY } = environment;

const LAST_TOKEN: TokenDeliveryState = {
  tokenDelivery: {
    tokenDelivery: localStorage.getItem(
      REACT_APP_LOCAL_STORAGE_TOKEN_DELIVERY
    ) as string,
  },
};

const INITIAL_STATE: TokenDeliveryState = {
  tokenDelivery: {
    tokenDelivery: "",
  },
};

const reducer: Reducer<TokenDeliveryState> = (
  state = LAST_TOKEN ? LAST_TOKEN : INITIAL_STATE,
  action
) => {
  const updatedTokenState = state;
  const address = environment.REACT_APP_LOCAL_STORAGE_TOKEN_DELIVERY;

  switch (action.type) {
    case TokenTypes.UPDATE_TOKEN_DELIVERY:
      updatedTokenState.tokenDelivery.tokenDelivery = action.data;
      localStorage.setItem(
        address,
        updatedTokenState.tokenDelivery.tokenDelivery
      );
      //updatedTokenState.token = action.data.token;
      // localStorage.setItem(
      //   environment.REACT_APP_LOCAL_STORAGE_TOKEN_AUTH,
      //   JSON.stringify(),
      // );

      return { ...state, ...updatedTokenState };

    case TokenTypes.REMOVE_TOKEN_DELIVERY:
      //Remove dados do localstorage
      localStorage.removeItem(address);

      // localStorage.removeItem(
      //   environment.REACT_APP_LOCAL_STORAGE_TOKEN_AUTH,
      // );

      return { ...state, ...INITIAL_STATE };

    default:
      return state;
  }
};

export default reducer;
