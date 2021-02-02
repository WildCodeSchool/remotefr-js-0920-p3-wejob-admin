import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import * as yup from 'yup';
import { Controller } from 'react-hook-form';
// import InputFormField from './widgetsFormField/InputFormField';
// import SelectPostField from './widgetsFormField/SelectPostField';

const levelOfExperience = [
  { value: '1', label: "De 0 à 5 ans d'expérience" },
  { value: '2', label: "De 5 à 10 ans d'expérience" },
  { value: '3', label: "Plus de 10 ans d'expérience" },
];
const languages = [
  { value: '1', label: 'Français' },
  { value: '2', label: 'Anglais' },
  { value: '3', label: 'Espagnol' },
  { value: '4', label: 'Italien' },
  { value: '5', label: 'Allemand' },
  { value: '6', label: 'Chinois' },
  { value: '7', label: 'Arabe' },
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
      <div className="mb-3 row">
        <div className="form-group row">
          <label
            htmlFor="diploma"
            className="col-sm-4 col-form-label form-field-label"
          >
            Diplome <span className="spanInfoField">(champ facultatif)</span>
          </label>
          <div className="col-sm-6">
            <input
              type="text"
              className="form-control"
              id="diploma"
              name="diploma"
              ref={register}
            />
          </div>
          {errors.diploma && (
            <span className="spanError">{errors.diploma.message}</span>
          )}
        </div>

        <div className="form-group row">
          <label
            htmlFor="levelExperience"
            className="col-sm-4 col-form-label form-field-label"
          >
            Niveau d&apos;expérience{' '}
            <span className="spanInfoField">(champ facultatif)</span>{' '}
          </label>
          <div className="col-sm-6">
            <Controller
              as={Select}
              id="levelExperience"
              name="years_of_experiment"
              options={levelOfExperience}
              control={control}
              defaultValue=""
            />
          </div>

          {errors.levelExperience && (
            <span className="spanError">{errors.levelExperience.message}</span>
          )}
        </div>

        <div className="form-group row">
          <label
            htmlFor="languages"
            className="col-sm-4 col-form-label form-field-label"
          >
            Langues <span className="spanInfoField">(champ facultatif)</span>
          </label>
          <div className="col-sm-6">
            <Controller
              as={Select}
              name="language"
              options={languages}
              isMulti
              control={control}
            />
          </div>

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
