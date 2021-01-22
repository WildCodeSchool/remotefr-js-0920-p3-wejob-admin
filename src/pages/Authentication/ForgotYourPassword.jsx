import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import HeaderPostTitle from '../../components/HeaderPostTitle';

function ForgotYourPassword() {
  const schema = yup.object().shape({
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
    <div className="main-wrapper">
      <HeaderPostTitle name="Mot de passe oublié" />
      <div className="single-page clearfix">
        <div className="inner-wrap">
          <form
            className="ForgotYourPassword container py-5"
            id="ForgotYourPassword"
            onSubmit={handleSubmit}
          >
            <h3 className="widget-title">Créer un mon mot de passe</h3>
            <hr />

            <div className="row">
              <div className="form-group">
                <label htmlFor="email" className="form-field-label">
                  Votre email
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
                  <span className="spanError">
                    {errors.newPassword.message}
                  </span>
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
                  <span className="spanError">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              <div className="form-group">
                <button type="button">
                  <Link to="/LogIn">
                    <span>Valider et se connecter</span>
                  </Link>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// ForgotYourPassword.propTypes = {

// };

export default ForgotYourPassword;
