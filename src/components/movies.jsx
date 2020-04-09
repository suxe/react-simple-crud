import React, { Component } from "react"
import { getMovies, deleteMovie } from "../services/fakeMovieService"
import { getGenres } from "../services/fakeGenreService"
import Pagination from "./pagination"
import { paginate, orderTable } from "../utils/dataFilters"
import ListGroup from "./listGroup"
import MoviesTable from "./moviesTable"
import { Link } from "react-router-dom"

class Movies extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageSize: 4,
      currentPage: 1,
      movies: [],
      genres: [],
      selectedGenre: null,
      sortColumn: { path: "title", order: "asc" },
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

  handleDelete = (id) => {
    deleteMovie(id)
    this.handleGenreSelect(this.state.selectedGenre)
  }

  textInfo = (movies) => {
    const { selectedGenre } = this.state

    if (selectedGenre !== null) {
      movies = getMovies().filter((m) => m.genre._id === selectedGenre)
    }

    return movies.length > 0
      ? `Showing ${movies.length} movies in the database`
      : "There are no movies in the database"
  }

  handleLike = (movie) => {
    const movies = [...this.state.movies]
    const index = movies.indexOf(movie)
    movies[index].liked = !movies[index].liked
    // movies.map(m => (m._id === movie._id ? (m.liked = !movie.liked) : null));
    this.setState({ moveies: movies })
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page })
  }

  handleGenreSelect = (genreId) => {
    this.setState({
      selectedGenre: genreId,
      currentPage: 1,
    })
  }

  handleSort = (sortColumn, _e) => {
    this.setState({ sortColumn })
  }

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
    } = this.state

    const filtered = selectedGenre
      ? allMovies.filter((m) => m.genre._id === selectedGenre)
      : allMovies

    const orderedMovies = orderTable(
      filtered,
      sortColumn.path,
      sortColumn.order
    )

    const movies = paginate(orderedMovies, currentPage, pageSize)

    return {
      totalCount: filtered.length,
      data: movies,
    }
  }

  render() {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      genres: allGenres,
      selectedGenre,
      sortColumn,
    } = this.state

    // Filtering, sorting, pagination
    const { totalCount, data: movies } = this.getPagedData()

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
            <Link to="/movies/new" className="btn btn-dark m-1">
              New Movie
            </Link>
            <h5 className="m-2">{this.textInfo(allMovies)}</h5>
            {totalCount > 0 && (
              <React.Fragment>
                <MoviesTable
                  movies={movies}
                  onLike={this.handleLike}
                  onDelete={this.handleDelete}
                  onSort={this.handleSort}
                  sortBy={sortColumn}
                />
                <Pagination
                  itemsCount={totalCount}
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
