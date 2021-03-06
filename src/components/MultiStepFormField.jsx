import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './MultiStepFormField.css';

// his function is used to get the name of the className
// used for the style of the form step buttons
const getTopNavStyles = (indx, length, errors = []) => {
  const styles = [];
  for (let i = 0; i < length; i += 1) {
    if (i < indx) {
      styles.push(errors[i] ? 'warning li' : 'done li');
    } else if (i === indx) {
      styles.push('doing li');
    } else if (i > indx) {
      styles.push('todo li');
    }
  }
  return styles;
};

// this function displays the necessary buttons depending
// on the step of the form
const getButtonsState = (indx, length) => {
  if (indx > 0 && indx < length - 1) {
    return {
      showPreviousBtn: true,
      showNextBtn: true,
      showValidateBtn: false,
    };
  }
  if (indx === 0) {
    return {
      showPreviousBtn: false,
      showNextBtn: true,
      showValidateBtn: false,
    };
  }
  return {
    showPreviousBtn: true,
    showNextBtn: false,
    showValidateBtn: true,
  };
};

const renderStepState = (stylesState, i, errors) => {
  if (stylesState[i] === 'done li') return <span>ok</span>;
  if (stylesState[i] === 'warning li')
    return (
      <>
        <span className="icon-notification" />
        <span className="errors-pill rounded-circle bg-danger">
          {errors[i]}
        </span>
      </>
    );
  return <span>{i + 1}</span>;
};

function MultiStepFormField({ steps, compState, setComp, stepErrors }) {
  const [stylesState, setStyles] = useState(getTopNavStyles(0, steps.length));
  const [buttonsState, setButtons] = useState(getButtonsState(0, steps.length));

  const setStepState = (indx) => {
    setStyles(getTopNavStyles(Number(indx), steps.length, stepErrors));
    setComp(indx < steps.length ? Number(indx) : compState);
    setButtons(getButtonsState(Number(indx), steps.length));
  };

  useEffect(() => {
    setStepState(compState);
  }, [compState]);

  const previous = () =>
    setStepState(compState > 0 ? compState - 1 : compState);

  const handleOnClick = (evt) => {
    if (
      evt.currentTarget.value === steps.length - 1 &&
      compState === steps.length - 1
    ) {
      setStepState(steps.length);
    } else {
      setStepState(evt.currentTarget.value);
    }
  };

  const renderSteps = () =>
    steps.map((s, i) => (
      <li className="step" key={s.name}>
        <p className="nameRenderStep">{s.name}</p>
        <button
          type="button"
          className={stylesState[i]}
          onClick={handleOnClick}
          value={i}
        >
          {renderStepState(stylesState, i, stepErrors)}
        </button>
      </li>
    ));

  const renderNav = () => (
    <div className="row justify-content-center style-button-renderNav">
      <button
        type="button"
        className={
          buttonsState.showPreviousBtn
            ? 'display mx-auto col-3'
            : 'displayNone mx-auto col-3'
        }
        onClick={previous}
      >
        Précédent
      </button>

      <button
        type="submit"
        className={
          buttonsState.showNextBtn
            ? 'display mx-auto col-3'
            : 'displayNone mx-auto col-3'
        }
        form={steps[compState].nameForm}
      >
        Valider et poursuivre
      </button>
    </div>
  );

  return (
    <div className="MultiStep">
      <div className="wj-container">
        <ul className="wj-progress-bar">{renderSteps()}</ul>
      </div>
      <div className="wj-container">{steps[compState].component}</div>
      <div className="wj-container mt-3">{renderNav()}</div>
    </div>
  );
}

MultiStepFormField.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.shape).isRequired,
  compState: PropTypes.number.isRequired,
  setComp: PropTypes.func.isRequired,
};

export default MultiStepFormField;
