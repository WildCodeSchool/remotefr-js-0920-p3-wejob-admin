import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header/Header';
import AuthContext from '../contexts/auth';
import { userPropTypes } from '../prop-types';

function AppLayout({ children, auth }) {
  return (
    <AuthContext.Provider value={auth}>
      <div className="App">
        <Header />
        {children}
      </div>
    </AuthContext.Provider>
  );
}

AppLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  auth: PropTypes.shape({
    user: userPropTypes,
    logout: PropTypes.func,
  }),
};

AppLayout.defaultProps = {
  auth: {
    user: null,
    logout: () => {},
  },
};

export default AppLayout;
