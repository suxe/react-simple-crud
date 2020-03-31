import React, { Component } from "react";
import {
  getAllMovies,
  getMovies,
  deleteMovie
} from "../services/fakeMovieService";
import Like from "./like";
import Pagination from "./pagination";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        current: 1,
        perPage: 3,
        total: getAllMovies().length,
        pages: getAllMovies().length / 3
      },
      movies: []
    };
  }

  componentDidMount() {
    const { pagination } = this.state;
    this.getMovies(0, pagination.perPage);
    // this.createPagination();
  }

  getMovies = (from, to) => {
    const movies = getMovies(from, to);
    this.setState({ movies });
    console.log(movies);
    return movies;
  };

  handleDelete = id => {
    // const updatedMovies = this.state.movies.filter(movie => movie._id !== id);
    const updatedMovies = deleteMovie(id);
    this.setState({ moveies: updatedMovies });
    this.handlePaginate(this.state.pagination.current);
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

  handlePaginate = page => {
    const { pagination } = this.state;
    const from = (page - 1) * 3;
    const to = from + pagination.perPage;
    console.log("from: ", from);
    console.log("to: ", to);
    // console.log(pagination);
    const movies = this.getMovies(from, to);
    console.log(movies);

    pagination.current = page;

    // const newPagination = {
    //   perpage: 3,
    //   current: page,
    //   total: movies.length,
    //   pages: movies.length / 3
    // };

    this.setState({
      movies,
      pagination
    });
  };

  createPagination = () => {
    // we use setState with callback because we need get movies first
    this.setState((state, props) => ({
      pagination: {
        perpage: 3,
        total: state.movies.length,
        current: 3,
        pages: state.movies.length / 3
      }
    }));
  };

  render() {
    const { movies } = this.state;
    const { pagination } = this.state;
    return (
      <React.Fragment>
        <h5 className="m-2">{this.textInfo()}</h5>
        {movies.length > 0 && (
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
              pages={pagination.pages}
              current={pagination.current}
              onPaginate={this.handlePaginate}
            />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default Movies;
