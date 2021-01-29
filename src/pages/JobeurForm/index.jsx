import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import MultiStep from '../../components/MultiStepFormField';
import HeaderPostTitle from '../../components/HeaderPostTitle';

import ProfileForm from '../../components/ProfileForm';
import TrainingForm from '../../components/TrainingForm';
import ExperiencesForm from '../../components/ExperiencesForm';
import RecruitersInfoForm from '../../components/RecruitersInfoForm';
import FileDownloadLinks from '../../components/FileDownloadLinks';
import JobeurFormRecap from '../../components/JobeurFormRecap';

function JobeurForm() {
  // update the validation  yup schema for the data entered by the user when changing the form step
  const [schema, setSchema] = useState(yup.object().shape({}));

  // const schema = yup.object().shape({
  //   gender: yup.string().required('Vous devez sélectionner votre genre'),
  //   lastname: yup.string().min(2).required('Vous devez entrer votre nom'),
  //   firstname: yup.string().required('Vous devez entrer votre prénom'),
  //   email: yup.string().email(),
  //   diploma: yup.string(),
  //   levelOfExperience: yup.string(),
  //   languages: yup.string(),
  //   activityArea: yup.string(),
  //   jobName: yup.string(),
  //   skills: yup.string(),
  //   availability: yup.string().required(),
  //   modility: yup.string().required(),
  //   textDescription: yup.string().required(),
  // });

  const { register, handleSubmit, errors, control, reset, getValues } = useForm(
    {
      mode: 'onTouched',
      resolver: yupResolver(schema),
    },
  );

  const [compState, setComp] = useState(0);

  // Retrieves user entries
  const [dataForm, setDataForm] = useState({});

  // Button function valid and continue
  const onSubmit = (data) => {
    // eslint-disable-next-line no-console
    console.log('data : ', data, getValues());
    // 1. Records the data entered by the user
    setDataForm({ ...dataForm, ...data });
    reset({ ...dataForm, ...data });
    // 2. Sends data to the database

    // 3. Go to the next step in the form
    setComp(compState + 1);
  };

  const onSubmitFiles = (data) => {
    setDataForm({ ...dataForm, ...data });
    setComp(compState + 1);
  };

  const onSendForm = (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log(dataForm);
    const formdata = new FormData();
    Object.entries(dataForm).forEach((entry) => {
      // eslint-disable-next-line no-console
      console.log(entry);
      const [keys, values] = entry;
      formdata.append(keys, values);
    });
    axios.post();
  };
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('dataForm : ', dataForm);
  }, [dataForm]);

  const steps = [
    {
      name: 'Profil',
      nameForm: 'ProfileForm',
      component: (
        <ProfileForm
          register={register}
          handleSubmit={handleSubmit(onSubmit)}
          errors={errors}
          setSchema={setSchema}
        />
      ),
    },
    {
      name: 'Formations',
      nameForm: 'TrainingForm',
      component: (
        <TrainingForm
          register={register}
          handleSubmit={handleSubmit(onSubmit)}
          errors={errors}
          setSchema={setSchema}
          control={control}
        />
      ),
    },
    {
      name: 'Métiers',
      nameForm: 'ExperiencesForm',
      component: (
        <ExperiencesForm
          register={register}
          handleSubmit={handleSubmit(onSubmit)}
          errors={errors}
          setSchema={setSchema}
          control={control}
        />
      ),
    },
    {
      name: 'Recruteurs',
      nameForm: 'RecruitersInfoForm',
      component: (
        <RecruitersInfoForm
          register={register}
          handleSubmit={handleSubmit(onSubmit)}
          errors={errors}
          setSchema={setSchema}
          control={control}
        />
      ),
    },
    {
      name: 'Documents',
      nameForm: 'FileDownloadLinks',
      component: (
        <FileDownloadLinks
          register={register}
          handleSubmit={onSubmitFiles}
          errors={errors}
          setSchema={setSchema}
        />
      ),
    },
    {
      name: 'Recap',
      nameForm: 'JobeurForm',
      component: <JobeurFormRecap handleSubmit={onSendForm} data={dataForm} />,
    },
  ];

  return (
    <div className="main-wrapper">
      <HeaderPostTitle name="Formulaire candidat" />
      <div className="single-page clearfix">
        <div className="inner-wrap">
          <MultiStep steps={steps} compState={compState} setComp={setComp} />
        </div>
      </div>
    </div>
  );
}

export default JobeurForm;
