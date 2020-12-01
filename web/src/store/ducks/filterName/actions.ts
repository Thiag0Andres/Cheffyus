//import { action } from "typesafe-actions";
import { FilterNameTypes, FilterNameState } from "./types";

export const updateFilterName = (data: FilterNameState) => {
  //action(FilterNameTypes.UPDATE_FILTER_NAME, { data });
  return { type: FilterNameTypes.UPDATE_FILTER_NAME, data };
};

export const removeFilterName = () => {
  //action(FilterNameTypes.REMOVE_FILTER_NAME);
  return { type: FilterNameTypes.REMOVE_FILTER_NAME };
};
