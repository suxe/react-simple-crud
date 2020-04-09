import React from "react"
import Form from "./form"
import Joi from "@hapi/joi"

class RegisterForm extends Form {
  state = {
    data: { email: "", password: "", name: "" },
    errors: {},
    schemaRules: {
      email: Joi.string()
        .trim()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required()
        .label("Email"),
      password: Joi.string().min(3).required().label("Password"),
      name: Joi.string().min(3).required().label("Name"),
    },
  }

  schema = Joi.object(this.state.schemaRules)

  doSubmit = () => {
    console.log("submitted")
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

export default RegisterForm
