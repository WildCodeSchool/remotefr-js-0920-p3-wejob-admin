import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import styles from '../asset/css/FileDownloadLinks.module.css';

function FileDownloadLinks({ register, handleSubmit, errors, setSchema }) {
  useEffect(() => {
    setSchema(
      yup.object().shape({
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
      }),
    );
  }, []);

  const [selectedCvFile, setCvFile] = useState(null);

  const onChangeHandler = (event) => {
    // eslint-disable-next-line no-console
    console.log(event.target.files[0]);
    setCvFile(event.target.files[0]);
  };

  const onClickHandler = () => {
    const data = new FormData();
    data.append('file', selectedCvFile);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <form
            method="post"
            action="#"
            className="FileDownloadLinks container py-5"
            id="FileDownloadLinks"
            onSubmit={handleSubmit}
            onChange={onChangeHandler}
          >
            <div className={`form-group ${styles.files}`}>
              <label htmlFor="cv" className="form-field-label col-md-12">
                Téléchargement votre CV au format pdf
                <input
                  type="file"
                  className={`form-control ${styles.input}`}
                  multiple=""
                  id="cv"
                  name="cv"
                  ref={register}
                />
              </label>
              {errors.cv && (
                <span className="spanError">{errors.cv.message}</span>
              )}
              <button
                type="button"
                className={styles.btn}
                onClick={onClickHandler}
              >
                Upload
              </button>
            </div>
            <div className={`form-group ${styles.files}`}>
              <label htmlFor="cv" className="form-field-label col-md-12">
                Téléchargement votre photo au format png, jpeg ou jpg
                <input
                  type="file"
                  className={`form-control ${styles.input}`}
                  multiple=""
                  id="photo"
                  name="photov"
                  ref={register}
                />
              </label>
              {errors.cv && (
                <span className="spanError">{errors.photo.message}</span>
              )}
              <button
                type="button"
                className={styles.btn}
                onClick={onClickHandler}
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

FileDownloadLinks.propTypes = {
  register: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    cv: PropTypes.shape({
      message: PropTypes.string,
      type: PropTypes.string,
    }),
  }).isRequired,
  photo: PropTypes.shape({
    cv: PropTypes.shape({
      message: PropTypes.string,
      type: PropTypes.string,
    }),
  }).isRequired,
  setSchema: PropTypes.func.isRequired,
};

export default FileDownloadLinks;
