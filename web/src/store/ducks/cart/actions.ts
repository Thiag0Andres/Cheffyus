//import { action } from "typesafe-actions";
import { CartTypes, CartState } from "./types";

export const addCart = (data: CartState) => {
  return { type: CartTypes.ADD_ITEM_CART, data };
};

export const removeCart = (id: number) => {
  return { type: CartTypes.REMOVE_ITEM_CART, id };
};
