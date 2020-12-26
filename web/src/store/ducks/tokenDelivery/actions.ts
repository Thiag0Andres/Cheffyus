//import { action } from "typesafe-actions";
import { TokenTypes, TokenDeliveryState } from "./types";

export const updateTokenDelivery = (data: TokenDeliveryState) => {
  //action(TokenTypes.UPDATE_TOKEN, { data });
  return { type: TokenTypes.UPDATE_TOKEN_DELIVERY, data };
};

export const removeTokenDelivery = () => {
  //action(TokenTypes.REMOVE_TOKEN);
  return { type: TokenTypes.REMOVE_TOKEN_DELIVERY };
};
