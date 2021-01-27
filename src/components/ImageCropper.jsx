import React, { useState, useCallback } from 'react';
import Slider from '@material-ui/core/Slider';
import Cropper from 'react-easy-crop';
import PropTypes from 'prop-types';

const ImageCropper = ({ inputImg }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    // eslint-disable-next-line no-console
    console.log(croppedArea, croppedAreaPixels);
  }, []);

  return (
    <div>
      <div className="cropper">
        <Cropper
          image={inputImg}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className="controls">
        <Slider
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={() => setZoom(zoom)}
          classes={{ container: 'slider' }}
        />
      </div>
    </div>
  );
};

ImageCropper.propTypes = {
  inputImg: PropTypes.string.isRequired,
};

export default ImageCropper;
