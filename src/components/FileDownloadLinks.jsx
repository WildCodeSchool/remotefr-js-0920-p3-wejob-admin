import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
// import ImageCropper from './ImageCropper';
// import ImageCropper from './ImageCropper';
// import Modal from './widgetsFormField/ModalHelp';
import AcceptFile from './AcceptFile';

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

  useEffect(() => {
    if (!userPhoto) return;
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setUrlPhoto(fileReader.result);
    };
    fileReader.readAsDataURL(userPhoto);
  }, [userPhoto]);

  // const handleChangePhoto = (event) => {
  //   setUserPhoto(event.target.files[0]);
  //   // <ImageCropper inputImg={setUserPhoto} />;
  // };

  const onSubmit = (event) => {
    handleSubmit(event);
    handleSubmitFiles({ cv1: Cv1File, cv2: Cv2File, picture: userPhoto });
  };

  return (
    <form
      method="post"
      action="#"
      className="FileDownloadLinks container"
      id="FileDownloadLinks"
      onSubmit={onSubmit}
    >
      <div className="row">
        {/* cv1 */}
        <div className="col-md-6">
          <AcceptFile
            btnLabel="CV 1 (pdf)"
            ext="pdf"
            accept="application/pdf"
            onDrop={([f]) => setCvFile(f)}
          />
        </div>

        {/* cv2 */}
        <div className="col-md-6">
          <AcceptFile
            btnLabel="CV 2 (pdf)"
            ext="pdf"
            accept="application/pdf"
            onDrop={([f]) => setCv2File(f)}
          />
        </div>

        {/* picture upload */}
        <div className="col-md-6">
          <AcceptFile
            btnLabel="Photo (png ou jpg)"
            ext="png, jpg et jpeg"
            accept="image/jpeg, image/png"
            onDrop={([f]) => setUserPhoto(f)}
          />
          {/* <Modal content={<ImageCropper inputImg={urlPhoto} />} /> */}
          {errors.userPhoto && (
            <span className="spanError">{errors.userPhoto.message}</span>
          )}
        </div>

        {/* picture preview */}
        <div className="col-md-6">
          {urlPhoto && (
            <img
              src={urlPhoto}
              alt="upload preview"
              className="FileDownloadLinks-preview"
            />
          )}
        </div>

        {/* LinkedIn & YouTube */}
        <div className="col-md-6 mt-5">
          <label htmlFor="linkedin" className="form-label fw-bold text-primary">
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
        <div className="col-md-6 mt-5">
          <label htmlFor="youtube" className="form-label fw-bold text-primary">
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
  );
}

FileDownloadLinks.propTypes = {
  register: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleSubmitFiles: PropTypes.func.isRequired,
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
