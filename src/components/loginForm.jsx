import React from "react"
import Joi from "@hapi/joi"
import { withRouter } from "react-router-dom"
import Form from "./form"
import auth from "../services/authService"

class LoginForm extends Form {
  constructor(props) {
    super(props)
    this.state = {
      data: { email: "", password: "" },
      errors: {},
      schemaRules: {
        email: Joi.string()
          .trim()
          .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
          .required()
          .label("Email"),
        password: Joi.string().min(5).required().label("Password"),
      },
    }

    this.schema = Joi.object(this.state.schemaRules)
  }

  doSubmit = async () => {
    const { data } = this.state
    try {
      await auth.login(data.email, data.password)
      window.location = "/"
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors }
        errors.email = error.response.data
        this.setState({ errors })
      }
    }
  }

  render() {
    return (
      <>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("password", "Password", "password")}

          {this.renderButton("Login")}
        </form>
      </>
    )
  }
}

export default withRouter(LoginForm)
