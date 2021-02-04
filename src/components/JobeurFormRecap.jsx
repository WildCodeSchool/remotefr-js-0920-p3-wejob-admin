import React from 'react';
import PropTypes from 'prop-types';

function JobeurFormRecap({ handleSubmit, data }) {
  return (
    <form onSubmit={handleSubmit} id="JobeurForm">
      <div className="divImgProfile">Photo</div>
      <div className="infoJobeur">
        <h2>
          {data.firstname} {data.lastname}
        </h2>
        <h3>Formation</h3>
        <p>Diplome : {data.diploma}</p>
      </div>
    </form>
  );
}
JobeurFormRecap.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  data: PropTypes.shape().isRequired,
};

export default JobeurFormRecap;
