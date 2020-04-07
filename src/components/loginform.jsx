import React, { Component } from "react"
import Input from "./input"

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  }

  validate = () => {
    const account = { ...this.state.account }
    let errors = {}

    if (account.username.trim() === "")
      errors.username = "The username is required"
    if (account.username.length < 3)
      errors.username = "The username must contain at least 3 characters"

    if (account.password.trim() === "")
      errors.password = "The password is required"
    if (account.password.length < 3)
      errors.password = "The password must contain at least 3 characters"

    // return Object.keys(errors).length === 0 ? null : errors

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
    let error = ""

    if (name === "password") {
      if (value.trim() === "") error = "The Password is required"
      if (value.length < 3)
        error = "The Password must contain at least 3 characters"
    }

    if (name === "username") {
      if (value.trim() === "") error = "The Name is required"
      if (value.length < 3)
        error = "The Name must contain at least 3 characters"
    }

    return error
  }

  handleInputChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors }
    const error = this.validateProperty(input)
    errors[input.name] = error

    const account = { ...this.state.account }
    account[input.name] = input.value

    this.setState({ account, errors })
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
          <button className="btn btn-primary">Login</button>
        </form>
      </>
    )
  }
}

export default LoginForm
