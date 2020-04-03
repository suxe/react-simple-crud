import React from "react"
import PropTypes from "prop-types"

const TableHeader = props => {
  const updateSymbol = column => {
    let symbol = ""
    if (column === props.sortBy.path) {
      symbol =
        props.sortBy.order === "asc" ? (
          <span>&#8593;</span>
        ) : (
          <span>&#8595;</span>
        )
    }
    return symbol
  }

  return (
    <thead>
      <tr>
        {props.columns.map(col => (
          <th
            key={col.path || col.key}
            style={{ cursor: "pointer" }}
            onClick={_e => props.onSort(col.path, _e)}
          >
            {updateSymbol(col.path)}
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  )
}

TableHeader.propTypes = {
  columns: PropTypes.array.isRequired,
  sortBy: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired
}

export default TableHeader
