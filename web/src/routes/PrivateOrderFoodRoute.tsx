import React from "react";
import { Route, Redirect } from "react-router-dom";

// Redux e Auth
import { useSelector, RootStateOrAny } from "react-redux";

// Types
import { TokenDelivery } from "../store/ducks/tokenDelivery/types";

export interface PrivateOrderFoodRoute {
  component: React.FC;
  path: string;
  exact: boolean;
}

const PrivateOrderFoodRoutetsx: React.FC<PrivateOrderFoodRoute> = (
  props: PrivateOrderFoodRoute
) => {
  const condition: TokenDelivery = useSelector(
    (state: RootStateOrAny) => state.tokenDelivery.tokenDelivery.tokenDelivery
  );
  const { component, path, exact } = props;

  return condition ? (
    <Route exact path={path} component={component} />
  ) : (
    <Redirect to="/food/login" />
  );
};

export default PrivateOrderFoodRoutetsx;
