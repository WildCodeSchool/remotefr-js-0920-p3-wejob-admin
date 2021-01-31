import React, { useState, useEffect, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import PropTypes from 'prop-types';
import styles from '../asset/css/ImageCropper.module.css';

const ImageCropper = ({ inputImg }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [initialCroppedAreaPixels, setInitialCroppedAreaPixels] = useState(
    undefined,
  );
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const croppedAreaPixels = JSON.parse(
      window.localStorage.getItem('croppedAreaPixels'),
    );
    setInitialCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    // eslint-disable-next-line no-console
    console.log(croppedArea, croppedAreaPixels);
    window.localStorage.setItem(
      'croppedAreaPixels',
      JSON.stringify(croppedAreaPixels),
    );
  }, []);

  return (
    <div className="containerModal">
      <div className={styles.containerCrop}>
        <div className={styles.cropContainer}>
          <Cropper
            image={inputImg}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            initialCroppedAreaPixels={initialCroppedAreaPixels}
          />
        </div>
      </div>
    </div>
  );
};

ImageCropper.defaultProps = {
  inputImg: null,
};

ImageCropper.propTypes = {
  inputImg: PropTypes.string,
};

export default ImageCropper;
