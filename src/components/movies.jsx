import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "./like";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./listGroup";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 4,
      currentPage: 1,
      movies: [],
      genres: [],
      selectedGenre: null
    };
  }

  componentDidMount() {
    this.getMovies();
    this.getGenres();
  }

  getMovies = () => {
    const movies = getMovies();
    this.setState({ movies });
  };

  getGenres = () => {
    // Add all genres item
    const genres = [{ _id: null, name: "All Genres" }, ...getGenres()];
    this.setState({ genres });
  };

  handleDelete = id => {
    deleteMovie(id);
    this.handleGenreSelect(this.state.selectedGenre);
  };

  textInfo = movies => {
    const { selectedGenre } = this.state;

    if (selectedGenre !== null) {
      movies = getMovies().filter(m => m.genre._id === selectedGenre);
    }

    return movies.length > 0
      ? `Showing ${movies.length} movies in the database`
      : "There are no movies in the database";
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    // movies.map(m => (m._id === movie._id ? (m.liked = !movie.liked) : null));
    this.setState({ moveies: movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genreId => {
    this.setState({
      selectedGenre: genreId,
      currentPage: 1
    });
  };

  render() {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      genres: allGenres,
      selectedGenre
    } = this.state;

    const filtered = selectedGenre
      ? allMovies.filter(m => m.genre._id === selectedGenre)
      : allMovies;

    const movies = paginate(filtered, currentPage, pageSize);

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
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Genre</th>
                      <th scope="col">Stock</th>
                      <th scope="col">Rate</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
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
                            onLike={_e => this.handleLike(movie)}
                          />
                        </td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => this.handleDelete(movie._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
    );
  }
}

export default Movies;
