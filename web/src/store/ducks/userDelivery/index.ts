import { Reducer } from "redux";
import { UserDeliveryState, UserTypes } from "./types";
import { environment } from "../../../environment/environment";

const { REACT_APP_LOCAL_STORAGE_USER_DELIVERY } = environment;

const LAST_USER: UserDeliveryState = {
  userDelivery: JSON.parse(
    localStorage.getItem(REACT_APP_LOCAL_STORAGE_USER_DELIVERY) as string
  ),
};

const INITIAL_STATE: UserDeliveryState = {
  userDelivery: {
    id: 0,
    name: " ",
    imagePath: " ",
    email: " ",
    country_code: " ",
    phone_no: " ",
    restaurant_name: " ",
    user_type: " ",
    verification_email_status: "pending",
    verification_phone_status: "pending",
    status: null,
    location_lat: 0,
    location_lon: 0,
    zoom_id: null,
    zoom_pass: null,
    skip_doc: false,
    stripe_id: null,
    device_id: null,
    createdAt: " ",
    updatedAt: " ",
    bio: " ",
    active_address: null,
    city: " ",
    state: " ",
    adminVerficaton: false,
    auth_token: " ",
    address: [],
  },
};

const reducer: Reducer<UserDeliveryState> = (
  state = LAST_USER ? LAST_USER : INITIAL_STATE,
  action
) => {
  const updatedUserState = state;
  const address = environment.REACT_APP_LOCAL_STORAGE_USER_DELIVERY;

  switch (action.type) {
    case UserTypes.UPDATE_USER_DELIVERY:
      updatedUserState.userDelivery = action.data;
      localStorage.setItem(
        address,
        JSON.stringify(updatedUserState.userDelivery)
      );

      return { ...state, ...updatedUserState };

    case UserTypes.REMOVE_USER_DELIVERY:
      //Remove dados do localstorage
      localStorage.removeItem(address);

      return { ...state, ...INITIAL_STATE };

    default:
      return state;
  }
};

export default reducer;
