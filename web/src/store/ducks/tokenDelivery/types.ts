/**
 * Action types
 * @UPDATE_TOKEN_DELIVERY update token infos
 * @REMOVE_TOKEN_DELIVERY remove token infos
 */
export enum TokenTypes {
  UPDATE_TOKEN_DELIVERY = "@constructionCompany/HANDLE_TOKEN_DELIVERY",
  REMOVE_TOKEN_DELIVERY = "@constructionCompany/REMOVE_TOKEN_DELIVERY",
}

/**
 * Data types
 * @tokenDelivery : token of user
 */

export interface TokenDelivery {
  tokenDelivery: string;
}

/**
 * State type
 * @data : the constructionCompany
 */
export interface TokenDeliveryState {
  tokenDelivery: TokenDelivery;
}
