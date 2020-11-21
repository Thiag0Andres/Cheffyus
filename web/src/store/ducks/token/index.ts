import { Reducer } from "redux";
import { TokenState, TokenTypes } from "./types";
import { environment } from "../../../environment/environment";

const { REACT_APP_LOCAL_STORAGE_TOKEN } = environment;

const LAST_TOKEN: TokenState = {
  token: {
    token: localStorage.getItem(REACT_APP_LOCAL_STORAGE_TOKEN) as string,
  },
};

const INITIAL_STATE: TokenState = {
  token: {
    token: "",
  },
};

const reducer: Reducer<TokenState> = (
  state = LAST_TOKEN ? LAST_TOKEN : INITIAL_STATE,
  action
) => {
  const updatedTokenState = state;
  const address = environment.REACT_APP_LOCAL_STORAGE_TOKEN;

  switch (action.type) {
    case TokenTypes.UPDATE_TOKEN:
      updatedTokenState.token.token = action.data;
      localStorage.setItem(address, updatedTokenState.token.token);
      //updatedTokenState.token = action.data.token;
      // localStorage.setItem(
      //   environment.REACT_APP_LOCAL_STORAGE_TOKEN_AUTH,
      //   JSON.stringify(),
      // );

      return { ...state, ...updatedTokenState };

    case TokenTypes.REMOVE_TOKEN:
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
