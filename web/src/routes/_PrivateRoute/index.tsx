import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../../services/auth";

export interface PrivateRouteType {
  component: React.FC;
  path: string;
  exact: boolean;
}

export const PrivateRoute: React.FC<PrivateRouteType> = (
  props: PrivateRouteType
) => {
  const { component, path, exact } = props;

  const condition = isAuthenticated();

  return condition ? (
    <Route exact path={path} component={component} />
  ) : (
    <Redirect to="/login" />
  );
};

export default PrivateRoute;
