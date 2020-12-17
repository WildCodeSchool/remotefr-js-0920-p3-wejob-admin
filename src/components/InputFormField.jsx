import React from 'react';
import PropTypes from 'prop-types';

function InputFormField(props) {
  const { label, name, type, register } = props;
  const classNamediv = type === 'text' ? 'form-group' : 'form-check-inline';
  const classNameInput =
    type === 'text' ? 'form-field-input' : 'form-field-input-radio-inline';
  return (
    <div className={classNamediv}>
      <label htmlFor={name} className="form-field-label">
        {label}
        <input
          type={type}
          className={classNameInput}
          id={name}
          name={name}
          ref={register}
        />
      </label>
    </div>
  );
}

InputFormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
};

export default InputFormField;
