import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';

/* eslint-disable react/jsx-props-no-spreading */
function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (authenticated === false ? (
        <Component {...props} />
      ) : (
        <Redirect to="/servers" />
      ))}
    />
  );
}
PublicRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.element.isRequired,
  redirect: PropTypes.string.isRequired,
};

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (authenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: props.redirect, state: { from: props.location } }}
        />
      ))}
    />
  );
}
PrivateRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.element.isRequired,
  redirect: PropTypes.string.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
/* eslint-enable react/jsx-props-no-spreading */

export { PublicRoute, PrivateRoute };
