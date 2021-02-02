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

const JobeurFormContainer = ({ user }) => {
  const [dataUser, setDataUser] = useState(null);
  const [initialJob, setInitJob] = useState([]);
  const [initialKeyword, setInitKeyword] = useState([]);
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
        const listJob = job.split(';');
        const availabilityJobeur = availabilitylist.find(
          (row) => Number(row.value) === availability,
        );
        const mobilityJobeur = mobilitylist.find(
          (row) => row.value === mobility,
        );
        const listKeyword = [];
        // const listKeyword = keywords.split(';');
        setDataUser({
          ...rest,
          years_of_experiment: yearsOfExperiment,
          language: languagesUser,
          sector_of_activity: sectorActivity,
          availability: availabilityJobeur,
          mobility: mobilityJobeur,
        });
        setInitJob(listJob);
        setInitKeyword(listKeyword);
      });
  }, []);
  return (
    dataUser && (
      <JobeurForm
        user={user}
        defaultValues={dataUser}
        initJob={initialJob}
        initKeyword={initialKeyword}
      />
    )
  );
};

export default JobeurFormContainer;
