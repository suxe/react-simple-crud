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
import LoginForm from "./components/loginform"

function App(props) {
  return (
    <>
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
            Found
          </Route>
          <Redirect exact from="/" to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </>
  )
}

export default App
