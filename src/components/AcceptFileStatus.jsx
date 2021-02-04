import React from 'react';
import PropTypes from 'prop-types';

const formatFactor = (sz, f) => (sz / f).toFixed(1);

const formatSize = (sz) => {
  return sz > 1048576
    ? `${formatFactor(sz, 1048576)} Mo`
    : `${formatFactor(sz, 1024)} Ko`;
};

const AcceptFileStatus = ({ file, success }) => (
  <>
    <span
      className={
        success ? 'icon-checkmark text-success' : 'icon-blocked text-danger'
      }
    />
    <span className="fw-bold">{file.path}</span>
    <span>&nbsp;- {formatSize(file.size)}</span>
  </>
);

AcceptFileStatus.propTypes = {
  file: PropTypes.shape({
    path: PropTypes.string,
    size: PropTypes.number,
  }).isRequired,
  success: PropTypes.bool,
};

AcceptFileStatus.defaultProps = {
  success: false,
};

export default AcceptFileStatus;
