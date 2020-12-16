import React from 'react';
import PropTypes from 'prop-types';

function InputFormField(props) {
  const { label, name, type, className, register } = props;
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
        <input
          type={type}
          className={className}
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
  className: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
};

export default InputFormField;
