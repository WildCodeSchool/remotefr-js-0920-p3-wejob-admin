import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputFormField from './InputFormField';
import SelectPostField from './SelectPostField';

const activityArea = [
  { value: '0', label: 'Agroalimentaire' },
  { value: '1', label: 'Banque / Assurance' },
  { value: '2', label: 'Bois / Papier / Carton / Imprimerie' },
  { value: '3', label: 'BTP / Matériaux de construction' },
  { value: '4', label: 'Chimie / Parachimie' },
  { value: '5', label: 'Commerce / Négoce / Distribution' },
  { value: '6', label: 'Édition / Communication / Multimédia' },
  { value: '7', label: 'Électronique / Électricité' },
  { value: '8', label: 'Études et conseils' },
  { value: '9', label: 'Industrie pharmaceutique' },
  { value: '10', label: 'Informatique / Télécoms' },
  { value: '11', label: 'Machines et équipements / Automobile' },
  { value: '12', label: 'Métallurgie / Travail du métal' },
  { value: '13', label: 'Plastique / Caoutchouc' },
  { value: '14', label: 'Services aux entreprises' },
  { value: '15', label: 'Textile / Habillement / Chaussure' },
  { value: '16', label: 'Transports / Logistique' },
];

function ExperiencesForm() {
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

  // const [allSlills, setAllSlills] = useState(['']);

  // const addSkill = () => {
  //   setAllSlills([...allSlills, '']);
  // };

  return (
    <form
      className="contact-form experiences-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="widget-title">Expériences professionnelles</h3>
      <hr />
      <SelectPostField
        label="Secteurs d’activité"
        name="activity_area"
        options={activityArea}
      />
      <InputFormField
        label="Métier"
        name="jobName"
        type="text"
        register={register}
      />
      <InputFormField
        label="Compétences"
        name="skills"
        type="text"
        register={register}
      />
    </form>
  );
}

export default ExperiencesForm;
