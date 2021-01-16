import React from "react";
import { Route, Redirect } from "react-router-dom";

// Redux e Auth
import { useSelector, RootStateOrAny } from "react-redux";
import { ApplicationState } from "../store";

// Types
import { UserDelivery } from "../store/ducks/userDelivery/types";
import { TokenDelivery } from "../store/ducks/tokenDelivery/types";

export interface PrivateRouteType {
  component: React.FC;
  path: string;
  exact: boolean;
}

export const ChefOrderFoodRoute: React.FC<PrivateRouteType> = (
  props: PrivateRouteType
) => {
  const user: UserDelivery = useSelector(
    (state: ApplicationState) => state.userDelivery.userDelivery
  );
  const condition: TokenDelivery = useSelector(
    (state: RootStateOrAny) => state.tokenDelivery.tokenDelivery.tokenDelivery
  );
  const { component, path, exact } = props;

  return condition && user.user_type == "chef" ? (
    <Route exact path={path} component={component} />
  ) : (
    <Redirect to="/" />
  );
};

export default ChefOrderFoodRoute;
