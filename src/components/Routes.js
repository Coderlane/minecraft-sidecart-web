import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';

/* eslint-disable react/jsx-props-no-spreading */
function PublicRoute({
  component: Component,
  authenticated,
  redirect,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => (authenticated === false ? (
        <Component {...props} />
      ) : (
        <Redirect to={redirect} />
      ))}
    />
  );
}
PublicRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  redirect: PropTypes.string.isRequired,
};

function PrivateRoute({
  component: Component,
  authenticated,
  redirect,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => (authenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to={props.redirect} />
      ))}
    />
  );
}
PrivateRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  redirect: PropTypes.string.isRequired,

};
/* eslint-enable react/jsx-props-no-spreading */

export { PublicRoute, PrivateRoute };
