import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';

function ProfileForm({ register, handleSubmit, errors, setSchema }) {
  useEffect(() => {
    setSchema(
      yup.object().shape({
        civility: yup.string().required('Vous devez sélectionner votre genre'),
        lastname: yup.string().min(2).required('Vous devez entrer votre nom'),
        firstname: yup.string().required('Vous devez entrer votre prénom'),
        email: yup.string().email(),
      }),
    );
  }, [setSchema]);

  return (
    <form
      className="ProfileForm container py-5"
      id="ProfileForm"
      onSubmit={handleSubmit}
    >
      <h3 className="widget-title">Mon profil</h3>
      <hr />
      <fieldset id="coordonnees">
        <legend htmlFor="Civility" className="form-field-label">
          Civilité * <span className="spanInfoField">(champ obligatoire)</span>
        </legend>
        <div className="row">
          <div className="form-check form-check-inline">
            <label htmlFor="male" className="form-field-label col-md-12">
              Monsieur
              <input
                type="radio"
                className="form-field-input"
                id="male"
                name="civility"
                value="Monsieur"
                ref={register}
              />
            </label>

            <label htmlFor="female" className="form-field-label col-md-12">
              Madame
              <input
                type="radio"
                className="form-field-input"
                id="female"
                name="civility"
                value="Madame"
                ref={register}
              />
            </label>
          </div>
        </div>
        {errors.civility && (
          <span className="spanError">{errors.civility.message}</span>
        )}
      </fieldset>

      <div className="row">
        <div className="form-group">
          <label htmlFor="firstname" className="form-field-label">
            Prénom * <span className="spanInfoField">(champ obligatoire)</span>
            <input
              type="text"
              className="form-field-input"
              id="firstname"
              name="firstname"
              ref={register}
            />
          </label>
          {errors.firstname && (
            <span className="spanError">{errors.firstname.message}</span>
          )}
        </div>
      </div>
      <div className="row">
        <div className="form-group">
          <label htmlFor="lastname" className="form-field-label">
            Nom * <span className="spanInfoField">(champs obligatoire)</span>
            <input
              type="text"
              className="form-field-input"
              id="lastname"
              name="lastname"
              ref={register}
            />
          </label>
          {errors.lastname && (
            <span className="spanError">{errors.lastname.message}</span>
          )}
        </div>

        <div className="form-group">
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
        </div>
      </div>
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