/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import * as yup from 'yup';
import { Controller } from 'react-hook-form';
// import InputFormField from './widgetsFormField/InputFormField';
// import SelectPostField from './widgetsFormField/SelectPostField';

const activityArea = [
  { value: '0', label: 'Agroalimentaire' },
  { value: '1', label: 'Banque / Assurance' },
  { value: '2', label: 'Bois / Papier / Carton / Imprimerie' },
  { value: '3', label: 'BTP / Matériaux de construction' },
  { value: '4', label: 'Chimie / Parachimie' },
  { value: '5', label: 'Commerce / Négoce / Distribution' },
  { value: '6', label: 'Édition / Communication / Multimédia' },
  { value: '7', label: 'Électronique / Électricité' },
  { value: '8', label: 'Études et conseils' },
  { value: '9', label: 'Industrie pharmaceutique' },
  { value: '10', label: 'Informatique / Télécoms' },
  { value: '11', label: 'Machines et équipements / Automobile' },
  { value: '12', label: 'Métallurgie / Travail du métal' },
  { value: '13', label: 'Plastique / Caoutchouc' },
  { value: '14', label: 'Services aux entreprises' },
  { value: '15', label: 'Textile / Habillement / Chaussure' },
  { value: '16', label: 'Transports / Logistique' },
  { value: '17', label: 'Fonction support / Transverse' },
];

function ExperiencesForm({
  register,
  handleSubmit,
  errors,
  setSchema,
  control,
}) {
  useEffect(() => {
    setSchema(
      yup.object().shape({
        jobName: yup.string(),
        jobName2: yup.string(),
      }),
    );
  }, [setSchema]);

  return (
    <form
      className="ExperiencesForm container"
      id="ExperiencesForm"
      onSubmit={handleSubmit}
    >
      <h3 className="widget-title">Expériences professionnelles</h3>
      <hr />
      <div className="row">
        <div className="form-group">
          <label htmlFor="activityArea" className="form-field-label">
            Secteurs d&apos;activité{' '}
            <span className="spanInfoField">(champ facultatif)</span>
            <Controller
              as={Select}
              id="activityArea"
              name="activityArea"
              options={activityArea}
              control={control}
              isMulti
              defaultValue=""
            />
          </label>

          {errors.activityArea && (
            <span className="spanError">{errors.activityArea.message}</span>
          )}
        </div>
      </div>
      <div className="row">
        <div className="form-group">
          <label htmlFor="jobName1" className="form-field-label">
            Métier 1 <span className="spanInfoField">(champ obligatoire)</span>
            <input
              type="text"
              className="form-field-input"
              id="jobName1"
              name="jobName1"
              ref={register}
            />
          </label>
          {errors.jobName1 && (
            <span className="spanError">{errors.jobName1.message}</span>
          )}
        </div>
      </div>

      <div className="row">
        <div className="form-group">
          <label htmlFor="jobName2" className="form-field-label">
            Métier 2 <span className="spanInfoField">(champ facultatif)</span>
            <input
              type="text"
              className="form-field-input"
              id="jobName2"
              name="jobName2"
              ref={register}
            />
          </label>
          {errors.jobName2 && (
            <span className="spanError">{errors.jobName2.message}</span>
          )}
        </div>
      </div>
    </form>
  );
}
ExperiencesForm.defaultProps = {
  control: undefined,
};

ExperiencesForm.propTypes = {
  register: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    activityArea: PropTypes.shape({
      message: PropTypes.string,
      type: PropTypes.string,
    }),
    jobName1: PropTypes.shape({
      message: PropTypes.string,
      type: PropTypes.string,
    }),
    jobName2: PropTypes.shape({
      message: PropTypes.string,
      type: PropTypes.string,
    }),
  }).isRequired,
  setSchema: PropTypes.func.isRequired,
  control: PropTypes.shape(),
};

export default ExperiencesForm;
