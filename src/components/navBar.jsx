import React from "react"
import { NavLink } from "react-router-dom"

const NavBar = ({ user }) => {
  return (
    // <BrowserRouter>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <h1 className="navbar-brand m-2">Navbar</h1>
      <button className="navbar-toggler" type="button">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink to="/movies" className="nav-link">
              Movies
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/customers" className="nav-link">
              Customers
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/rentals" className="nav-link">
              Rentals
            </NavLink>
          </li>
        </ul>

        <ul className="navbar-nav">
          {!user && (
            <React.Fragment>
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register" className="nav-link">
                  Register
                </NavLink>
              </li>
            </React.Fragment>
          )}
          {user && (
            <>
              <li className="nav-item">
                <NavLink to="/profile" className="nav-link">
                  {user.name}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/logout" className="nav-link">
                  Logout
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
    // </BrowserRouter>
  )
}

export default NavBar
