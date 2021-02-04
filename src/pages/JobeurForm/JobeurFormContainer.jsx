import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JobeurForm from './index';
import {
  levelOfExperience,
  languages,
  activityArea,
  availabilitylist,
  mobilitylist,
} from '../../constants/forms';
import sampleCandidateData from './jobeurData';
import { userPropTypes } from '../../prop-types';

const getDefaultValues = () => {
  // Si on passe ?autofill=true dans l'URL, ça injecte des valeurs
  const prefilledValues =
    window.location.search === '?autofill=true'
      ? sampleCandidateData
      : { job: [], keywords: [] };
  const {
    job: initJob,
    keywords: initKeyword,
    ...defaultValues
  } = prefilledValues;
  return {
    defaultValues,
    initJob,
    initKeyword,
  };
};

const JobeurFormContainer = ({ user }) => {
  const [dataUser, setDataUser] = useState(null);
  const [initialJob, setInitJob] = useState(null);
  const [initialKeywords, setInitKeywords] = useState(null);
  const [loading, setLoading] = useState(true);
  // retrieve the Jober's data from the database
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/candidats/${user.id}`)
      .then((res) => {
        const {
          years_of_experiment: yearsId,
          language,
          sector_of_activity: sectorOfActivity,
          job,
          availability,
          mobility,
          keywords,
          // extract isCheck so that it's NOT in rest: it's not a good
          // idea to send it back to the API, since only admins are
          // supposed to change it.
          isCheck,
          ...rest
        } = res.data;
        const yearsOfExperiment = levelOfExperience.find(
          (row) => Number(row.value) === yearsId,
        );
        const languagesUser = language.map((el) =>
          languages.find((row) => Number(row.value) === el.id_lang),
        );
        const sectorActivity = sectorOfActivity.map((el) =>
          activityArea.find((row) => Number(row.value) === el.id_sector),
        );
        const listJob = (job || '').split(';');
        const availabilityJobeur = availabilitylist.find(
          (row) => Number(row.value) === availability,
        );
        const mobilityJobeur = mobilitylist.find(
          (row) => row.value === mobility,
        );
        const listKeyword = (keywords || '').split(';');
        setDataUser({
          ...rest,
          years_of_experiment: yearsOfExperiment,
          language: languagesUser,
          sector_of_activity: sectorActivity,
          availability: availabilityJobeur,
          mobility: mobilityJobeur,
        });
        setInitJob(listJob);
        setInitKeywords(listKeyword);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>loading</p>;

  const hasFiche = dataUser && initialJob && initialKeywords;

  const props = hasFiche
    ? {
        defaultValues: dataUser,
        initJob: initialJob,
        initKeyword: initialKeywords,
      }
    : getDefaultValues();

  return (
    <JobeurForm
      user={user}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
};

JobeurFormContainer.propTypes = {
  user: userPropTypes.isRequired,
};

export default JobeurFormContainer;
