import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import InputFormField from './InputFormField';

function ProfileForm() {
  const schema = yup.object().shape({
    lastname: yup.string().required(),
    firstname: yup.string().required(),
    email: yup.string().email(),
  });

  const { register, handleSubmit } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="widget-title">Mon profil</h3>
      <hr />

      <fieldset id="coordonnees">
        <legend htmlFor="Civility" className="form-field-label">
          Civilité
        </legend>
        <InputFormField label="M" name="Mr" type="radio" register={register} />
        <InputFormField
          label="Mme"
          name="Mrs"
          type="radio"
          register={register}
        />
      </fieldset>

      {/* <div className="form-group">
        <label htmlFor={name} className="form-field-label">
          {label}
          <input
            type={type}
            className="form-field-input"
            id={name}
            name={name}
            ref={register}
          />
        </label>
      </div> */}
      <div className="form-check form-check-inline">
        <label className="form-check-label" htmlFor="inlineRadio1">
          1
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio1"
            value="option1"
          />
        </label>
      </div>

      <InputFormField
        label="NOM"
        name="lastname"
        type="text"
        register={register}
      />
      <InputFormField
        label="Prénom"
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
