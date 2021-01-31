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
      .min(8, {
        message: 'Le mot de passe doit comporter au minimum 8 caractères',
      })
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
            <h3 className="widget-title">Changer mon mot de passe</h3>
            <hr />

            <div className="mb-3 row">
              <div className="form-group row ">
                <label
                  htmlFor="email"
                  className="col-sm-5 col-form-label form-field-label"
                >
                  Votre email
                </label>
                <div className="col-sm-6">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    ref={register}
                  />
                </div>
              </div>

              <div className="form-group row ">
                <label
                  htmlFor="newPassword"
                  className="col-sm-5 col-form-label form-field-label"
                >
                  Nouveau mot de passe *
                </label>
                <div className="col-sm-6">
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    name="newPassword"
                    ref={register}
                  />
                </div>
                {errors.newPassword && (
                  <span className="spanError">
                    {errors.newPassword.message}
                  </span>
                )}
              </div>

              <div className="form-group row ">
                <label
                  htmlFor="confirmPassword"
                  className="col-sm-5 col-form-label form-field-label"
                >
                  Confirmer votre nouveau mot de passe *
                </label>
                <div className="col-sm-6">
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    ref={register}
                  />
                </div>
                {errors.confirmPassword && (
                  <span className="spanError">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              <div className="row justify-content-center ">
                <button type="button" className="button-submit col-sm-4">
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
