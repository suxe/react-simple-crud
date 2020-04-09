import React from "react"
import { PropTypes } from "prop-types"

/*
 * We have extracted the attributes with the same key=value as ...rest.
 * Compare the commented code with the new one, is nicer
 */
const Select = ({ name, label, options, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        {...rest}
        name={name}
        id={name}
        className={`form-control ${error ? "is-invalid" : ""}`}
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && (
        <small className="form-text text-muted text-danger">{error}</small>
      )}
    </div>
  )
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Select
