/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import AcceptFileStatus from './AcceptFileStatus';

function AcceptFile({ accept, ext, btnLabel, onDrop }) {
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
  } = useDropzone({
    onDropAccepted: onDrop,
    accept,
    maxFiles: 1,
  });

  return (
    <section className="AcceptFile">
      <div {...getRootProps({ className: 'AcceptFile-dropzone' })}>
        <input {...getInputProps()} />
        <p>Glissez &amp; déposez ou cliquez.</p>
        <p>
          <em>(fichiers acceptés : {ext})</em>
        </p>
        <span className="btn btn-primary btn-large">
          <span className="icon-upload" />
          {btnLabel}
        </span>
      </div>
      <aside className="AcceptFile-status">
        {acceptedFiles.length > 0 && (
          <AcceptFileStatus file={acceptedFiles[0]} success />
        )}
        {fileRejections.length > 0 && acceptedFiles.length === 0 && (
          <>
            <AcceptFileStatus file={fileRejections[0].file} />
          </>
        )}
      </aside>
    </section>
  );
}

AcceptFile.propTypes = {
  accept: PropTypes.string.isRequired,
  ext: PropTypes.string.isRequired,
  btnLabel: PropTypes.string.isRequired,
  onDrop: PropTypes.func.isRequired,
};

export default AcceptFile;
