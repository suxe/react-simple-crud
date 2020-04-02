import React from "react"
import Like from "./like"
import { PropTypes } from "prop-types"

const MoviesTable = props => {
  // updateSortDir = column => {
  //   const { sortDir } = this.state

  //   switch (sortDir[column]) {
  //     case "":
  //       sortDir[column] = "asc"
  //       break
  //     case "asc":
  //       sortDir[column] = "desc"
  //       break
  //     case "desc":
  //       sortDir[column] = ""
  //       break
  //     default:
  //       sortDir[column] = ""
  //   }

  //   this.setState({ sortDir })
  // }

  // <span>&#8593;</span>
  // <span>&#8595;</span>

  const { movies, onLike, onDelete, onSort, sortBy } = props

  const updateSortSymbol = column => {
    let symbol = ""
    if (column === sortBy[0]) {
      switch (sortBy[1]) {
        case "asc":
          symbol = <span>&#8593;</span>
          break
        case "desc":
          symbol = <span>&#8595;</span>
          break
        default:
          symbol = ""
      }
    }
    return symbol
  }

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th onClick={_e => onSort("title", _e)}>
            {updateSortSymbol("title")}
            Title
          </th>
          <th onClick={_e => onSort("genre.name", _e)}>
            {updateSortSymbol("genre.name")}
            Genre
          </th>
          <th onClick={_e => onSort("numberInStock", _e)}>
            {updateSortSymbol("numberInStock")}
            Stock
          </th>
          <th onClick={_e => onSort("dailyRentalRate", _e)}>
            {updateSortSymbol("dailyRentalRate")}
            Rate
          </th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {movies.map(movie => (
          <tr key={movie._id}>
            <th scope="row">{movie.title}</th>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td>
              <Like
                active={movie.liked || false}
                onLike={_e => onLike(movie)}
              />
            </td>
            <td>
              <button
                className="btn btn-danger btn-sm"
                onClick={_e => onDelete(movie._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

MoviesTable.propTypes = {
  movies: PropTypes.array.isRequired,
  onLike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  sortBy: PropTypes.array.isRequired
}

export default MoviesTable
