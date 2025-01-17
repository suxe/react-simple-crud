import React from "react"
import { PropTypes } from "prop-types"

// const Input = ({ name, value, label, type, error, onChange }) => {
//   return (
//     <div className="form-group">
//       <label htmlFor={name}>{label}</label>
//       <input
//         onChange={onChange}
//         name={name}
//         value={value}
//         type={type}
//         id={name}
//         className={`form-control ${error ? "is-invalid" : ""}`}
//       />
//       {error && (
//         <small className="form-text text-muted text-danger">{error}</small>
//       )}
//     </div>
//   )
// }

/*
 * We have extracted the attributes with the same key=value as ...rest.
 * Compare the commented code with the new one, is nicer
 */
const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        name={name}
        id={name}
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
  value: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Input
