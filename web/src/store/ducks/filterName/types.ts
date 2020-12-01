/**
 * Action types
 * @UPDATE_FILTER_NAME update filter name infos
 * @REMOVE_FILTER_NAME remove filter name infos
 */
export enum FilterNameTypes {
  UPDATE_FILTER_NAME = "@constructionCompany/HANDLE_FILTER_NAME",
  REMOVE_FILTER_NAME = "@constructionCompany/REMOVE_FILTER_NAME",
}

/**
 * Data types
 * @filterName : filter of name
 */

export interface FilterName {
  user: {
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
  };
  kitchen: {
    id: number;
    user_id: number;
    description: string;
    image_urls: Array<string>;
    price_per_time: number;
    time_type: string;
    category_id: number;
    expireDate: string;
    status: string;
    likes: number;
    location_lat: number;
    location_lon: number;
    createdAt: string;
    updatedAt: string;
    name: string;
  };
}

/**
 * State type
 * @data : the constructionCompany
 */
export interface FilterNameState {
  filterName: FilterName[];
}
