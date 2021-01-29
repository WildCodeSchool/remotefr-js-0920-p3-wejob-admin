import React from 'react';
import PropTypes from 'prop-types';

function JobeurFormRecap({ handleSubmit, data }) {
  return (
    <form onSubmit={handleSubmit} id="JobeurForm">
      <div className="container">
        <div className="divImgProfile">Photo</div>
        <div className="infoJobeur">
          <h2>
            {data.firstname} {data.lastname}
          </h2>
        </div>
      </div>
    </form>
  );
}
JobeurFormRecap.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  data: PropTypes.shape().isRequired,
};

export default JobeurFormRecap;
