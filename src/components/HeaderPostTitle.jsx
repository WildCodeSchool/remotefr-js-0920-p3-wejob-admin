import React from 'react';
import PropTypes from 'prop-types';
import styles from '../asset/css/HeaderPostTitle.module.css';

function HeaderPostTitle(props) {
  const { name } = props;
  return (
    <div className={styles.headerPostTitleContainer}>
      <div className={styles.innerWrap}>
        <div className={styles.postTitleWrapper}>
          <h1 className={styles.headerPostTitleClass}>{name}</h1>
        </div>
      </div>
    </div>
  );
}

HeaderPostTitle.propTypes = {
  name: PropTypes.string.isRequired,
};

export default HeaderPostTitle;
