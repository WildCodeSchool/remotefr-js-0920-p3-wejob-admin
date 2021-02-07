import React from 'react';
import '../asset/css/Loader.css';

function Loader() {
  return (
    <div className="container d-flex justify-content-center align-items-center mt-5 py-2">
      <div className="lds-roller">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}

export default Loader;
