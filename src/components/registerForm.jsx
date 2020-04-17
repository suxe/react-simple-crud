import React from "react"
import Form from "./form"
import { withRouter } from "react-router-dom"
import Joi from "@hapi/joi"
import * as userService from "../services/userService"
import auth from "../services/authService"

class RegisterForm extends Form {
  state = {
    data: {
      email: "",
      password: "",
      name: "",
    },
    errors: {},
    schemaRules: {
      email: Joi.string()
        .trim()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required()
        .label("Email"),
      password: Joi.string().min(5).required().label("Password"),
      name: Joi.string().min(3).required().label("Name"),
    },
  }

  schema = Joi.object(this.state.schemaRules)

  doSubmit = async () => {
    try {
      const { headers } = await userService.register(this.state.data)
      auth.loginWithJwt(headers["x-auth-token"])
      window.location = "/"
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors }
        errors.email = ex.response.data
        this.setState({ errors })
      }
    }
  }

  render() {
    return (
      <>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}

          {this.renderButton("Register")}
        </form>
      </>
    )
  }
}

export default withRouter(RegisterForm)
