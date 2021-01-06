import React from 'react';
import PropTypes from 'prop-types';

function ButtonFormField(props) {
  const { label, name, register } = props;

  return (
    <div className="">
      <button type="button" className="" id={name} name={name} ref={register}>
        {label}
      </button>
    </div>
  );
}

ButtonFormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
};

export default ButtonFormField;
