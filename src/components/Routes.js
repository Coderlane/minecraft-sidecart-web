import React, { useContext } from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { UserContext } from './UserContext';

/* eslint-disable react/jsx-props-no-spreading */
function PublicRoute({
  component: Component,
  redirect,
  ...rest
}) {
  const { user } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) => (user === null ? (
        <Component {...props} />
      ) : (
        <Redirect to={redirect} />
      ))}
    />
  );
}
PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
  redirect: PropTypes.string.isRequired,
};

function PrivateRoute({
  component: Component,
  redirect,
  ...rest
}) {
  const { user } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) => (user !== null ? (
        <Component {...props} />
      ) : (
        <Redirect to={props.redirect} />
      ))}
    />
  );
}
PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  redirect: PropTypes.string.isRequired,

};
/* eslint-enable react/jsx-props-no-spreading */

export { PublicRoute, PrivateRoute };
