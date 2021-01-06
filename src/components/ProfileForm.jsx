import React from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import InputFormField from './InputFormField';

function ProfileForm() {
  const schema = yup.object().shape({
    lastname: yup.string().min(2).required('Vous devez entrer votre nom'),
    firstname: yup.string().required(),
    email: yup.string().email().required(),
  });

  const { register, handleSubmit } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    return JSON.stringify(data);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="widget-title">Mon profil</h3>
      <hr />
      <fieldset id="coordonnees">
        <legend htmlFor="Civility" className="form-field-label">
          Civilité *
        </legend>
        <InputFormField
          label="M"
          name="Civility"
          type="radio"
          register={register}
        />
        <InputFormField
          label="Mme"
          name="Civility"
          type="radio"
          register={register}
        />
      </fieldset>

      <InputFormField
        label="NOM *"
        name="lastname"
        type="text"
        register={register}
      />
      <InputFormField
        label="Prénom *"
        name="firstname"
        type="text"
        register={register}
      />
      <InputFormField
        label="Email"
        name="email"
        type="email"
        register={register}
      />
    </form>
  );
}

export default ProfileForm;
