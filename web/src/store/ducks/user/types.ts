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

/* export interface User {
  id: string;
  token: string;
  email: string;
  name: string;
  nickName: string;
} */

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  display_name: string;
  username: string;
  emails: Array<string>;
  defaultEmail: string;
  bio: string;
  image_url: string;
  phone_number: string;
  user_type: string;
  location_lat: number;
  location_lon: number;
  preferences_id: Array<number>;
  kitchen_ids: any;
  followers_ids: Array<number>;
  following_ids: Array<number>;
  reviews_ids: Array<number>;
  is_email_verified: boolean;
  verification_email_token: number;
  created_at: string;
  updated_at: string;
}

/**
 * State type
 * @data : the constructionCompany
 */
export interface UserState {
  user: User;
}
