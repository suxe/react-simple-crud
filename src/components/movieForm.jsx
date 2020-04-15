import React from "react"
import Form from "./form"
import { withRouter } from "react-router-dom"
import { getMovie, saveMovie } from "../services/movieService"
import { getGenres } from "../services/genreService"
import Joi from "@hapi/joi"

class MovieForm extends Form {
  constructor(props) {
    super(props)

    this.state = {
      data: {
        // _id: "",
        title: "",
        genreId: "",
        numberInStock: "",
        dailyRentalRate: "",
      },
      errors: {},
      schemaRules: {
        // _id: Joi.string(),
        title: Joi.string().min(3).required().label("Title"),
        genreId: Joi.string().min(3).required().label("Genre"),
        numberInStock: Joi.number()
          .min(0)
          .max(100)
          .required()
          .label("Number in Stock"),
        dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
      },
      genreNames: [{ _id: 1, name: "random" }],
      pageTitle: "Create new movie", // movie: {},
    }

    this.schema = Joi.object(this.state.schemaRules)
  }

  async componentDidMount() {
    await this.getGenreNames()
    await this.populateMovie()
  }

  populateMovie = async () => {
    try {
      const { id } = this.props.match.params
      if (id === "new") return

      const { data: movie } = await getMovie(id)
      const data = this.mapToViewModel(movie)
      this.setState({ data, pageTitle: "Update movie" })
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/not-found")
    }
  }

  mapToViewModel = (movie) => {
    console.log(movie)
    let data = {
      ...this.state.data,
      ...movie,
      genreId: movie.genre._id,
    }
    delete data["genre"]
    return data
  }

  getGenreNames = async () => {
    const { data: genreNames } = await getGenres()
    genreNames.map((g) => {
      return {
        _id: g._id,
        name: g.name,
      }
    })
    this.setState({ genreNames })
  }

  doSubmit = async () => {
    await saveMovie(this.state.data)
    this.props.history.push("/movies")
  }

  render() {
    const { pageTitle } = this.state
    // const { title, genre, stock, rate } = this.state.data
    return (
      <>
        <h1>{pageTitle}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genreNames)}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}

          {this.renderButton("Save")}
        </form>
      </>
    )
  }
}

export default withRouter(MovieForm)
