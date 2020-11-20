import { Reducer } from "redux";
import { UserState, UserTypes } from "./types";
import { environment } from "../../../environment/environment";

const { REACT_APP_LOCAL_STORAGE_USER } = environment;

const LAST_USER: UserState = {
  user: JSON.parse(
    localStorage.getItem(REACT_APP_LOCAL_STORAGE_USER) as string
  ),
};

const INITIAL_STATE: UserState = {
  user: {
    id: 0,
    first_name: " ",
    last_name: " ",
    display_name: " ",
    username: " ",
    emails: [],
    defaultEmail: " ",
    bio: " ",
    image_url: " ",
    phone_number: " ",
    user_type: " ",
    location_lat: 0,
    location_lon: 0,
    preferences_id: [],
    kitchen_ids: [],
    followers_ids: [],
    following_ids: [],
    reviews_ids: [],
    is_email_verified: false,
    verification_email_token: 0,
    created_at: " ",
    updated_at: " ",
  },
};

const reducer: Reducer<UserState> = (
  state = LAST_USER ? LAST_USER : INITIAL_STATE,
  action
) => {
  const updatedUserState = state;
  const address = environment.REACT_APP_LOCAL_STORAGE_USER;

  switch (action.type) {
    case UserTypes.UPDATE_USER:
      updatedUserState.user = action.data;
      localStorage.setItem(address, JSON.stringify(updatedUserState.user));
      //updatedUserState.user = action.data.user;
      // localStorage.setItem(
      //   environment.REACT_APP_LOCAL_STORAGE_USER_AUTH,
      //   JSON.stringify(),
      // );

      return { ...state, ...updatedUserState };

    case UserTypes.REMOVE_USER:
      //Remove dados do localstorage
      localStorage.removeItem(address);

      // localStorage.removeItem(
      //   environment.REACT_APP_LOCAL_STORAGE_USER_AUTH,
      // );

      return { ...state, ...INITIAL_STATE };

    default:
      return state;
  }
};

export default reducer;
