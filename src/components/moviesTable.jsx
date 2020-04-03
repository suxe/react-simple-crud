import React, { Component } from "react"
import TableHeader from "./tableHeader"
import TableBody from "./tableBody"
import PropTypes from "prop-types"

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    { key: "like" },
    { key: "delete" }
  ]

  raiseSort = path => {
    const { sortBy } = this.props
    let sortColumn = {}
    sortColumn.path = path
    sortColumn.order = sortBy.order === "asc" ? "desc" : "asc"
    // this raises the method to his parent component
    this.props.onSort(sortColumn)
  }

  render() {
    const { movies, onLike, onDelete, sortBy } = this.props

    return (
      <table className="table table-hover">
        <TableHeader
          columns={this.columns}
          sortBy={sortBy}
          onSort={this.raiseSort}
        />
        <TableBody items={movies} onLike={onLike} onDelete={onDelete} />
      </table>
    )
  }
}

MoviesTable.propTypes = {
  movies: PropTypes.array.isRequired,
  onLike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  sortBy: PropTypes.object.isRequired
}

export default MoviesTable
