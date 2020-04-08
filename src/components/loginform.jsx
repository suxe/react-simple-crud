import React from "react"
import Joi from "@hapi/joi"
import Form from "./Form"

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  }

  schema = Joi.object({
    username: Joi.string().min(3).required().label("User name"),
    password: Joi.string().min(3).required().label("Password"),
  })

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
