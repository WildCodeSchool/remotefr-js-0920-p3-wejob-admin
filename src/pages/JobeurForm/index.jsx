import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// import axios from 'axios';
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

  const { register, handleSubmit, errors, control, reset } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  });

  const [compState, setComp] = useState(0);

  const [kwTag, setKeyWords] = useState([]);
  const [jobTag, setJobTag] = useState([]);

  // Retrieves user entries
  const [dataForm, setDataForm] = useState({});

  // Button function valid and continue
  const onSubmit = (data) => {
    // eslint-disable-next-line no-console
    console.log('data << ', data);
    const formatData = {};
    // 1. Records the data entered by the user
    if (kwTag.length > 0) {
      formatData.keywords = kwTag.join(';');
    }
    if (jobTag.length > 0) {
      formatData.job = jobTag.map((oneJob, ind) => ({
        id_job: Number(ind),
        name_job: oneJob,
      }));
    }
    if (data.sector_of_activity) {
      formatData.sector_of_activity = data.sector_of_activity.map((s) => ({
        id_sector: Number(s.value),
        name_sector: s.label,
      }));
    }
    if (data.language) {
      formatData.language = data.language.map((s) => ({
        id_language: Number(s.value),
        language: s.label,
      }));
    }
    if (data.availability) {
      formatData.availability = Number(data.availability.value);
    }
    if (data.years_of_experiment) {
      formatData.years_of_experiment = Number(data.years_of_experiment.value);
    }
    if (data.mobility) {
      formatData.mobility = data.mobility.value;
    }
    // if (data.jobName1 && data.jobName1.length > 0 && data.jobName2.length > 0) {
    //   formatData.job = [
    //     { id_job: 0, name_job: data.jobName1 },
    //     { id_job: 1, name_job: data.jobName2 },
    //   ];
    // } else if (data.jobName1 > 0 && data.jobName2 === 0) {
    //   formatData.job = [{ id_job: 0, name_job: data.jobName1 }];
    // } else if (data.jobName2 > 0 && data.jobName1 === 0) {
    //   formatData.job = [{ id_job: 0, name_job: data.jobName2 }];
    // }
    setDataForm({ ...dataForm, ...data, ...formatData });
    reset({ ...dataForm, ...data });
    // 2. Go to the next step in the form
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
      const [keys, values] = entry;
      formdata.append(keys, values);
    });
  };

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
          jobTag={jobTag}
          setJobTag={setJobTag}
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
          kwTag={kwTag}
          setKeyWords={setKeyWords}
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
