import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';

function ProfileForm({ register, handleSubmit, errors, setSchema }) {
  useEffect(() => {
    setSchema(
      yup.object().shape({
        civility: yup
          .string()
          .nullable()
          .required('Vous devez sélectionner votre genre'),
        lastname: yup.string().min(2).required('Vous devez entrer votre nom'),
        firstname: yup.string().required('Vous devez entrer votre prénom'),
        email: yup.string().email(),
      }),
    );
  }, [setSchema]);

  return (
    <form
      className="ProfileForm container"
      id="ProfileForm"
      onSubmit={handleSubmit}
    >
      <h3 className="widget-title">Mon profil</h3>
      <hr />
      <div className="mb-3 row">
        <div className="form-group row ">
          <label
            className="col-sm-4 col-form-label form-field-label"
            htmlFor="civility"
          >
            Civilité *{' '}
            <span className="spanInfoField">(champ obligatoire)</span>
          </label>

          <div className="col-sm-3 form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="civility"
              id="female"
              value="Madame"
              ref={register}
            />
            <label className="form-check-label" htmlFor="female">
              Madame
            </label>
          </div>
          <div className="col-sm-3 form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="civility"
              id="male"
              value="Monsieur"
              ref={register}
            />
            <label className="form-check-label" htmlFor="male">
              Monsieur
            </label>
          </div>
          {errors.civility && (
            <span className="spanError">{errors.civility.message}</span>
          )}
        </div>

        <div className="form-group row">
          <label
            htmlFor="firstname"
            className="col-sm-4 col-form-label form-field-label"
          >
            Prénom * <span className="spanInfoField">(champ obligatoire)</span>
          </label>
          <div className="col-sm-6">
            <input
              type="text"
              className="form-control"
              id="firstname"
              name="firstname"
              ref={register}
            />
          </div>
          {errors.firstname && (
            <span className="spanError">{errors.firstname.message}</span>
          )}
        </div>
        <div className="form-group row">
          <label
            htmlFor="lastname"
            className="col-sm-4 col-form-label form-field-label"
          >
            Nom * <span className="spanInfoField">(champs obligatoire)</span>
          </label>
          <div className="col-sm-6">
            <input
              type="text"
              className="form-control"
              id="lastname"
              name="lastname"
              ref={register}
            />
          </div>

          {errors.lastname && (
            <span className="spanError">{errors.lastname.message}</span>
          )}
        </div>
      </div>

      {/* <div className="form-group">
          <label htmlFor="email" className="form-field-label">
            Email
            <input
              type="email"
              className="form-field-input"
              id="email"
              name="email"
              placeholder="name@example.com"
              ref={register}
              readOnly
            />
          </label>
        </div> */}
    </form>
  );
}

ProfileForm.propTypes = {
  register: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    civility: PropTypes.shape({
      message: PropTypes.string,
      type: PropTypes.string,
    }),
    firstname: PropTypes.shape({
      message: PropTypes.string,
      type: PropTypes.string,
    }),
    lastname: PropTypes.shape({
      message: PropTypes.string,
      type: PropTypes.string,
    }),
  }).isRequired,
  setSchema: PropTypes.func.isRequired,
};

export default ProfileForm;
