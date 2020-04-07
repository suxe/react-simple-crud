import React from "react"
import { PropTypes } from "prop-types"

const Input = ({ name, value, label, type, error, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        onChange={onChange}
        name={name}
        value={value}
        id={name}
        type={type}
        className={`form-control ${error ? "is-invalid" : ""}`}
      />
      {error && (
        <small className="form-text text-muted text-danger">{error}</small>
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
