import PropTypes from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const userPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  isAdmin: PropTypes.bool.isRequired,
});
