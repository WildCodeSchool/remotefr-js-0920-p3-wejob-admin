import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './MultiStepFormField.css';

// his function is used to get the name of the className
// used for the style of the form step buttons
const getTopNavStyles = (indx, length) => {
  const styles = [];
  for (let i = 0; i < length; i += 1) {
    if (i < indx) {
      styles.push('done li');
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
  // eslint-disable-next-line no-console
  console.log('getButtonsState: indx', indx);
  if (indx > 0 && indx < length - 1) {
    // eslint-disable-next-line no-console
    console.log('getButtonsState: indx > 0 && indx < length - 1');
    return {
      showPreviousBtn: true,
      showNextBtn: true,
      // showSaveBtn: true,
      showValidateBtn: false,
    };
  }
  if (indx === 0) {
    // eslint-disable-next-line no-console
    console.log('getButtonsState: indx === 0');
    return {
      showPreviousBtn: false,
      showNextBtn: true,
      // showSaveBtn: true,
      showValidateBtn: false,
    };
  }
  return {
    showPreviousBtn: true,
    showNextBtn: false,
    // showSaveBtn: false,
    showValidateBtn: true,
  };
};

function MultiStepFormField({ steps }) {
  const [stylesState, setStyles] = useState(getTopNavStyles(0, steps.length));
  const [compState, setComp] = useState(0);
  const [buttonsState, setButtons] = useState(getButtonsState(0, steps.length));

  const setStepState = (indx) => {
    // eslint-disable-next-line no-console
    console.log('setStepState indx : ', indx);
    setStyles(getTopNavStyles(Number(indx), steps.length));
    setComp(indx < steps.length ? Number(indx) : compState);
    setButtons(getButtonsState(Number(indx), steps.length));
  };

  const next = () => {
    setStepState(compState + 1);
    steps.handleSubmit();
  };

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
        <p>{s.name}</p>
        <button
          type="button"
          className={stylesState[i]}
          onClick={handleOnClick}
          value={i}
        >
          <span>{stylesState[i] === 'done li' ? 'ok' : i + 1}</span>
        </button>
      </li>
    ));

  const renderNav = () => (
    <div>
      <button
        type="button"
        className={buttonsState.showPreviousBtn ? 'display' : 'displayNone'}
        onClick={previous}
      >
        Précédent
      </button>

      <button
        type="submit"
        className={buttonsState.showNextBtn ? 'display' : 'displayNone'}
        // onClick={next}
        form={steps[compState].nameForm}
      >
        Valider et poursuivre
      </button>

      <button
        type="button"
        className={buttonsState.showValidateBtn ? 'display' : 'displayNone'}
        onClick={next}
      >
        Valider vos réponses
      </button>
    </div>
  );

  return (
    <div className="MultiStep">
      <div className="container">
        <div className="progress-bar">{renderSteps()}</div>
      </div>
      <div>{steps[compState].component}</div>
      <div>{renderNav()}</div>
    </div>
  );
}

MultiStepFormField.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.shape).isRequired,
  // handleSubmit: PropTypes.func.isRequired,
};

export default MultiStepFormField;
