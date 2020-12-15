import { environment } from "../environment/environment";

const {
  REACT_APP_LOCAL_STORAGE_TOKEN,
  REACT_APP_LOCAL_STORAGE_TOKEN_DELIVERY,
} = environment;

export const isAuthenticated = () => {
  const token = localStorage.getItem(REACT_APP_LOCAL_STORAGE_TOKEN) as string;

  if (token && token !== " ") {
    return true;
  }
  return false;
};

export const isAuthenticatedDelivery = () => {
  const tokenDelivery = localStorage.getItem(
    REACT_APP_LOCAL_STORAGE_TOKEN_DELIVERY
  ) as string;

  if (tokenDelivery && tokenDelivery !== " ") {
    return true;
  }
  return false;
};
