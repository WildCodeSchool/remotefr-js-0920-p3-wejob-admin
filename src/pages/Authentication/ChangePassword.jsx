import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import HeaderPostTitle from '../../components/HeaderPostTitle';

function ChangePassword() {
  const schema = yup.object().shape({
    oldPassword: yup
      .string()
      .min(8)
      .max(15)
      .matches(/^[\w$@%*+\-_!]{8,16}$/, {
        message:
          'Un mot de passe valide aura de 8 à 16 caractères, au moins une lettre minuscule, au moins une lettre majuscule, au moins un chiffre, au moins un de ces caractères spéciaux: $ @ % * + - _ !, aucun autre caractère possible ',
      })

      .required('Vous devez entrer votre ancien mot de passe'),
    newPassword: yup
      .string()
      .min(8)
      .max(15)
      .matches(/^[\w$@%*+\-_!]{8,16}$/, {
        message:
          'Un mot de passe valide aura de 8 à 16 caractères, au moins une lettre minuscule, au moins une lettre majuscule, au moins un chiffre, au moins un de ces caractères spéciaux: $ @ % * + - _ !, aucun autre caractère possible ',
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
      <HeaderPostTitle name="Changer votre mot de passe" />
      <div className="single-page clearfix">
        <div className="inner-wrap">
          <form
            className="ChangePassword container py-5"
            id="ChangePassword"
            onSubmit={handleSubmit}
          >
            <h3 className="widget-title">
              Définir votre nouveau mon mot de passe
            </h3>
            <hr />

            <div className="mb-3 row">
              <div className="form-group row ">
                <label
                  htmlFor="oldPassword"
                  className="col-sm-5 col-form-label form-field-label"
                >
                  Ancien mot de passe *
                </label>
                <div className="col-sm-6">
                  <input
                    type="password"
                    className="form-control"
                    id="oldPassword"
                    name="oldPassword"
                    ref={register}
                  />
                </div>
                {errors.oldPassword && (
                  <span className="spanError">
                    {errors.oldPassword.message}
                  </span>
                )}
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
                    type="text"
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

// ChangePassword.propTypes = {

// };

export default ChangePassword;
