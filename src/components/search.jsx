import React from "react"

const Search = ({ value, onSearch }) => {
  return (
    <div className="form-group">
      <input
        onChange={(_e) => onSearch(_e.target.value.toLocaleLowerCase())}
        value={value}
        type="text"
        className="form-control"
      />
    </div>
  )
}

export default Search
