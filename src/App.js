import React from "react"
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
import RegisterForm from "./components/registerForm"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App(props) {
  return (
    <>
      <ToastContainer position="bottom-center" />
      <NavBar />
      <main className="container">
        <Switch>
          {/* <Route
            path="/movies/:id"
            component={(props) => <Form {...props} />}
          /> */}
          <Route path="/login">
            <LoginForm />
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

export default App
