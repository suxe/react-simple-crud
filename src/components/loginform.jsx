import React, { Component } from "react"
import Joi from "@hapi/joi"
import Input from "./input"

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  }

  schema = Joi.object({
    username: Joi.string().min(3).required().label("User name"),
    password: Joi.string().min(3).required().label("Password"),
  })

  validate = () => {
    let errors = {}
    const options = { abortEarly: false }
    const { error } = this.schema.validate(this.state.account, options)

    if (error && error.details.length > 0)
      error.details.map((err) => (errors[err.path[0]] = err.message))

    return errors
  }

  handleSubmit = (_e) => {
    _e.preventDefault()

    const errors = this.validate()
    this.setState({ errors })

    if (Object.keys(errors).length > 0) return

    console.log("submitted")
  }

  validateProperty = ({ name, value }) => {
    let errorMessage = ""
    let label = name === "username" ? "User name" : "Password"

    const { error } = Joi.string()
      .min(3)
      .required()
      .label(label)
      .validate(value)

    if (error) errorMessage = error.message

    return errorMessage
  }

  handleInputChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors }
    const error = this.validateProperty(input)
    errors[input.name] = error

    const account = { ...this.state.account }
    account[input.name] = input.value

    this.setState({ account, errors })
  }

  buttonStatus = () => {
    const { errors } = this.state

    if (
      Object.keys(errors).length === 0 ||
      errors.password !== "" ||
      errors.username !== ""
    )
      return true

    return false
  }

  render() {
    const { account, errors } = this.state
    return (
      <>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name={"username"}
            value={account.username}
            label={"Name"}
            type={"text"}
            error={errors.username}
            onChange={this.handleInputChange}
          />
          <Input
            name={"password"}
            value={account.password}
            label={"Password"}
            type={"password"}
            error={errors.password}
            onChange={this.handleInputChange}
          />
          <button className="btn btn-primary" disabled={this.buttonStatus()}>
            Login
          </button>
        </form>
      </>
    )
  }
}

export default LoginForm
