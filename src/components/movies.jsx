import React, { Component } from "react"
import { getMovies, deleteMovie } from "../services/movieService"
import { getGenres } from "../services/genreService"
import Pagination from "./pagination"
import { paginate, orderTable } from "../utils/dataFilters"
import ListGroup from "./listGroup"
import MoviesTable from "./moviesTable"
import { Link } from "react-router-dom"
import Search from "./search"
import { toast } from "react-toastify"

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
      searchQuery: "",
      moviesTextInfo: "",
    }
  }

  componentDidMount() {
    this.getMovies()
    this.getGenres()
  }

  getMovies = async () => {
    const { data: movies } = await getMovies()
    this.setState({ movies })
  }

  getGenres = async () => {
    // Add all genres item
    const { data } = await getGenres()
    const genres = [{ _id: null, name: "All Genres" }, ...data]
    this.setState({ genres })
  }

  handleDelete = async (id) => {
    // optimistic deleting
    const originalMovies = this.state.movies
    const movies = originalMovies.filter((m) => m._id !== id)
    this.setState({ movies, selectedGenre: null, currentPage: 1 })

    try {
      await deleteMovie(id)
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("this movie has been already deleted")

      // If error, undo changes
      this.setState({ movies: originalMovies })
    }
  }

  // textInfo = (movies) => {
  //   const { selectedGenre } = this.state

  //   if (selectedGenre !== null) {
  //     movies = getMovies().filter((m) => m.genre._id === selectedGenre)
  //     // movies = this.state.movies.filter((m) => m.genre._id === selectedGenre)
  //   }

  //   return movies.length > 0
  //     ? `Showing ${movies.length} movies in the database`
  //     : "There are no movies in the database"
  // }

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

  handleGenreSelect = async (genreId) => {
    const { data: movies } = await getMovies()
    this.setState({
      selectedGenre: genreId,
      currentPage: 1,
      movies,
      searchQuery: "",
    })
  }

  handleSort = (sortColumn, _e) => {
    this.setState({ sortColumn })
  }

  handleSearch = (query) => {
    this.setState({
      selectedGenre: null,
      currentPage: 1,
      searchQuery: query,
    })
  }

  getPagedData = () => {
    let {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state

    if (searchQuery) {
      // const { data: allMovies } = getMovies()
      allMovies = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery)
      )
    }

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
      searchQuery,
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
            {/* <h5 className="m-2">{this.textInfo(allMovies)}</h5>1 */}
            <h5 className="m-2">{`There are ${allMovies.length} movies in total`}</h5>

            <Search value={searchQuery} onSearch={this.handleSearch} />

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
