import React from "react"
import Joi from "@hapi/joi"
import Form from "./form"
import { login } from "../services/authService"

class LoginForm extends Form {
  state = {
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

  schema = Joi.object(this.state.schemaRules)

  doSubmit = async () => {
    const { data } = this.state
    await login(data.email, data.password)
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

export default LoginForm
