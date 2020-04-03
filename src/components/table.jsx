import React, { Component } from "react"
import TableHeader from "./tableHeader"
import TableBody from "./tableBody"
import PropTypes from "prop-types"

class Table extends Component {
  render() {
    const { data, columns, sortBy, onSort } = this.props
    return (
      <table className="table table-hover">
        <TableHeader columns={columns} sortBy={sortBy} onSort={onSort} />
        <TableBody data={data} columns={columns} />
      </table>
    )
  }
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  sortBy: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired
}

export default Table
