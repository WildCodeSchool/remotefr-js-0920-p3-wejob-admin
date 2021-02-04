import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
// import ImageCropper from './ImageCropper';
import styles from '../asset/css/FileDownloadLinks.module.css';
import ImageCropper from './ImageCropper';
import Modal from './widgetsFormField/ModalHelp';
import {useDropzone} from 'react-dropzone';

const formatFactor = (sz, f) => (sz / f).toFixed(1)

const formatSize = sz => {
  return sz > 1048576 ? `${formatFactor(sz, 1048576)} Mo`
  : `${formatFactor(sz, 1024)} Ko`
};

const formatItem = file => <><span className="fw-bold">{file.path}</span><span>&nbsp;- {formatSize(file.size)}</span></>

function AcceptFile({ accept, ext, btnLabel, onDrop }) {
  console.log(onDrop)
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps
  } = useDropzone({
    // accept: 'image/jpeg, image/png'
    // accept: 'application/pdf',
    onDropAccepted: onDrop,
    accept,
    maxFiles: 1
  });

  return (
    <section className="AcceptFile">
      <div {...getRootProps({ className: 'AcceptFile-dropzone' })}>
        <input {...getInputProps()} />
        <p>Glissez &amp; déposez ou cliquez.</p>
        <p><em>(fichiers acceptés : {ext})</em></p>
        <span className="btn btn-primary btn-large">
          <span className="icon-upload" />
          {btnLabel}
        </span>
      </div>
      <aside className="AcceptFile-status">
        {acceptedFiles.length > 0 && (
           <><span className="icon-checkmark text-success" />{formatItem(acceptedFiles[0])}</>
        )}
        {fileRejections.length > 0 && acceptedFiles.length === 0 && (
           <><span className="icon-blocked text-danger" />{formatItem(fileRejections[0].file)}</>
        )}
      </aside>
    </section>
  );
}

function FileDownloadLinks({
  register,
  handleSubmit,
  handleSubmitFiles,
  errors,
  setSchema,
}) {
  useEffect(() => {
    setSchema(
      yup.object().shape({
        // cv1: yup.string(),
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
  const [Cv2File, setCv2File] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);
  const [urlPhoto, setUrlPhoto] = useState(null);

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

  const onSubmit = (event) => {
    handleSubmit(event);
    handleSubmitFiles({ cv1: Cv1File, cv2: Cv2File, picture: userPhoto });
  };

  return (
    <div className="wj-container">
      {/* {JSON.stringify(errors)} */}
      <form
        method="post"
        action="#"
        className="FileDownloadLinks container"
        id="FileDownloadLinks"
        onSubmit={onSubmit}
        // onChange={onChangeHandler}
      >
        <div className="row">
          {/* cv1 */}
          <div className="col-md-6">
            {/* <div className={`form-group ${styles.files}`}>
              <input
                type="file"
                className={styles.input}
                id="cv1"
                name="cv1"
                onChange={(event) => {
                  setCvFile(event.target.files[0]);
                }}
              />
              <label htmlFor="cv1" className="btn btn-primary">
                <span className="icon-upload" />
                CV 1 au format PDF
              </label>
              {errors.cv1 && (
                <span className="spanError">{errors.cv1.message}</span>
              )}
            </div> */}


<AcceptFile btnLabel="CV 1 (pdf)" ext="pdf" accept="application/pdf" onDrop={([f]) => setCvFile(f)} />
          </div>

          {/* cv2 */}
          <div className="col-md-6">
            {/* <div className={`form-group ${styles.files}`}>
                <input
                  type="file"
                  className={styles.input}
                  id="cv2"
                  name="cv2"
                  onChange={(event) => {
                    setCv2File(event.target.files[0]);
                  }}
                />
              <label htmlFor="cv2" className="form-field-label col-md-12">
                CV 2 au format PDF
              </label>
              {errors.cv2 && (
                <span className="spanError">{errors.cv2.message}</span>
              )}
            </div> */}
<AcceptFile btnLabel="CV 2 (pdf)" ext="pdf" accept="application/pdf" onDrop={([f]) => setCv2File(f)}/>
          </div>

          {/* picture upload */}
          <div className="col-md-6">
            {/* <div className={`form-group ${styles.files}`}>
              <label htmlFor="picture" className="form-field-label col-md-12">
                Téléchargement votre photo au format png, jpeg ou jpg
                <input
                  type="file"
                  className={styles.input}
                  id="picture"
                  name="picture"
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
              </label> */}

<AcceptFile btnLabel="Photo (png ou jpg)" ext="png, jpg et jpeg" accept="image/jpeg, image/png" onDrop={([f]) => setUserPhoto(f)} />
              <Modal content={<ImageCropper inputImg={urlPhoto} />} />
              {errors.userPhoto && (
                <span className="spanError">{errors.userPhoto.message}</span>
              )}
            {/* </div> */}
          </div>

          {/* picture preview */}
          <div className="col-md-6">img preview</div>

          {/* LinkedIn & YouTube */}
          <div className="col-md-6">
            <label
              htmlFor="linkedin"
              className="form-label fw-bold text-primary"
            >
              Lien vers votre profil LinkedIn
              <span className="spanInfoField"> (champ facultatif)</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="linkedin"
              name="linkedin"
              ref={register}
            />
          </div>
          <div className="col-md-6">
            <label
              htmlFor="youtube"
              className="form-label fw-bold text-primary"
            >
              Lien vers YouTube
              <span className="spanInfoField"> (champ facultatif)</span>
            </label>

            <input
              type="text"
              className="form-control"
              id="youtube"
              name="youtube"
              ref={register}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

FileDownloadLinks.propTypes = {
  // register: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    cv1: PropTypes.shape({
      message: PropTypes.string,
      type: PropTypes.string,
    }),
    cv2: PropTypes.shape({
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
