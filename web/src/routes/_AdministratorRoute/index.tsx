import React from "react";
import { Route, Redirect } from "react-router-dom";

// Redux e Auth
import { useSelector, RootStateOrAny } from "react-redux";

// Types
import { User } from "../../store/ducks/user/types";
import { Token } from "../../store/ducks/token/types";

export interface PrivateRouteType {
  component: React.FC;
  path: string;
  exact: boolean;
}

export const AdministratorRoute: React.FC<PrivateRouteType> = (
  props: PrivateRouteType
) => {
  const user: User = useSelector((state: RootStateOrAny) => state.user.user);
  const condition: Token = useSelector(
    (state: RootStateOrAny) => state.token.token.token
  );
  const { component, path, exact } = props;

  return condition && user.user_type == "admin" ? (
    <Route exact path={path} component={component} />
  ) : (
    <Redirect to="/" />
  );
};

export default AdministratorRoute;
