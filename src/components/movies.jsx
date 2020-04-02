import React, { Component } from "react"
import { getMovies, deleteMovie } from "../services/fakeMovieService"
import { getGenres } from "../services/fakeGenreService"
import Pagination from "./pagination"
import { paginate, orderTable } from "../utils/paginate"
import ListGroup from "./listGroup"
import MoviesTable from "./moviesTable"

class Movies extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageSize: 4,
      currentPage: 1,
      movies: [],
      genres: [],
      selectedGenre: null,
      tableOrder: ["title", "desc"]
    }
  }

  componentDidMount() {
    this.getMovies()
    this.getGenres()
  }

  getMovies = () => {
    const movies = getMovies()
    this.setState({ movies })
  }

  getGenres = () => {
    // Add all genres item
    const genres = [{ _id: null, name: "All Genres" }, ...getGenres()]
    this.setState({ genres })
  }

  handleDelete = id => {
    deleteMovie(id)
    this.handleGenreSelect(this.state.selectedGenre)
  }

  textInfo = movies => {
    const { selectedGenre } = this.state

    if (selectedGenre !== null) {
      movies = getMovies().filter(m => m.genre._id === selectedGenre)
    }

    return movies.length > 0
      ? `Showing ${movies.length} movies in the database`
      : "There are no movies in the database"
  }

  handleLike = movie => {
    const movies = [...this.state.movies]
    const index = movies.indexOf(movie)
    movies[index].liked = !movies[index].liked
    // movies.map(m => (m._id === movie._id ? (m.liked = !movie.liked) : null));
    this.setState({ moveies: movies })
  }

  handlePageChange = page => {
    this.setState({ currentPage: page })
  }

  handleGenreSelect = genreId => {
    this.setState({
      selectedGenre: genreId,
      currentPage: 1
    })
  }

  handleSort = (path, _e) => {
    console.log(path)
    const { tableOrder } = this.state
    tableOrder[0] = path
    switch (tableOrder[1]) {
      case "":
        tableOrder[1] = "asc"
        break
      case "asc":
        tableOrder[1] = "desc"
        break
      case "desc":
        tableOrder[1] = ""
        break
      default:
        tableOrder[1] = ""
    }

    this.setState({ tableOrder })
  }

  render() {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      genres: allGenres,
      selectedGenre,
      tableOrder
    } = this.state

    const filtered = selectedGenre
      ? allMovies.filter(m => m.genre._id === selectedGenre)
      : allMovies

    const movies = paginate(filtered, currentPage, pageSize)
    const orderedMovies = orderTable(movies, tableOrder[0], tableOrder[1])

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-2">
            <ListGroup
              items={allGenres}
              selectedItem={selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <h5 className="m-2">{this.textInfo(allMovies)}</h5>
            {filtered.length > 0 && (
              <React.Fragment>
                <MoviesTable
                  movies={orderedMovies}
                  onLike={this.handleLike}
                  onDelete={this.handleDelete}
                  onSort={this.handleSort}
                  sortBy={tableOrder}
                />
                <Pagination
                  itemsCount={filtered.length}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={this.handlePageChange}
                />
              </React.Fragment>
            )}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Movies
