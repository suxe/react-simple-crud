import React from "react"
import { Route, Redirect } from "react-router-dom"
import auth from "../services/authService"

const protectedRoute = ({ path, component: Component, render, ...rest }) => {
  const currentUser = auth.getCurrentUser()
  return (
    <Route
      // path={path}
      {...rest}
      render={(props) => {
        if (!currentUser || !currentUser.isAdmin)
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
        return Component ? <Component {...props} /> : render(props)
      }}
    />
  )
}

export default protectedRoute
