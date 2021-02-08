import React from 'react'; // { useContext }
import { useLocation, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { NotificationManager } from 'react-notifications';
// import PropTypes from 'prop-types';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import HeaderPostTitle from '../../components/HeaderPostTitle';
import Modal from '../../components/widgetsFormField/ModalHelp';

const helpPassword = () => {
  return (
    <div>
      <p>Un mot de passe valide doit avoir : </p>
      <ul>
        <li>- de 8 à 15 caractères</li>
        <li>- au moins une lettre minuscule</li>
        <li>- au moins une lettre majuscule</li>
        <li>- au moins un chiffre</li>
        <li>- au moins un de ces caractères spéciaux: $ @ % * + - _ !</li>
        <li>- aucun autre caractère possible</li>
      </ul>
    </div>
  );
};

function CreateAnAccount() {
  const history = useHistory();

  const location = useLocation();
  const url = new URL(`${window.location.origin}${location.search}`);
  const token = url.searchParams.get('token');
  const email = atob(url.searchParams.get('email'));

  const schema = yup.object().shape({
    email: yup.string(),
    password: yup
      .string()
      .min(8)
      .max(15)
      .matches(/^[\w$@%*+\-_!]{8,15}$/, {
        message:
          'Un mot de passe valide aura de 8 à 15 caractères, au moins une lettre minuscule, au moins une lettre majuscul, au moins un chiffre, au moins un de ces caractères spéciaux: $ @ % * + - _ !, aucun autre caractère possible ',
      })
      .required('Vous devez entrer un mot de passe valide'),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref('password'), null],
        'les mots de passe doivent correspondre',
      )
      .required('Vous devez confirmer votre mot de passe'),
  });

  const { register, handleSubmit, errors } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: { email },
  });

  const onSubmit = (data) => {
    const { password } = data;
    axios
      .post(`${process.env.REACT_APP_API_URL}/candidats/update-password`, {
        token,
        password,
      })
      .then(() => {
        NotificationManager.success(
          'Votre mot de passe a bien été créé',
          'Vous pouvez désormais vous connecter',
        );
        history.push('/se-connecter', { email });
      })
      .catch((error) => {
        NotificationManager.error(
          'Erreur',
          `Veuillez réessayer ultérieurement (${error.message})`,
        );
      });
  };

  return (
    <div className="main-wrapper">
      <HeaderPostTitle name="Première connexion" />
      <div className="single-page clearfix">
        <div className="inner-wrap">
          <form
            className="CreateAnAccount container py-5"
            id="CreateAnAccount"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="widget-title">Créer votre compte</h3>
            <hr />

            <div className="mb-3 row">
              <div className="form-group row ">
                <label
                  htmlFor="email"
                  className="col-sm-5 col-form-label form-field-label"
                >
                  Email *{' '}
                </label>
                <div className="col-sm-6">
                  <input
                    type="email"
                    className="form-control-plaintext"
                    id="email"
                    name="email"
                    ref={register}
                    readOnly
                  />
                </div>

                {errors.email && (
                  <span className="spanError">{errors.email.message}</span>
                )}
              </div>
            </div>

            <div className="form-group row">
              <label
                htmlFor="password"
                className="col-sm-5 col-form-label form-field-label"
              >
                Mot de passe *
              </label>
              <div className="col-sm-5">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  ref={register}
                />
              </div>
              <div className="col-sm-1">
                <Modal content={helpPassword()} />
              </div>
              {errors.password && (
                <span className="spanError">{errors.password.message}</span>
              )}
            </div>

            <div className="form-group row">
              <label
                htmlFor="confirmPassword"
                className="col-sm-5 col-form-label form-field-label"
              >
                Confirmer votre mot de passe *{' '}
              </label>
              <div className="col-sm-5">
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
              <button type="submit" className="button-submit col-sm-4">
                <span>Valider mon compte</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// CreateAnAccount.propTypes = {

// };

export default CreateAnAccount;
