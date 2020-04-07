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

    if (account.username === "") errors.username = "The username is required"
    if (account.username.length < 3)
      errors.username = "The username must contain at least 3 characters"

    if (account.password === "") errors.password = "The password is required"
    if (account.password === "")
      errors.password = "The password must contain at least 3 characters"

    return errors
  }

  handleSubmit = (_e) => {
    _e.preventDefault()

    const errors = this.validate()
    this.setState({ errors })

    if (errors) return

    console.log("submitted")
  }

  handleInputChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account }
    account[input.name] = input.value
    this.setState({ account })
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
            errors={errors.username}
            onChange={this.handleInputChange}
          />
          <Input
            name={"password"}
            value={account.password}
            label={"Password"}
            type={"password"}
            errors={errors.password}
            onChange={this.handleInputChange}
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </>
    )
  }
}

export default LoginForm
