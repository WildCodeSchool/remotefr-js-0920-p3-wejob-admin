import React from 'react';
import PropTypes from 'prop-types';
import {
  // levelOfExperience,
  // languages,
  // activityArea,
  availabilitylist,
} from '../constants/forms';

function JobeurFormRecap({ handleSubmit, data }) {
  const availabilityJobeur = availabilitylist.find(
    (row) => row.value === data.availability.value,
  );

  // eslint-disable-next-line no-console
  console.log(data);
  return (
    <form onSubmit={handleSubmit} id="JobeurForm">
      <div className="wj-container">
        <div className="row">
          <div className="divImgProfile col-sm">
            <img src="https://via.placeholder.com/150" alt={data.firstname} />
          </div>
          <div className="infoJobeur col-sm-8">
            <h2 className="form-field-label text-uppercase fs-1">
              {data.firstname} {data.lastname}
            </h2>
            <ul>
              <li className="text-start form-field-label">
                Disponibilité :{' '}
                <span className="spanInfoField">
                  {availabilityJobeur.label}
                </span>
              </li>
              <li className="text-start form-field-label">
                Mobility :{' '}
                <span className="spanInfoField">{data.mobility.value}</span>
              </li>
              <li className="text-start form-field-label">
                Description :{' '}
                <span className="spanInfoField">{data.description}</span>
              </li>
              <li className="text-start form-field-label">
                Mots clés :{' '}
                <span className="spanInfoField">{data.keywords}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <h3 className="form-field-label text-uppercase fs-2">
            Expériences professionnel
          </h3>
          <p className="text-start form-field-label">
            Métiers : <span className="spanInfoField">{data.job}</span>
          </p>
          <ul className="text-start form-field-label">
            Secteur d&apos;activité :
            {data.sector_of_activity.map((sector) => (
              <li key={sector.value} className="spanInfoField">
                {sector.label}
              </li>
            ))}
          </ul>
        </div>
        <div className="row">
          <h3 className="form-field-label text-uppercase fs-2">Formations</h3>
          <p className="text-start form-field-label">
            Diplome : <span className="spanInfoField">{data.diploma}</span>
          </p>
          <p className="text-start form-field-label">
            Niveau d&apos;expérience :{' '}
            <span className="spanInfoField">
              {data.years_of_experiment.label}
            </span>
          </p>
          <ul className="text-start form-field-label">
            Langues :{' '}
            {data.language.map((el) => (
              <li key={el.value} className="spanInfoField">
                {el.label}
              </li>
            ))}
          </ul>
        </div>
        <div className="row">
          <h3 className="form-field-label text-uppercase fs-2">
            Documents et liens
          </h3>
          <p className="text-start form-field-label">
            CV 1 : <span className="spanInfoField">{data.cv1}</span>
          </p>
          <p className="text-start form-field-label">
            CV 2 : <span className="spanInfoField">{data.cv2}</span>
          </p>
          <p className="text-start form-field-label">
            Liens Linkedln :{' '}
            <span className="spanInfoField">{data.linkedin}</span>
          </p>
          <p className="text-start form-field-label">
            Liens Youtube :{' '}
            <span className="spanInfoField">{data.youtube}</span>
          </p>
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
