import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
// import ImageCropper from './ImageCropper';
import styles from '../asset/css/FileDownloadLinks.module.css';
import ImageCropper from './ImageCropper';
import Modal from './widgetsFormField/ModalHelp';

function FileDownloadLinks({ handleSubmit, errors, setSchema }) {
  useEffect(() => {
    setSchema(
      yup.object().shape({
        // CV_1: yup.string(),
        // // CV_2: yup.string(),
        // photo: yup.string(),
        // link_You_Tube: yup
        //   .string()
        //   .matches(
        //     /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)&?/,
        //     {
        //       message: 'Vous devez entrer un lien youtube valide',
        //     },
        //   ),
        // link_Linkedln: yup
        //   .string()
        //   .matches(/^https:\/\/[a-z]{2,3}\\.linkedin\\.com\\/, {
        //     message: 'Vous devez entrer un lien Linkedln valide',
        //   }),
      }),
    );
  }, [setSchema]);

  const [Cv1File, setCvFile] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);
  const [urlPhoto, setUrlPhoto] = useState(null);

  // eslint-disable-next-line no-console
  console.log(Cv1File, userPhoto);

  // const onChangeHandler = (event) => {
  //   // eslint-disable-next-line no-console
  //   console.log(event.target.files[0]);
  //   // if (event.target.name === 'cv') {
  //   //   setCvFile(event.target.files[0]);
  //   //   } else
  //   if (event.target.name === 'userPhoto') {
  //     setUserPhoto(event.target.files[0]);
  //   }
  // };

  // const handleChangePhoto = (event) => {
  //   setUserPhoto(event.target.files[0]);
  //   // <ImageCropper inputImg={setUserPhoto} />;
  // };

  // const onClickHandlerCv1 = () => {
  //   const data = new FormData();
  //   data.append('file', selectedCvFile);
  //   // eslint-disable-next-line no-console
  //   console.log('data : ', data);
  // };

  const onSubmitFiles = (event) => {
    event.preventDefault();
    handleSubmit({ CV_1: Cv1File, Photo: userPhoto });
  };

  return (
    <div className="container">
      {JSON.stringify(errors)}
      <div className="row">
        <div className="col-md-6">
          <form
            method="post"
            action="#"
            className="FileDownloadLinks container"
            id="FileDownloadLinks"
            onSubmit={onSubmitFiles}
            // onChange={onChangeHandler}
          >
            <div className={`form-group ${styles.files}`}>
              <label htmlFor="CV_1" className="form-field-label col-md-12">
                Téléchargement votre CV 1 au format pdf
                <input
                  type="file"
                  className={`form-control ${styles.input}`}
                  id="CV_1"
                  name="CV_1"
                  onChange={(event) => {
                    // const data = new FormData();
                    // data.append('CV_1', event.target.files[0]);
                    setCvFile(event.target.files[0]);
                  }}
                />
              </label>
              {errors.CV_1 && (
                <span className="spanError">{errors.CV_1.message}</span>
              )}
              {/* <button
                type="button"
                className={styles.btn}
                onClick={onClickHandlerCv1}
              >
                Upload
              </button> */}
            </div>
            <div className={`form-group ${styles.files}`}>
              <label htmlFor="userPhoto" className="form-field-label col-md-12">
                Téléchargement votre photo au format png, jpeg ou jpg
                <input
                  type="file"
                  className={`form-control ${styles.input}`}
                  id="userPhoto"
                  name="userPhoto"
                  onChange={(event) => {
                    setUserPhoto(event.target.files[0]);
                    const file = event.target.files[0];
                    const fileReader = new FileReader();
                    fileReader.onloadend = () => {
                      setUrlPhoto(fileReader.result);
                    };
                    if (file) {
                      fileReader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
              <Modal content={<ImageCropper inputImg={urlPhoto} />} />
              {errors.userPhoto && (
                <span className="spanError">{errors.userPhoto.message}</span>
              )}
              {/* <button
                type="button"
                className={styles.btn}
                onClick={onClickHandler}
              >
                Upload
              </button> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

FileDownloadLinks.propTypes = {
  // register: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    CV_1: PropTypes.shape({
      message: PropTypes.string,
      type: PropTypes.string,
    }),
    userPhoto: PropTypes.shape({
      message: PropTypes.string,
      type: PropTypes.string,
    }),
  }).isRequired,
  setSchema: PropTypes.func.isRequired,
};

export default FileDownloadLinks;
