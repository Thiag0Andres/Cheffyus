//import { action } from "typesafe-actions";
import { UserTypes, UserDeliveryState } from "./types";

export const updateUserDelivery = (data: UserDeliveryState) => {
  //action(UserTypes.UPDATE_USER, { data });
  return { type: UserTypes.UPDATE_USER_DELIVERY, data };
};

export const removeUserDelivery = () => {
  //action(UserTypes.REMOVE_USER);
  return { type: UserTypes.REMOVE_USER_DELIVERY };
};
