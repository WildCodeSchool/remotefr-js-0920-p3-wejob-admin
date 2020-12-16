import React from 'react';
import PropTypes from 'prop-types';

function HeaderPostTitle(props) {
  const { name } = props;
  return (
    <div className="header-post-title-container clearfix">
      <div className="inner-wrap">
        <div className="post-title-wrapper">
          <h1 className="header-post-title-class entry-title">{name}</h1>
        </div>
      </div>
    </div>
  );
}

HeaderPostTitle.propTypes = {
  name: PropTypes.string.isRequired,
};

export default HeaderPostTitle;
