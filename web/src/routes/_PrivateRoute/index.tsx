import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../../services/auth";

// Redux e Auth
import { useSelector, RootStateOrAny } from "react-redux";

// Types
import { Token } from "../../store/ducks/token/types";

export interface PrivateRouteType {
  component: React.FC;
  path: string;
  exact: boolean;
}

export const PrivateRoute: React.FC<PrivateRouteType> = (
  props: PrivateRouteType
) => {
  const condition: Token = useSelector(
    (state: RootStateOrAny) => state.token.token.token
  );
  const { component, path, exact } = props;

  return condition ? (
    <Route exact path={path} component={component} />
  ) : (
    <Redirect to="/login" />
  );
};

export default PrivateRoute;
