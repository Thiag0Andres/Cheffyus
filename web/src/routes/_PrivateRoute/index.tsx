import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../../services/auth';

export interface PrivateRouteType {
    component: React.FC;
    path: string;
    exact: boolean;
}

export const PrivateRoute: React.FC<PrivateRouteType> = (props: PrivateRouteType) => {
  const { component, path, exact } = props;

  const condition = isAuthenticated();

  return condition ? (<Route path={path} exact={exact} component={component} />)
    : (<Redirect to="/" />);
};

export default PrivateRoute;
