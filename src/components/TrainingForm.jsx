import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import InputFormField from './widgetsFormField/InputFormField';
import SelectPostField from './widgetsFormField/SelectPostField';

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
];

function TrainingForm({ register, handleSubmit, errors, setSchema }) {
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
      }),
    );
  }, []);

  return (
    <form
      className="contact-form trainingForm"
      id="TrainingForm"
      onSubmit={handleSubmit}
    >
      <h3 className="widget-title">Formations</h3>
      <hr />
      <InputFormField
        label="Diplome"
        name="diploma"
        type="text"
        register={register}
      />
      {errors.diploma && (
        <span className="spanError">{errors.diploma.message}</span>
      )}
      <SelectPostField
        label="Niveau d'expérience"
        name="levelExperience"
        options={levelOfExperience}
      />
      {errors.levelExperience && (
        <span className="spanError">{errors.levelExperience.message}</span>
      )}
      <SelectPostField label="Langues" name="languages" options={languages} />
      {errors.languages && (
        <span className="spanError">{errors.languages.message}</span>
      )}
    </form>
  );
}

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
};

export default TrainingForm;
