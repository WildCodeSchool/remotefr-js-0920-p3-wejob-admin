import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import * as yup from 'yup';
import { Controller } from 'react-hook-form';
// import InputFormField from './widgetsFormField/InputFormField';
// import SelectPostField from './widgetsFormField/SelectPostField';

const levelOfExperience = [
  { value: '0', label: "De 0 à 5 ans d'expérience" },
  { value: '1', label: "De 5 à 10 ans d'expérience" },
  { value: '2', label: "Plus de 10 ans d'expérience" },
];
const languages = [
  { value: '0', label: 'Anglais' },
  { value: '1', label: 'Espagnol' },
  { value: '2', label: 'Allemand' },
  { value: '3', label: 'Italien' },
  { value: '4', label: 'Arabe' },
  { value: '5', label: 'Chinois' },
];

function TrainingForm({ register, handleSubmit, errors, setSchema, control }) {
  useEffect(() => {
    setSchema(
      yup.object().shape({
        diploma: yup.string(),
        levelOfExperience: yup.string(),
        // languages: yup.array.of(),
      }),
    );
  }, [setSchema]);

  return (
    <form
      className="TrainingForm container"
      id="TrainingForm"
      onSubmit={handleSubmit}
    >
      <h3 className="widget-title">Formations</h3>
      <hr />
      <div className="form-group">
        <label htmlFor="diploma" className="form-field-label">
          Diplome <span className="spanInfoField">(champ facultatif)</span>
          <input
            type="text"
            className="form-field-input"
            id="diploma"
            name="diploma"
            ref={register}
          />
        </label>
        {errors.diploma && (
          <span className="spanError">{errors.diploma.message}</span>
        )}
      </div>

      <div className="row">
        <div className="form-group">
          <label htmlFor="levelExperience" className="form-field-label">
            Niveau d&apos;expérience{' '}
            <span className="spanInfoField">(champ facultatif)</span>
            <Controller
              as={Select}
              id="levelExperience"
              name="levelExperience"
              options={levelOfExperience}
              control={control}
              defaultValue=""
            />
          </label>
          {errors.levelExperience && (
            <span className="spanError">{errors.levelExperience.message}</span>
          )}
        </div>
      </div>

      <div className="row">
        <div className="form-group">
          <label htmlFor="languages" className="form-field-label">
            Langues <span className="spanInfoField">(champ facultatif)</span>
          </label>
          <Controller
            as={Select}
            name="languages"
            options={languages}
            isMulti
            control={control}
            defaultValue=""
          />

          {errors.languages && (
            <span className="spanError">{errors.languages.message}</span>
          )}
        </div>
      </div>
    </form>
  );
}

TrainingForm.defaultProps = {
  control: undefined,
};

TrainingForm.propTypes = {
  register: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    diploma: PropTypes.shape({
      message: PropTypes.string,
      type: PropTypes.string,
    }),
    levelExperience: PropTypes.shape({
      message: PropTypes.string,
      type: PropTypes.string,
    }),
    languages: PropTypes.shape({
      message: PropTypes.string,
      type: PropTypes.string,
    }),
  }).isRequired,
  setSchema: PropTypes.func.isRequired,
  control: PropTypes.shape(),
};

export default TrainingForm;
