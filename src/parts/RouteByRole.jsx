import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { userPropTypes } from '../prop-types';
import AdminPanel from '../pages/AdminPanel/AdminPanel';
import JobeurFormContainer from '../pages/JobeurForm/JobeurFormContainer';

function RouteByRole({ user, ...rest }) {
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={() => {
        if (!user) return <Redirect to="/LogIn" />;

        return user.isAdmin ? (
          <AdminPanel />
        ) : (
          <JobeurFormContainer user={user} />
        );
      }}
    />
  );
}

RouteByRole.propTypes = {
  user: userPropTypes,
};

RouteByRole.defaultProps = {
  user: null,
};

export default RouteByRole;
