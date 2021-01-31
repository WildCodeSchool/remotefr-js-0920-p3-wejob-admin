import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// import PropTypes from 'prop-types';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import HeaderPostTitle from '../../components/HeaderPostTitle';

function LogIn() {
  const history = useHistory();

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

  const { register, handleSubmit, errors } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  });

  // const ValidateConnect = () => {
  //   <Link to="/LogIn">
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
        history.push('/JobeurForm');
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

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
            <h3 className="widget-title">Entrer votre mot de passe</h3>
            <hr />
            <div className="row">
              <div className="form-group">
                <label htmlFor="email" className="form-field-label">
                  Votre Email
                  <input
                    type="email"
                    className="form-field-input"
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    ref={register}
                    required
                  />
                </label>
              </div>
            </div>
            <div className="row">
              <div className="form-group">
                <label htmlFor="password" className="form-field-label">
                  Entrer votre mot de passe *
                  <input
                    type="text"
                    className="form-field-input"
                    id="password"
                    name="password"
                    ref={register}
                    required
                  />
                </label>
                {errors.password && (
                  <span className="spanError">{errors.password.message}</span>
                )}
              </div>

              <div className="form-group">
                <button type="button">
                  <Link to="/ForgotYourPassword">Mot de passe oublié</Link>
                </button>
              </div>
              <div className="form-group">
                <button type="submit" onClick={handleSubmit(onSubmit)}>
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
