import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import SelectPostField from './SelectPostField';
import TextAreaFromField from './TextAreaFromField';

const availability = [
  { value: '0', label: 'immédiatement' },
  { value: '1', label: 'autres' },
];
const mobility = [
  { value: '0', label: 'Bordeaux' },
  { value: '1', label: 'Gironde' },
  { value: '2', label: 'Nouvelle-Aquitaine' },
  { value: '3', label: 'France' },
];

function RecruitersInfoForm() {
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
    <form
      className="contact-form recruiters-info-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="widget-title">Information pour les recruteurs</h3>
      <hr />
      <div className="form-check form-switch">
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
          Fiche visible pour un recruteur
          <input
            className="form-check-input"
            type="checkbox"
            id="flexSwitchCheckDefault"
          />
        </label>
      </div>
      <SelectPostField
        label="Disponibilité"
        name="activity_area"
        options={availability}
      />
      <SelectPostField label="Mobilité" name="mobility" options={mobility} />

      <TextAreaFromField
        label="Description"
        name="description"
        type="text"
        register={register}
      />
    </form>
  );
}

export default RecruitersInfoForm;
