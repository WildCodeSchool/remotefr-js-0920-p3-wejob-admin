import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import SelectPostField from './widgetsFormField/SelectPostField';
import TextAreaFromField from './widgetsFormField/TextAreaFromField';

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

function RecruitersInfoForm({ register, handleSubmit, errors, setSchema }) {
  useEffect(() => {
    setSchema(
      yup.object().shape({
        gender: yup.string().required('Vous devez sélectionner votre genre'),
        lastname: yup.string().min(2).required('Vous devez entrer votre nom'),
        firstname: yup.string().required('Vous devez entrer votre prénom'),
        email: yup.string().email(),
        diploma: yup.string(),
        levelOfExperience: yup.string(),
        languages: yup.string(),
        activityArea: yup.string(),
        jobName: yup.string(),
        skills: yup.string(),
        availability: yup.string().required(),
        modility: yup.string().required(),
        textDescription: yup.string().required(),
      }),
    );
  }, []);

  return (
    <form
      className="contact-form recruiters-info-form"
      id="RecruitersInfoForm"
      onSubmit={handleSubmit}
    >
      <h3 className="widget-title">Information pour les recruteurs</h3>
      <hr />
      <div className="form-check form-switch">
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
          Fiche visible pour un recruteur
          <input
            className="form-check-input"
            type="checkbox"
            id="flexSwitchCheckDefault"
          />
        </label>
      </div>
      <SelectPostField
        label="Disponibilité"
        name="availability"
        options={availability}
      />
      {errors.availability && (
        <span className="spanError">{errors.availability.message}</span>
      )}

      <SelectPostField label="Mobilité" name="mobility" options={mobility} />
      {errors.mobility && (
        <span className="spanError">{errors.mobility.message}</span>
      )}

      <TextAreaFromField
        label="Description"
        name="description"
        type="text"
        register={register}
      />
      {errors.description && (
        <span className="spanError">{errors.description.message}</span>
      )}
    </form>
  );
}

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
  }).isRequired,
  setSchema: PropTypes.func.isRequired,
};

export default RecruitersInfoForm;
