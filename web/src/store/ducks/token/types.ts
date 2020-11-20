/**
 * Action types
 * @UPDATE_TOKEN update token infos
 * @REMOVE_TOKEN remove token infos
 */
export enum TokenTypes {
  UPDATE_TOKEN = "@constructionCompany/HANDLE_TOKEN",
  REMOVE_TOKEN = "@constructionCompany/REMOVE_TOKEN",
}

/**
 * Data types
 * @token : token of user
 */

export interface Token {
  token: string;
}

/**
 * State type
 * @data : the constructionCompany
 */
export interface TokenState {
  token: Token;
}
