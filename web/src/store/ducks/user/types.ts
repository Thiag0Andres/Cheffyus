/**
 * Action types
 * @UPDATE_USER update user infos
 * @REMOVE_USER remove user infos
 */
export enum UserTypes {
  UPDATE_USER = "@constructionCompany/HANDLE_USER",
  REMOVE_USER = "@constructionCompany/REMOVE_USER",
}

/**
 * Data types
 * @token : token of user
 * @name : name of user
 */

export interface User {
  id: string;
  token: string;
  email: string;
  name: string;
  nickName: string;
}

/**
 * State type
 * @data : the constructionCompany
 */
export interface UserState {
  user: User;
}
