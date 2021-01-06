import React from 'react';
import PropTypes from 'prop-types';

function TextAreaFromField(props) {
  const { label, name, type, register } = props;
  const classNamediv = type !== 'radio' ? 'form-group' : 'form-check-inline';
  const classNameInput =
    type !== 'radio' ? 'form-field-input' : 'form-field-input-radio-inline';
  return (
    <div className={classNamediv}>
      <label htmlFor={name} className="form-field-label">
        {label}
        <textarea
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

TextAreaFromField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
};

export default TextAreaFromField;
