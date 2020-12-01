import { Reducer } from "redux";
import { FilterNameTypes, FilterNameState } from "./types";
import { environment } from "../../../environment/environment";

const { REACT_APP_LOCAL_STORAGE_FILTER_NAME } = environment;

const INITIAL_STATE: FilterNameState = {
  filterName: [],
};

const reducer: Reducer<FilterNameState> = (state = INITIAL_STATE, action) => {
  const updatedFilterNameState = state;
  const address = environment.REACT_APP_LOCAL_STORAGE_FILTER_NAME;

  switch (action.type) {
    case FilterNameTypes.UPDATE_FILTER_NAME:
      updatedFilterNameState.filterName = action.data;

      //updatedFilterNameState.token = action.data.filterName;
      // localStorage.setItem(
      //   environment.REACT_APP_LOCAL_STORAGE_TOKEN_AUTH,
      //   JSON.stringify(),
      // );

      return { ...state, ...updatedFilterNameState };

    case FilterNameTypes.REMOVE_FILTER_NAME:
      //Remove dados do localstorage
      localStorage.removeItem(address);

      // localStorage.removeItem(
      //   environment.REACT_APP_LOCAL_STORAGE_TOKEN_AUTH,
      // );

      return { ...state, ...INITIAL_STATE };

    default:
      return state;
  }
};

export default reducer;
