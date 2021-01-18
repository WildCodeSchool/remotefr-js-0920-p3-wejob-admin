import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// import useFormPersist from 'react-hook-form-persist';
import MultiStep from '../../components/MultiStepFormField';
import HeaderPostTitle from '../../components/HeaderPostTitle';

import ProfileForm from '../../components/ProfileForm';
import TrainingForm from '../../components/TrainingForm';
import ExperiencesForm from '../../components/ExperiencesForm';
import RecruitersInfoForm from '../../components/RecruitersInfoForm';

function JobeurForm() {
  const schema = yup.object().shape({
    gender: yup.string().required('Vous devez sélectionner votre genre'),
    lastname: yup.string().min(2).required('Vous devez entrer votre nom'),
    firstname: yup.string().required('Vous devez entrer votre prénom'),
    email: yup.string().email(),
    diploma: yup.string(),
    levelOfExperience: yup.string(),
    languages: yup.string(),
    activityArea: yup.string(),
    jobName: yup.string(),
    skills: yup.string(),
    availability: yup.string().required(),
    modility: yup.string().required(),
    textDescription: yup.string().required(),
  });

  const { register, handleSubmit, errors } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  });

  // Retrieves user entries
  const [dataForm, setDataForm] = useState([]);

  // Button function valid and continue
  const onSubmit = (data) => {
    // eslint-disable-next-line no-console
    console.log('data : ', data);
    setDataForm({ ...dataForm, ...data });
    // eslint-disable-next-line no-console
    console.log(data, dataForm);
  };

  const steps = [
    {
      name: 'Profil',
      component: (
        <ProfileForm
          register={register}
          handleSubmit={handleSubmit(onSubmit)}
          errors={errors}
        />
      ),
    },
    {
      name: 'Formations',
      component: <TrainingForm register={register} />,
    },
    {
      name: 'Expériences',
      component: <ExperiencesForm register={register} />,
    },
    {
      name: 'Recruteurs',
      component: <RecruitersInfoForm register={register} />,
    },
    {
      name: 'Documents',
      component: 'Télechargement de documents',
    },
  ];

  // useFormPersist(
  //   'formJobeur',
  //   { watch, setValue },
  //   {
  //     storage: window.localStorage,
  //   },
  // );

  // eslint-disable-next-line no-console
  console.log('dataForm : ', dataForm);

  return (
    <div className="main-wrapper">
      <HeaderPostTitle name="Formulaire candidat" />
      <div className="single-page clearfix">
        <div className="inner-wrap">
          <MultiStep steps={steps} />
        </div>
      </div>
    </div>
  );
}

export default JobeurForm;
