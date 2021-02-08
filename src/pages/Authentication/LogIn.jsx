import React, { useContext } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { NotificationManager } from 'react-notifications';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import HeaderPostTitle from '../../components/HeaderPostTitle';
import AuthContext from '../../contexts/auth';

function LogIn() {
  const location = useLocation();
  const { user, setUser } = useContext(AuthContext);

  const schema = yup.object().shape({
    password: yup
      .string()
      .min(8)
      .max(15)
      .matches(/^[\w$@%*+\-_!]{6,15}$/, {
        message:
          'Un mot de passe valide aura de 6 à 15 caractères, au moins une lettre minuscule, au moins une lettre majuscule, au moins un chiffre, au moins un de ces caractères spéciaux: $ @ % * + - _ !, aucun autre caractère possible ',
      })
      .required('Vous devez entrer votre nouveau mot de passe'),
  });

  const { register, handleSubmit, errors, getValues } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: location.state?.email
      ? { email: location.state.email }
      : undefined,
  });

  // const { isSubmitting, isValid } = formState;

  // const ValidateConnect = () => {
  //   <Link to="/se-connecter">
  //     <span>Valider et se connecter</span>
  //   </Link>;
  // };

  const onSubmit = (data) => {
    const { email, password } = data;
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      )
      .then((response) => {
        setUser(response.data);
        NotificationManager.success('Vous êtes connecté');
      })
      .catch((error) => {
        if (error.response) {
          NotificationManager.error('Identifiants incorrects');
        } else {
          NotificationManager.error(
            'Erreur',
            'Veuillez réessayer ultérieurement',
          );
        }
      });
  };

  const forgotPassword = () => {
    const { email } = getValues();
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/candidats/forgot-password`,
        {
          email,
        },
        {
          withCredentials: true,
        },
      )
      .then(() => {
        NotificationManager.success('Un lien de réinitialisation a été envoyé');
      })
      .catch(() => {
        NotificationManager.error("Une erreur s'est produite");
      });
  };

  if (user) return <Redirect to="/" />;

  return (
    <div className="main-wrapper">
      <HeaderPostTitle name="Se connecter" />
      <div className="single-page clearfix">
        <div className="inner-wrap">
          <form
            className="LogIn container py-5"
            id="LogIn"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="widget-title">
              Connectez-vous, entrez votre mot de passe
            </h3>
            <hr />
            <div className="mb-3 row">
              <div className="form-group row">
                <label
                  htmlFor="email"
                  className="col-sm-5 col-form-label form-field-label"
                >
                  Votre Email
                </label>
                <div className="col-sm-6">
                  <input
                    type="email"
                    className="form-field-input"
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    ref={register}
                    required
                  />
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="password"
                  className="col-sm-5 col-form-label form-field-label"
                >
                  Entrer votre mot de passe *
                </label>
                <div className="col-sm-6">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    ref={register}
                    required
                  />
                  <div className="form-group mt-2">
                    <button
                      // disabled={isSubmitting || isValid}
                      type="button"
                      className="btn btn-outline-primary link-primary"
                      onClick={forgotPassword}
                    >
                      Mot de passe oublié
                    </button>
                  </div>
                </div>
                {errors.password && (
                  <span className="spanError">{errors.password.message}</span>
                )}
              </div>

              <div className="row justify-content-center ">
                <button type="submit" className="button-submit col-sm-4">
                  <span>Valider et se connecter</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// LogIn.propTypes = {

// };

export default LogIn;
