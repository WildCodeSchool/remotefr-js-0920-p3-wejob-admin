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

      <div className="row">
        <div className="form-group">
          <label htmlFor="Disponibilité" className="form-field-label">
            Disponibilité{' '}
            <span className="spanInfoField">(champ facultatif)</span>
            <Controller
              as={Select}
              id="Disponibilité"
              name="availability"
              options={availabilitylist}
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
              name="mobility"
              options={mobilitylist}
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
          {kwTag &&
            kwTag.map((t, itt) => (
              <button
                key={itt}
                type="button"
                onClick={(e) => handleDeleteTag(e, t)}
              >
                {t}
              </button>
            ))}
          <label htmlFor="keywords" className="form-field-label">
            Mots clés <span className="spanInfoField">(champ obligatoire)</span>
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
            <button type="button" onClick={handleAddTag}>
              Ajouter
            </button>
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
