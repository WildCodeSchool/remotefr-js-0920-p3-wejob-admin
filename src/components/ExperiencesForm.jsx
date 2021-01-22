import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import InputFormField from './widgetsFormField/InputFormField';
import SelectPostField from './widgetsFormField/SelectPostField';

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
];

function ExperiencesForm({ register, handleSubmit, errors, setSchema }) {
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
      }),
    );
  }, []);

  return (
    <form
      className="contact-form experiences-form"
      id="ExperiencesForm"
      onSubmit={handleSubmit}
    >
      <h3 className="widget-title">Expériences professionnelles</h3>
      <hr />
      <SelectPostField
        label="Secteurs d’activité"
        name="activityArea"
        options={activityArea}
      />
      {errors.activityArea && (
        <span className="spanError">{errors.activityArea.message}</span>
      )}
      <InputFormField
        label="Métier"
        name="jobName"
        type="text"
        register={register}
      />
      {errors.jobName && (
        <span className="spanError">{errors.jobName.message}</span>
      )}
      {/* <InputFormField
        label="Compétences"
        name="skills"
        type="text"
        register={register}
      />
      {errors.skills && (
        <span className="spanError">{errors.skills.message}</span>
      )} */}
    </form>
  );
}

ExperiencesForm.propTypes = {
  register: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    activityArea: PropTypes.shape({
      message: PropTypes.string,
      type: PropTypes.string,
    }),
    jobName: PropTypes.shape({
      message: PropTypes.string,
      type: PropTypes.string,
    }),
    // skills: PropTypes.shape({
    //   message: PropTypes.string,
    //   type: PropTypes.string,
    // }),
  }).isRequired,
  setSchema: PropTypes.func.isRequired,
};

export default ExperiencesForm;
