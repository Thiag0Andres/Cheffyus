/**
 * Action types
 * @ADD_ITEM_CART add item to cart
 * @UPDATE_ITEM_CART update item to cart
 * @REMOVE_ITEM_CART remove item to cart
 */
export enum CartTypes {
  ADD_ITEM_CART = "@constructionCompany/ADD_ITEM_CART",
  REMOVE_ITEM_CART = "@constructionCompany/REMOVE_ITEM_CART",
}

/**
 * Data types
 * @token : token of user
 * @name : name of user
 */

export interface Cart {
  chef: {
    id: number;
    name?: string;
    imagePath?: string;
    restuarant_name?: string;
  };
  deliveryPriceEstimate: number;
  delivery_time: number;
  delivery_type?: string;
  id: number;
  name: string;
  price: number;
  quantity?: number;
}

export interface Quantity {}

/**
 * State type
 * @data : the constructionCompany
 */
export interface CartState {
  cart: Cart[];
}
