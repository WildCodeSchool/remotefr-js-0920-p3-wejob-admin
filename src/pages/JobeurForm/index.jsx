/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { NotificationManager } from 'react-notifications';
// import { userPropTypes } from '../../prop-types';
import MultiStep from '../../components/MultiStepFormField';
import HeaderPostTitle from '../../components/HeaderPostTitle';

import ProfileForm from '../../components/ProfileForm';
import TrainingForm from '../../components/TrainingForm';
import ExperiencesForm from '../../components/ExperiencesForm';
import RecruitersInfoForm from '../../components/RecruitersInfoForm';
import FileDownloadLinks from '../../components/FileDownloadLinks';
import JobeurFormRecap from '../../components/JobeurFormRecap';
import sendFicheCandidat from '../../helpers/sendFicheCandidat';

// const propTypes = {
//   user: userPropTypes.isRequired,
// };

// Array of functions that count the number of missing required fields for each step
const requiredFieldsByStep = [
  ({ dataForm }) => {
    return ['civility', 'firstname', 'lastname'].reduce(
      (c, k) => c + (dataForm[k] ? 0 : 1),
      0,
    );
  },
  ({ jobTag }) => (jobTag.length > 0 ? 0 : 1),
  () => 0,
  ({ dataForm, kwTag }) =>
    (dataForm.description ? 0 : 1) + (kwTag.length > 0 ? 0 : 1),
  () => 0,
  () => 0,
];

function checkStepErrors(compState, dataForm, jobTag, kwTag) {
  const errors = [];
  for (let i = 0; i < compState; i += 1) {
    errors.push(requiredFieldsByStep[i]({ dataForm, jobTag, kwTag }));
  }
  return errors;
}

function JobeurForm({ user, defaultValues, initJob, initKeyword }) {
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
    defaultValues,
  });

  const [compState, setComp] = useState(0);

  const [kwTag, setKeyWords] = useState(initKeyword);
  const [jobTag, setJobTag] = useState(initJob);

  // Store text entries
  const [dataForm, setDataForm] = useState(defaultValues);
  // Store file entries
  const [files, setFiles] = useState({});

  const stepErrors = useMemo(
    () => checkStepErrors(compState, dataForm, jobTag, kwTag),
    [compState, dataForm, jobTag, kwTag],
  );

  // Button function valid and continue
  const onSubmit = (data) => {
    setDataForm({ ...dataForm, ...data });
    reset({ ...dataForm, ...data });
    // 2. Go to the next step in the form
    setComp(compState + 1);
  };

  // Done: don't merge files with data handled by React Hook Form
  // Otherwise weird things happen
  const onSubmitFiles = (data) => {
    setFiles(data);
    setComp(compState + 1);
  };

  const onSendForm = async (event) => {
    event.preventDefault();
    sendFicheCandidat(user.id, dataForm, kwTag, jobTag, files)
      .then(() =>
        NotificationManager.success(
          "Votre fiche sera validée par l'administrateur.",
          'Fiche mise à jour',
        ),
      )
      .catch(() =>
        NotificationManager.error(
          "Une erreur s'est produite, veuillez nous contacter",
          'Erreur',
        ),
      );
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
          handleSubmit={handleSubmit(onSubmit)}
          handleSubmitFiles={onSubmitFiles}
          errors={errors}
          setSchema={setSchema}
        />
      ),
    },
    {
      name: 'Recap',
      nameForm: 'JobeurForm',
      component: (
        <JobeurFormRecap
          handleSubmit={onSendForm}
          data={dataForm}
          files={files}
        />
      ),
    },
  ];

  return (
    <div className="main-wrapper">
      <HeaderPostTitle name="Formulaire candidat" />
      <div className="single-page clearfix">
        <div className="inner-wrap">
          <MultiStep
            steps={steps}
            compState={compState}
            setComp={setComp}
            stepErrors={stepErrors}
          />
        </div>
      </div>
    </div>
  );
}
// user, defaultValues, initJob, initKeyword

JobeurForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  defaultValues: PropTypes.shape({
    civility: PropTypes.string,
  }).isRequired,
  initJob: PropTypes.arrayOf(PropTypes.string).isRequired,
  initKeyword: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default JobeurForm;
