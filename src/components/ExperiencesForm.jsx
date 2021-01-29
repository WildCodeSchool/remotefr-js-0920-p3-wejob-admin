/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import * as yup from 'yup';
import { Controller } from 'react-hook-form';
// import InputFormField from './widgetsFormField/InputFormField';
// import SelectPostField from './widgetsFormField/SelectPostField';

const activityArea = [
  { value: '1', label: 'Aéronautique' },
  { value: '2', label: 'Agroalimentaire – vins & spiritueux' },
  { value: '3', label: 'Automobile : machines et équipements' },
  { value: '4', label: 'Banque – assurance' },
  {
    value: '5',
    label: 'Bois – papier – carton – imprimerie, plastique, caoutchouc',
  },
  { value: '6', label: 'BTP – matériaux de construction' },
  { value: '7', label: 'Chimie – parachimie' },
  { value: '8', label: 'Commerce – négoce – distribution' },
  { value: '9', label: 'Economie Sociale et Solidaire' },
  { value: '10', label: 'Edition – communication – multimédia' },
  { value: '11', label: 'Electronique – électricité' },
  { value: '12', label: 'Etudes et conseils' },
  { value: '13', label: 'Industrie pharmaceutique – biotechnologies' },
  { value: '14', label: 'Informatique – télécoms' },
  { value: '15', label: 'Métallurgie – travail du métal' },
  { value: '16', label: 'Public : éducation, justice, armée…' },
  { value: '17', label: 'Santé – service à la personne' },
  { value: '18', label: 'Textile – habillement – chaussure' },
  { value: '19', label: 'Transport – logistique' },
  { value: '20', label: 'Autres services aux entreprises' },
  { value: '21', label: 'Autres' },
];

function ExperiencesForm({
  handleSubmit,
  errors,
  setSchema,
  control,
  jobTag,
  setJobTag,
}) {
  useEffect(() => {
    setSchema(
      yup.object().shape({
        jobName: yup.string(),
        jobName2: yup.string(),
      }),
    );
  }, [setSchema]);

  const [JobInput, setJobInput] = useState('');

  const handleAddTag = (e) => {
    e.preventDefault();
    setJobTag((prev) => [...prev, JobInput]);
    setJobInput('');
  };

  const handleDeleteTag = (e, tag) => {
    e.preventDefault();
    setJobTag((prev) => prev.filter((t) => t !== tag));
  };

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
              name="sector_of_activity"
              options={activityArea}
              control={control}
              isMulti
            />
          </label>

          {errors.activityArea && (
            <span className="spanError">{errors.activityArea.message}</span>
          )}
        </div>
      </div>

      <div className="row">
        <div className="form-group">
          {jobTag &&
            jobTag.map((t, itt) => (
              <button
                key={itt}
                type="button"
                onClick={(e) => handleDeleteTag(e, t)}
              >
                {t}
              </button>
            ))}
          <label htmlFor="jobname" className="form-field-label">
            Métier <span className="spanInfoField">(champ obligatoire)</span>
            <input
              type="text"
              className="form-field-input"
              id="jobname"
              name="job_input"
              value={JobInput}
              onChange={(e) => setJobInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag(e);
                }
              }}
            />
            <button type="button" onClick={handleAddTag}>
              Ajouter
            </button>
          </label>
          {/* {errors.job_input && (
            <span className="spanError">{errors.job_input.message}</span>
          )} */}
        </div>
      </div>
    </form>
  );
}
ExperiencesForm.defaultProps = {
  control: undefined,
  jobTag: [],
};

ExperiencesForm.propTypes = {
  // register: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    activityArea: PropTypes.shape({
      message: PropTypes.string,
      type: PropTypes.string,
    }),
  }).isRequired,
  setSchema: PropTypes.func.isRequired,
  control: PropTypes.shape(),
  jobTag: PropTypes.arrayOf(PropTypes.string),
  setJobTag: PropTypes.func.isRequired,
};

export default ExperiencesForm;
