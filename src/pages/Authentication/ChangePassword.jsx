import React from 'react'; // { useContext }
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

function ChangePassword() {
  const schema = yup.object().shape({
    oldPassword: yup
      .string()
      .min(8)
      .max(15)
      .matches(/^[\w$@%*+\-_!]{8,15}$/, {
        message:
          'Un mot de passe valide aura de 8 à 15 caractères, au moins une lettre minuscule, au moins une lettre majuscul, au moins un chiffre, au moins un de ces caractères spéciaux: $ @ % * + - _ !, aucun autre caractère possible ',
      })

      .required('Vous devez entrer votre ancien mot de passe'),
    newPassword: yup
      .string()
      .min(8)
      .max(15)
      .matches(/^[\w$@%*+\-_!]{8,15}$/, {
        message:
          'Un mot de passe valide aura de 8 à 15 caractères, au moins une lettre minuscule, au moins une lettre majuscul, au moins un chiffre, au moins un de ces caractères spéciaux: $ @ % * + - _ !, aucun autre caractère possible ',
      })
      .required('Vous devez entrer votre nouveau mot de passe'),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref('newPassword'), null],
        'les mots de passe doivent correspondre',
      )
      .required('Vous devez confirmer votre mot de passe'),
  });

  const { register, handleSubmit, errors } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  });

  // const ValidateConnect = () => {
  //   <Link to="/LogIn">
  //     <span>Valider et se connecter</span>
  //   </Link>;
  // };

  return (
    <form
      className="ChangePassword container py-5"
      id="ChangePassword"
      onSubmit={handleSubmit}
    >
      <h3 className="widget-title">Modifier mon mot de passe</h3>
      <hr />

      <div className="row">
        <div className="form-group">
          <label htmlFor="oldPassword" className="form-field-label">
            Ancien mot de passe *
            <input
              type="text"
              className="form-field-input"
              id="oldPassword"
              name="oldPassword"
              ref={register}
            />
          </label>
          {errors.oldPassword && (
            <span className="spanError">{errors.oldPassword.message}</span>
          )}
        </div>
      </div>
      <div className="row">
        <div className="form-group">
          <label htmlFor="newPassword" className="form-field-label">
            Nouveau mot de passe *
            <input
              type="text"
              className="form-field-input"
              id="newPassword"
              name="newPassword"
              ref={register}
            />
          </label>
          {errors.newPassword && (
            <span className="spanError">{errors.newPassword.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-field-label">
            Confirmer votre nouveau mot de passe *
            <input
              type="text"
              className="form-field-input"
              id="confirmPassword"
              name="confirmPassword"
              ref={register}
            />
          </label>
          {errors.confirmPassword && (
            <span className="spanError">{errors.confirmPassword.message}</span>
          )}
        </div>

        <div className="form-group">
          <button type="button">
            <Link to="/LogIn">
              <span>Valider et se connecter</span>
            </Link>
            ;
          </button>
        </div>
      </div>
    </form>
  );
}

// ChangePassword.propTypes = {

// };

export default ChangePassword;
