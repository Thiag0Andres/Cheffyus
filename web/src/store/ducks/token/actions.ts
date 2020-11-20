//import { action } from "typesafe-actions";
import { TokenTypes, TokenState } from "./types";

export const updateToken = (data: TokenState) => {
  //action(TokenTypes.UPDATE_TOKEN, { data });
  return { type: TokenTypes.UPDATE_TOKEN, data };
};

export const removeToken = () => {
  //action(TokenTypes.REMOVE_TOKEN);
  return { type: TokenTypes.REMOVE_TOKEN };
};
