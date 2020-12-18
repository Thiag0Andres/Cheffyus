/**
 * Action types
 * @UPDATE_USER_DELIVERY update user infos
 * @REMOVE_USER_DELIVERY remove user infos
 */
export enum UserTypes {
  UPDATE_USER_DELIVERY = "@constructionCompany/HANDLE_USER_DELIVERY",
  REMOVE_USER_DELIVERY = "@constructionCompany/REMOVE_USER_DELIVERY",
}

/**
 * Data types
 * @token : token of user
 * @name : name of user
 */

export interface UserDelivery {
  id: number;
  name: string;
  imagePath?: string;
  email: string;
  country_code: string;
  phone_no: string;
  restaurant_name: string;
  user_type: string;
  verification_email_status: string;
  verification_phone_status: string;
  status: any;
  location_lat: number;
  location_lon: number;
  zoom_id: any;
  zoom_pass: any;
  skip_doc: false;
  stripe_id: any;
  device_id: any;
  createdAt: string;
  updatedAt: string;
  bio: string;
  active_address: any;
  city: string;
  state: string;
  adminVerficaton: boolean;
  auth_token: string;
}

/**
 * State type
 * @data : the constructionCompany
 */
export interface UserDeliveryState {
  userDelivery: UserDelivery;
}
