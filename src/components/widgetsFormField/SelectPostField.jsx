import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' }
// ]

function SelectPostField(props) {
  const { options, name, label } = props;
  return (
    <label htmlFor={name} className="form-field-label">
      {label}
      <Select options={options} />
    </label>
  );
}

SelectPostField.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ).isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default SelectPostField;
