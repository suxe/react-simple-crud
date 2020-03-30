import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import Like from "./like";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    this.getMovies();
  }

  getMovies = () => {
    const movies = getMovies();
    this.setState({ movies });
  };

  handleDelete = id => {
    // const updatedMovies = this.state.movies.filter(movie => movie._id !== id);
    const updatedMovies = deleteMovie(id);
    this.setState({ moveies: updatedMovies });
  };

  textInfo = () => {
    const { movies } = this.state;
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

  render() {
    const { movies } = this.state;
    return (
      <React.Fragment>
        <h5 className="m-2">{this.textInfo()}</h5>
        {movies.length > 0 && (
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
        )}
      </React.Fragment>
    );
  }
}

export default Movies;
