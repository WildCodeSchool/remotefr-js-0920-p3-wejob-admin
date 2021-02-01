import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header/Header';

function AppLayout({ children }) {
  return (
    <div className="App">
      <Header />
      {children}
    </div>
  );
}

AppLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default AppLayout;
