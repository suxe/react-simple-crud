import React, { Component } from "react"
// import Joi from "@hapi/joi"
import Input from "./input"
import Select from "./select"

class Form extends Component {
  state = {
    data: {},
    errors: {},
  }

  validate = () => {
    // let errors = {}
    let errors = { ...this.state.errors }
    console.log("errors - ", errors)
    const options = { abortEarly: false }
    const { error } = this.schema.validate(this.state.data, options)

    if (error && error.details.length > 0)
      error.details.map((err) => (errors[err.path[0]] = err.message))

    console.log(errors)

    return Object.keys(errors).length ? errors : null
  }

  validateProperty = ({ name, value }) => {
    // const { error } = Joi.string().min(3).required().label(name).validate(value)
    const { schemaRules } = this.state
    const { error } = schemaRules[name].validate(value)

    if (error) return error.message

    return null
  }

  handleSubmit = (_e) => {
    _e.preventDefault()

    const errors = this.validate()
    this.setState({ errors })

    if (errors) return

    this.doSubmit()
  }

  handleInputChange = ({ currentTarget: input }) => {
    let errors = { ...this.state.errors }
    const error = this.validateProperty(input)

    error ? (errors[input.name] = error) : (errors = null)

    const data = { ...this.state.data }
    data[input.name] = input.value

    this.setState({ data, errors })
  }

  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state

    return (
      <Input
        name={name}
        value={data[name] || ""}
        label={label}
        type={type}
        error={errors ? errors[name] : null}
        onChange={this.handleInputChange}
      />
    )
  }

  // options = [{id:..., name:...},{...}]
  renderSelect = (name, label, options) => {
    const { data, errors } = this.state
    return (
      <Select
        name={name}
        value={data[name] || options[0]["id"]}
        label={label}
        options={options}
        error={errors ? errors[name] : null}
        onChange={this.handleInputChange}
      />
    )
  }

  renderButton = (label) => {
    const errors = this.validate()
    return (
      <button className="btn btn-primary" disabled={errors}>
        {errors ? "Disabled" : label}
      </button>
    )
  }
}

export default Form
