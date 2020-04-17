import React, { Component } from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import "./App.css"
// mine
import NavBar from "./components/navBar"
import Movies from "./components/movies"
import MovieForm from "./components/movieForm"
import Customers from "./components/customers"
import Rentals from "./components/rentals"
import NotFound from "./components/notFound"
import LoginForm from "./components/loginForm"
import Logout from "./components/logout"
import RegisterForm from "./components/registerForm"
import auth from "./services/authService"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

class App extends Component {
  state = {}

  componentDidMount() {
    const user = auth.getCurrentUser()
    this.setState({ user })
  }
  render() {
    return (
      <>
        <ToastContainer position="bottom-center" />
        <NavBar user={this.state.user} />
        <main className="container">
          <Switch>
            {/* <Route
              path="/movies/:id"
              component={(props) => <Form {...props} />}
            /> */}
            <Route path="/login">
              <LoginForm />
            </Route>
            <Route path="/logout">
              <Logout />
            </Route>
            <Route path="/register">
              <RegisterForm />
            </Route>
            <Route path="/movies/:id">
              <MovieForm />
            </Route>
            <Route path="/movies">
              <Movies />
            </Route>
            <Route path="/customers">
              <Customers />
            </Route>
            <Route path="/rentals">
              <Rentals />
            </Route>
            <Route path="/not-found">
              <NotFound />
            </Route>
            <Redirect exact from="/" to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </>
    )
  }
}

export default App
