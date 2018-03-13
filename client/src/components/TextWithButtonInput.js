import React from "react";
import PropTypes from 'prop-types';

import Fa from 'react-fontawesome';

const TextWithButtonInput = ({name, label, type, onChange, placeholder, value, rows, error,onClick}) => {
    let wrapperClass = 'form-group';
    if (error && error.length > 0) {
        wrapperClass += " " + 'has-error';
    }
    const _type = type ? type : "text";
    const _rows = rows ? rows : "1";

    return (
        <div className={`${wrapperClass}`}>
            <label htmlFor={name}>{label}</label>
            <div className={`form-inline`}>

                <div className="field mr-sm-2">
                    <input
                        type={_type}
                        name={name}
                        className="form-control"
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        rows={_rows}
                        style={{marginRight: "0.5rem"}}
                    />
                    <div className="btn btn-outline-primary my-2 my-sm-0" onClick={onClick}>
                        <Fa name="search"/>
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                </div>
            </div>
        </div>
    );
};

TextWithButtonInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string
};

export default TextWithButtonInput;
