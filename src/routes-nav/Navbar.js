import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Navbar.css";

/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */

function Navbar({ logout }) {
  const { currentUser } = useContext(UserContext);
  console.debug("Navbar", "currentUser=", currentUser);

  function loggedInNav() {
    return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/flights">
              Flights
            </NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/trips">
              My Trips
            </NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/profile">
              Profile
            </NavLink>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/" onClick={logout}>
              Log out {currentUser.first_name || currentUser.username}
            </Link>
          </li>
        </ul>
    );
  }

  function loggedOutNav() {
    return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/signup">
              Sign Up
            </NavLink>
          </li>
        </ul>
    );
  }

  return (
      <nav className="Navbar navbar navbar-expand-md">
        <Link className="navbar-brand" to="/">
          Flighter
        </Link>
        {currentUser ? loggedInNav() : loggedOutNav()}
      </nav>
  );
}

export default Navbar;