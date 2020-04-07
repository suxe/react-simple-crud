import React from "react"
import { PropTypes } from "prop-types"

const Input = ({ name, value, label, type, errors, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        onChange={onChange}
        name={name}
        value={value}
        id={name}
        type={type}
        className={`form-control ${errors ? "is-invalid" : ""}`}
      />
      {errors && (
        <small className="form-text text-muted text-danger">{errors}</small>
      )}
    </div>
  )
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Input
