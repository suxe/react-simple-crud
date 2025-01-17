import React, { Component } from "react"
import Table from "./table"
import Like from "./like"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import auth from "../services/authService"

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like
          active={movie.liked || false}
          onLike={(_e) => this.props.onLike(movie)}
        />
      ),
    },
  ]

  deleteColumn = {
    key: "delete",
    content: (movie) => (
      <button
        className="btn btn-danger btn-sm"
        style={{ cursor: "pointer" }}
        onClick={(_e) => this.props.onDelete(movie._id)}
      >
        Delete
      </button>
    ),
  }

  constructor() {
    super()
    const user = auth.getCurrentUser()
    if (user && user.isAdmin) this.columns.push(this.deleteColumn)
  }

  raiseSort = (path) => {
    const { sortBy } = this.props
    let sortColumn = {}
    sortColumn.path = path
    sortColumn.order = sortBy.order === "asc" ? "desc" : "asc"
    // this raises the method to his parent component
    this.props.onSort(sortColumn)
  }

  render() {
    const { movies, sortBy } = this.props

    return (
      <Table
        data={movies}
        columns={this.columns}
        sortBy={sortBy}
        onSort={this.raiseSort}
      />
    )
  }
}

MoviesTable.propTypes = {
  movies: PropTypes.array.isRequired,
  onLike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  sortBy: PropTypes.object.isRequired,
}

export default MoviesTable
