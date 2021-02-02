/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import Select from 'react-select';
import { Controller } from 'react-hook-form';
import { availabilitylist, mobilitylist } from '../constants/forms';
// import SelectPostField from './widgetsFormField/SelectPostField';
// import TextAreaFromField from './widgetsFormField/TextAreaFromField';

function RecruitersInfoForm({
  register,
  handleSubmit,
  errors,
  setSchema,
  control,
  kwTag,
  setKeyWords,
}) {
  useEffect(() => {
    setSchema(
      yup.object().shape({
        // // availability: yup.shape(),
        // modility: yup.string(),
        // description: yup.string().required(),
        // keywords: yup.string().required(),
        // isOpen_to_formation: yup.bool(),
      }),
    );
  }, [setSchema]);

  const [kwInput, setKwInput] = useState('');

  const handleAddTag = (e) => {
    e.preventDefault();
    setKeyWords((prev) => [...prev, kwInput]);
    setKwInput('');
  };

  const handleDeleteTag = (e, tag) => {
    e.preventDefault();
    setKeyWords((prev) => prev.filter((t) => t !== tag));
  };

  return (
    <form
      className="RecruitersInfoForm container"
      id="RecruitersInfoForm"
      onSubmit={handleSubmit}
    >
      <h3 className="widget-title">Information pour les recruteurs</h3>
      <hr />
      <div className="mb-3 row">
        <div className="form-check form-switch">
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            J&apos;accepte d&apos;être formé à un nouveau métier
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              name="isOpen_to_formation"
              ref={register}
            />
          </label>
        </div>

        <div className="form-group row">
          <label
            htmlFor="Disponibilité"
            className="col-sm-4 col-form-label form-field-label"
          >
            Disponibilité{' '}
            <span className="spanInfoField">(champ facultatif)</span>
          </label>
          <div className="col-sm-6">
            <Controller
              as={Select}
              id="Disponibilité"
              name="availability"
              options={availabilitylist}
              control={control}
              defaultValue=""
            />
          </div>
          {errors.availability && (
            <span className="spanError">{errors.availability.message}</span>
          )}
        </div>

        <div className="form-group row">
          <label
            htmlFor="Mobilité"
            className="col-sm-4 col-form-label form-field-label"
          >
            Mobilité <span className="spanInfoField">(champ facultatif)</span>
          </label>
          <div className="col-sm-6">
            <Controller
              as={Select}
              id="Mobilité"
              name="mobility"
              options={mobilitylist}
              control={control}
              defaultValue=""
            />
          </div>
          {errors.mobility && (
            <span className="spanError">{errors.mobility.message}</span>
          )}
        </div>

        <div className="form-group row">
          <label
            htmlFor="description"
            className="col-sm-4 col-form-label form-field-label"
          >
            Description{' '}
            <span className="spanInfoField">(champ obligatoire)</span>
          </label>
          <div className="col-sm-6">
            <textarea
              type="text"
              className="form-field-input"
              id="description"
              name="description"
              ref={register}
            />
          </div>
          {errors.description && (
            <span className="spanError">{errors.description.message}</span>
          )}
        </div>

        <div className="form-group row">
          <label
            htmlFor="keywords"
            className="col-sm-4 col-form-label form-field-label"
          >
            Mots clés <span className="spanInfoField">(champ obligatoire)</span>
          </label>
          <div className="col-sm-5">
            <input
              type="text"
              className="form-field-input"
              id="keywords"
              name="keywords_input"
              value={kwInput}
              onChange={(e) => setKwInput(e.target.value)}
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
          <div className="row justify-content-center style-button-renderNav">
            {kwTag &&
              kwTag.map((t, itt) => (
                <button
                  key={itt}
                  type="button"
                  onClick={(e) => handleDeleteTag(e, t)}
                  title="Cliquer pour supprimer"
                >
                  {t}
                </button>
              ))}
          </div>

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
  kwTag: [],
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
  kwTag: PropTypes.arrayOf(PropTypes.string),
  setKeyWords: PropTypes.func.isRequired,
};

export default RecruitersInfoForm;
