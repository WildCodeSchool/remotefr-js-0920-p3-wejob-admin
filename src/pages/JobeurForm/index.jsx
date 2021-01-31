/* eslint-disable camelcase */
import React, { useState } from 'react';
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

import sampleCandidateData from './jobeurData';

function reformatHookFormData(data, kwTag, jobTag) {
  const formatData = {};
  // 1. Records the data entered by the user
  if (kwTag.length > 0) {
    formatData.keywords = kwTag.join(';');
  }
  if (jobTag.length > 0) {
    formatData.job = jobTag.join(';');
  }
  if (data.sector_of_activity) {
    formatData.sector_of_activity = data.sector_of_activity.map((s) => ({
      id: Number(s.value),
    }));
  }
  if (data.language) {
    formatData.language = data.language.map((s) => ({
      id: Number(s.value),
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
  return formatData;
}

function JobeurForm() {
  // Si on passe ?autofill=true dans l'URL, ça injecte des valeurs
  const prefilledValues =
    window.location.search === '?autofill=true'
      ? sampleCandidateData
      : { job: [], keywords: [] };
  const {
    job: initialJobTags,
    keywords: initialKeywords,
    ...defaultValues
  } = prefilledValues;

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

  const [kwTag, setKeyWords] = useState(initialKeywords);
  const [jobTag, setJobTag] = useState(initialJobTags);

  // Store text entries
  const [dataForm, setDataForm] = useState(defaultValues);
  // Store file entries
  const [files, setFiles] = useState({});

  // log changes on dataForm (to be removed)
  // useEffect(() => {
  //   console.log('updated dataForm', dataForm)
  // }, [dataForm])

  // Button function valid and continue
  const onSubmit = (data) => {
    // eslint-disable-next-line no-console
    console.log('data << ', data);
    setDataForm({ ...dataForm, ...data });
    reset({ ...dataForm, ...data });
    // 2. Go to the next step in the form
    setComp(compState + 1);
  };

  // Done: don't merge files with data handled by React Hook Form
  // Otherwise weird things happen
  const onSubmitFiles = (data) => {
    // eslint-disable-next-line no-console
    console.log('onSubmitFiles', data, dataForm);
    setFiles(data);
    setComp(compState + 1);
  };

  const onSendForm = async (event) => {
    event.preventDefault();

    const {
      availability,
      keywords,
      language,
      mobility,
      sector_of_activity,
      years_of_experiment,
      ...nonReformattedFields
    } = dataForm;
    // Reformater une partie des champs avant envoi
    // Tout le code de Jonathan pour reformater ces champs a été déplacé
    // de onSubmit à reformatHookFormData, qu'on appelle ici.
    const formattedFields = reformatHookFormData(
      {
        availability,
        keywords,
        language,
        mobility,
        sector_of_activity,
        years_of_experiment,
      },
      kwTag,
      jobTag,
    );
    // eslint-disable-next-line no-console
    console.log(formattedFields, nonReformattedFields);
    const jsonPayload = { ...formattedFields, ...nonReformattedFields };

    // TODO: utiliser id récupéré depuis le contexte où est stocké
    // l'utilisateur authentifié
    const candidatId = 5;
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/candidats/${candidatId}`,
        jsonPayload,
        { withCredentials: true },
      )
      .then((res) => {
        // La 1ère requête a fonctionné
        // eslint-disable-next-line no-console
        console.log(res);
        // FormData pour envoi des pdf & images en multipart/form-data
        // Sera traité par multer côté back
        const formdata = new FormData();
        ['cv1', 'cv2', 'picture'].forEach((key) => {
          const value = files[key];
          // eslint-disable-next-line no-console
          console.log(key, value);
          if (value) formdata.append(key, value);
        });
        // TODO: Il faudra authentifier la requête
        return axios.post(
          `${process.env.REACT_APP_API_URL}/candidats/file`,
          formdata,
          { withCredentials: true },
        );
      })
      // TODO: gérer l'erreur via un hook de state
      // (afficher une alerte Bootstrap, ou une notif. par exemple avec Noty)

      // eslint-disable-next-line no-console
      .catch((err) => console.error(err));
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
