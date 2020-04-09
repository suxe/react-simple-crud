import React from "react"
import Joi from "@hapi/joi"
import Form from "./form"

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
    schemaRules: {
      username: Joi.string().min(3).required().label("User name"),
      password: Joi.string().min(3).required().label("Password"),
    },
  }

  schema = Joi.object(this.state.schemaRules)

  doSubmit = () => {
    console.log("submitted")
  }

  render() {
    return (
      <>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "User name")}
          {this.renderInput("password", "Password", "password")}

          {this.renderButton("Login")}
        </form>
      </>
    )
  }
}

export default LoginForm
