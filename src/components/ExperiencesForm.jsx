/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import * as yup from 'yup';
import { Controller } from 'react-hook-form';
import { activityArea } from '../constants/forms';
// import InputFormField from './widgetsFormField/InputFormField';
// import SelectPostField from './widgetsFormField/SelectPostField';

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
      <div className="mb-3 row">
        <div className="row justify-content-end">
          <p className="spanInfoField col-8">
            Vous pouvez entrer plusieurs métiers en cliquant sur ajouter
          </p>
        </div>
        <div className="form-group row">
          <label
            htmlFor="jobname"
            className="col-sm-4 col-form-label form-field-label"
          >
            Métier <span className="spanInfoField">(champ obligatoire)</span>
          </label>
          <div className="col-sm-5">
            <input
              type="text"
              className="form-control"
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
          </div>
          <div className="col-sm-2">
            <button type="button" onClick={handleAddTag}>
              Ajouter
            </button>
          </div>
          <div className="row justify-content-end">
            <p className="spanInfoField col-8">
              Métiers validés (vous pouvez les supprimer en cliquant dessus) :
            </p>
          </div>
          <div className="row">
            <div className="offset-md-2 col-md-7">
            {jobTag &&
              jobTag.map((t, itt) => (
                <button
                  key={itt}
                  type="button"
                  className="col btn btn-sm btn-outline-dark ms-1 my-1"
                  onClick={(e) => handleDeleteTag(e, t)}
                  title="Cliquer pour supprimer"
                >
                  {t}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-x"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* {errors.job_input && (
            <span className="spanError">{errors.job_input.message}</span>
          )} */}
        </div>
        <div className="row justify-content-end">
          <p className="spanInfoField col-8">
            Vous pouvez sélectionner plusieurs secteurs d&#39;activité ou aucun
            si votre métier ne s&#39;y prête pas
          </p>
        </div>
        <div className="form-group row">
          <label
            htmlFor="activityArea"
            className="col-sm-4 col-form-label form-field-label"
          >
            Secteurs d&apos;activité{' '}
            <span className="spanInfoField">(champ facultatif)</span>
          </label>
          <div className="col-sm-6">
            <Controller
              as={Select}
              id="activityArea"
              name="sector_of_activity"
              options={activityArea}
              control={control}
              isMulti
            />
          </div>

          {errors.activityArea && (
            <span className="spanError">{errors.activityArea.message}</span>
          )}
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
