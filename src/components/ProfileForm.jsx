import React from 'react'; // { useContext }
import PropTypes from 'prop-types';

// import InputFormField from './widgetsFormField/InputFormField';
// import DataFormContext from '../contexts/DataFormContext';

function ProfileForm({ register, handleSubmit, errors }) {
  return (
    <form className="ProfileForm container py-5" onSubmit={handleSubmit}>
      <h3 className="widget-title">Mon profil</h3>
      <hr />
      <fieldset id="coordonnees">
        <legend htmlFor="Civility" className="form-field-label">
          Civilité *
        </legend>
        <div className="row">
          <div className="form-check form-check-inline">
            <label htmlFor="male" className="form-field-label col-md-12">
              Monsieur
              <input
                type="radio"
                className="form-field-input"
                id="male"
                name="gender"
                value="M"
                ref={register}
              />
            </label>

            <label htmlFor="female" className="form-field-label col-md-12">
              Madame
              <input
                type="radio"
                className="form-field-input"
                id="female"
                name="gender"
                value="Mme"
                ref={register}
              />
            </label>
          </div>
        </div>
        {errors.gender && (
          <span className="spanError">{errors.gender.message}</span>
        )}
      </fieldset>

      <div className="row">
        <div className="form-group">
          <label htmlFor="firstname" className="form-field-label">
            Prénom *
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
            Nom *
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
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Valider et poursuivre
          </button>
        </div>
      </div>
    </form>
  );
}

ProfileForm.propTypes = {
  register: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    gender: PropTypes.shape({
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
};

export default ProfileForm;
