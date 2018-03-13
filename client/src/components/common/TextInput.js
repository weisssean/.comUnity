import React from "react";
import PropTypes from 'prop-types';

const TextInput = ({name, label, type, onChange, placeholder, value, rows, error}) => {
  let wrapperClass = 'form-group';
  if (error && error.length > 0) {
    wrapperClass += " " + 'has-error';
  }
  const _type = type ? type : "text";
  const _rows = rows ? rows : "1";
  let _input;
  {
    if (_type === "textarea") {
      _input = (<textarea
        name={name}
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={_rows}
      />);
    } else {
      _input = (<input
        type={_type}
        name={name}
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={_rows}
      />);
    }
  }


  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        {_input}
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  rows: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string
};

export default TextInput;
