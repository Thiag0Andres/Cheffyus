import React from "react";
import { Route, Redirect } from "react-router-dom";

// Redux e Auth
import { useSelector, RootStateOrAny } from "react-redux";

// Types
import { Token } from "../store/ducks/token/types";

export interface PrivateRentKitchenRoute {
  component: React.FC;
  path: string;
  exact: boolean;
}

const PrivateRentKitchenRoute: React.FC<PrivateRentKitchenRoute> = (
  props: PrivateRentKitchenRoute
) => {
  const condition: Token = useSelector(
    (state: RootStateOrAny) => state.token.token.token
  );
  const { component, path, exact } = props;

  return condition ? (
    <Route exact path={path} component={component} />
  ) : (
    <Redirect to="/kitchen/login" />
  );
};

export default PrivateRentKitchenRoute;
