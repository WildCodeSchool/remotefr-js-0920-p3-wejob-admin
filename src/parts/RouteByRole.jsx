import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { userPropTypes } from '../prop-types';
import AdminPanel from '../pages/AdminPanel/AdminPanel';
import JobeurForm from '../pages/JobeurForm';

function RouteByRole({ user, ...rest }) {
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={() => {
        if (!user) return <Redirect to="/LogIn" />;

        return user.isAdmin ? <AdminPanel /> : <JobeurForm user={user} />;
      }}
    />
  );
}

RouteByRole.propTypes = {
  user: userPropTypes.isRequired,
};

export default RouteByRole;
