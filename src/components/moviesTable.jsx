import React, { Component } from "react"
import Like from "./like"
import { PropTypes } from "prop-types"

class MoviesTable extends Component {
  state = {
    sortDir: {
      title: "",
      genre: "",
      stock: "",
      rate: ""
    }
  }

  updateSortDir = column => {
    const { sortDir } = this.state

    switch (sortDir[column]) {
      case "":
        sortDir[column] = "asc"
        break
      case "asc":
        sortDir[column] = "desc"
        break
      case "desc":
        sortDir[column] = ""
        break
      default:
        sortDir[column] = ""
    }

    this.setState({ sortDir })
  }

  updateSortSymbol = sortDir => {
    let element = ""
    switch (sortDir) {
      case "asc":
        element = <span>&#8593;</span>
        break
      case "desc":
        element = <span>&#8595;</span>
        break
      default:
        element = ""
    }

    return element
  }

  render() {
    const { movies, onLike, onDelete, onSort } = this.props
    const { title, genre, stock, rate } = this.state.sortDir

    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th
              onClick={_e => {
                onSort("title", _e)
                this.updateSortDir("title")
              }}
            >
              {this.updateSortSymbol(title)}
              Title
            </th>
            <th
              onClick={_e => {
                onSort("genre.name", _e)
                this.updateSortDir("genre")
              }}
            >
              {this.updateSortSymbol(genre)}
              Genre
            </th>
            <th
              onClick={_e => {
                onSort("numberInStock", _e)
                this.updateSortDir("stock")
              }}
            >
              {this.updateSortSymbol(stock)}
              Stock
            </th>
            <th
              onClick={_e => {
                onSort("dailyRentalRate", _e)
                this.updateSortDir("rate")
              }}
            >
              {this.updateSortSymbol(rate)}
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
}

MoviesTable.propTypes = {
  movies: PropTypes.array.isRequired,
  onLike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default MoviesTable
