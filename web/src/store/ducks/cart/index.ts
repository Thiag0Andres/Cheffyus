import { Reducer } from "redux";
import { CartState, CartTypes } from "./types";
import { environment } from "../../../environment/environment";

const { REACT_APP_LOCAL_STORAGE_CART } = environment;

const LAST_CART: CartState = {
  cart: JSON.parse(
    localStorage.getItem(REACT_APP_LOCAL_STORAGE_CART) as string
  ),
};

const INITIAL_STATE: CartState = {
  cart: [],
};

const reducer: Reducer<CartState> = (
  state = LAST_CART.cart ? LAST_CART : INITIAL_STATE,
  action
) => {
  const addedCartState = state;
  const address = environment.REACT_APP_LOCAL_STORAGE_CART;

  switch (action.type) {
    case CartTypes.ADD_ITEM_CART:
      //console.log(addedCartState);
      addedCartState.cart = [...addedCartState.cart, action.data];
      localStorage.setItem(address, JSON.stringify(addedCartState.cart));

      return { ...state, ...addedCartState };

    case CartTypes.REMOVE_ITEM_CART:
      addedCartState.cart = addedCartState.cart.filter(
        (item: any) => item.id !== action.id
      );

      //Remove dados do localstorage
      localStorage.setItem(address, JSON.stringify(addedCartState.cart));

      return { ...state, ...addedCartState };

    default:
      return state;
  }
};

export default reducer;
