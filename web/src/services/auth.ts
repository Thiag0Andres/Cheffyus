import { environment } from "../environment/environment";

const { REACT_APP_LOCAL_STORAGE_TOKEN } = environment;

export const isAuthenticated = () => {
  const token = localStorage.getItem(REACT_APP_LOCAL_STORAGE_TOKEN) as string;

  if (token && token !== " ") {
    return true;
  }
  return false;
};
