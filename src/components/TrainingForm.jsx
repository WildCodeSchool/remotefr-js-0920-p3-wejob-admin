import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputFormField from './InputFormField';
import SelectPostField from './SelectPostField';

const levelOfExperience = [
  { value: '0', label: "De 0 à 5 ans d'expérience" },
  { value: '1', label: "De 5 à 10 ans d'expérience" },
  { value: '2', label: "Plus de 10 ans d'expérience" },
];
const languages = [
  { value: '0', label: 'Anglais' },
  { value: '1', label: 'Espagnol' },
  { value: '2', label: 'Allemand' },
  { value: '3', label: 'Italien' },
];

function TrainingForm() {
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
      className="contact-form trainingForm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="widget-title">Formations</h3>
      <hr />
      <InputFormField
        label="Diplome"
        name="diploma"
        type="text"
        register={register}
      />
      <SelectPostField
        label="Niveau d'expérience"
        name="level of experience"
        options={levelOfExperience}
      />
      <SelectPostField label="Langues" name="languages" options={languages} />
    </form>
  );
}

export default TrainingForm;
