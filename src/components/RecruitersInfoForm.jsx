import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import Select from 'react-select';
import { Controller } from 'react-hook-form';
// import SelectPostField from './widgetsFormField/SelectPostField';
// import TextAreaFromField from './widgetsFormField/TextAreaFromField';

const availability = [
  { value: '0', label: 'immédiatement' },
  { value: '1', label: 'autres' },
];
const mobility = [
  { value: '0', label: 'Bordeaux' },
  { value: '1', label: 'Gironde' },
  { value: '2', label: 'Nouvelle-Aquitaine' },
  { value: '3', label: 'France' },
];

function RecruitersInfoForm({
  register,
  handleSubmit,
  errors,
  setSchema,
  control,
}) {
  useEffect(() => {
    setSchema(
      yup.object().shape({
        availability: yup.string(),
        modility: yup.string(),
        description: yup.string().required(),
        keywords: yup.string().required(),
      }),
    );
  }, [setSchema]);

  return (
    <form
      className="RecruitersInfoForm container"
      id="RecruitersInfoForm"
      onSubmit={handleSubmit}
    >
      <h3 className="widget-title">Information pour les recruteurs</h3>
      <hr />
      <div className="form-check form-switch">
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
          J&apos;accepte d&apos;être formé à un nouveau métier
          <input
            className="form-check-input"
            type="checkbox"
            id="flexSwitchCheckDefault"
          />
        </label>
      </div>

      <div className="row">
        <div className="form-group">
          <label htmlFor="Disponibilité" className="form-field-label">
            Disponibilité{' '}
            <span className="spanInfoField">(champ facultatif)</span>
            <Controller
              as={Select}
              id="Disponibilité"
              name="Disponibilité"
              options={availability}
              control={control}
              defaultValue=""
            />
          </label>
          {errors.availability && (
            <span className="spanError">{errors.availability.message}</span>
          )}
        </div>
      </div>
      <div className="row">
        <div className="form-group">
          <label htmlFor="Mobilité" className="form-field-label">
            Mobilité <span className="spanInfoField">(champ facultatif)</span>
            <Controller
              as={Select}
              id="Mobilité"
              name="Mobilité"
              options={mobility}
              control={control}
              defaultValue=""
            />
          </label>
          {errors.mobility && (
            <span className="spanError">{errors.mobility.message}</span>
          )}
        </div>
      </div>
      <div className="row">
        <div className="form-group">
          <label htmlFor="description" className="form-field-label">
            Description{' '}
            <span className="spanInfoField">(champ obligatoire)</span>
            <textarea
              type="text"
              className="form-field-input"
              id="description"
              name="description"
              ref={register}
            />
          </label>
          {errors.description && (
            <span className="spanError">{errors.description.message}</span>
          )}
        </div>
      </div>
      <div className="row">
        <div className="form-group">
          <label htmlFor="keywords" className="form-field-label">
            Mots clés <span className="spanInfoField">(champ obligatoire)</span>
            <textarea
              type="text"
              className="form-field-input"
              id="keywords"
              name="keywords"
              ref={register}
            />
          </label>
          {errors.keywords && (
            <span className="spanError">{errors.keywords.message}</span>
          )}
        </div>
      </div>
    </form>
  );
}

RecruitersInfoForm.defaultProps = {
  control: undefined,
};

RecruitersInfoForm.propTypes = {
  register: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    availability: PropTypes.shape({
      message: PropTypes.string,
      type: PropTypes.string,
    }),
    mobility: PropTypes.shape({
      message: PropTypes.string,
      type: PropTypes.string,
    }),
    description: PropTypes.shape({
      message: PropTypes.string,
      type: PropTypes.string,
    }),
    keywords: PropTypes.shape({
      message: PropTypes.string,
      type: PropTypes.string,
    }),
  }).isRequired,
  setSchema: PropTypes.func.isRequired,
  control: PropTypes.shape(),
};

export default RecruitersInfoForm;
