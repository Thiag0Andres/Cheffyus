//import { action } from "typesafe-actions";
import { UserTypes, UserState } from "./types";

export const updateUser = (data: UserState) => {
  //action(UserTypes.UPDATE_USER, { data });
  return { type: UserTypes.UPDATE_USER, data };
};

export const removeUser = () => {
  //action(UserTypes.REMOVE_USER);
  return { type: UserTypes.REMOVE_USER };
};
