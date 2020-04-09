import React from "react"
import Form from "./form"
import { withRouter } from "react-router-dom"
import { getMovie, saveMovie } from "../services/fakeMovieService"
import { getGenres } from "../services/fakeGenreService"
import Joi from "@hapi/joi"

class MovieForm extends Form {
  constructor(props) {
    super(props)

    this.state = {
      data: {
        _id: "",
        title: "",
        genreId: "",
        numberInStock: "",
        dailyRentalRate: "",
      },
      errors: {},
      schemaRules: {
        _id: Joi.string().min(3),
        title: Joi.string().min(3).required().label("Title"),
        genreId: Joi.string().min(3).required().label("Genre"),
        numberInStock: Joi.number()
          .min(0)
          .max(100)
          .required()
          .label("Number in Stock"),
        dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
      },
    }

    this.schema = Joi.object(this.state.schemaRules)
  }

  componentDidMount() {
    const { id } = this.props.match.params
    const existentMovie = getMovie(id)

    if (existentMovie) {
      let data = {
        ...this.state.data,
        ...existentMovie,
        genreId: existentMovie.genre._id,
      }
      delete data["genre"]

      this.setState({ data })
      // console.log(data)
    } else if (id === "new") {
      console.error("No Movie!")
      // create random _id
      const randomId = Math.random().toString(36).substring(2, 20) + "badId"
      const firstGenreId = getGenres()[0]._id
      this.setState({ data: { _id: randomId, genreId: firstGenreId } })
    } else {
      return this.props.history.push("/not-found")
    }
  }

  getGenreNames = () => {
    return getGenres().map((g) => {
      return {
        id: g._id,
        name: g.name,
      }
    })
  }

  doSubmit = () => {
    saveMovie(this.state.data)
    return this.props.history.push("/movies")
  }

  render() {
    const { movie } = this.state
    console.log(movie)
    // const { title, genre, stock, rate } = this.state.data
    return (
      <>
        <h1>{movie ? "Update movie" : "Create new movie"}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.getGenreNames())}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}

          {this.renderButton("Save")}
        </form>
      </>
    )
  }
}

export default withRouter(MovieForm)
