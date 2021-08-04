import './App.css';
import Routes from "./routes-nav/Routes"
import useLocalStorage from "./hooks/useLocalStorage";
import { BrowserRouter } from 'react-router-dom';
import NavBar from "./routes-nav/Navbar";
import LoadingSpinner from "./common/LoadingSpinner";
import UserContext from "./context/UserContext";
import FlighterApi from './api/UserApi';
import { useState, useEffect } from 'react';
import jwt from "jsonwebtoken";
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchTermContext from './context/SearchTermContext';

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "jobly-token";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [search, setSearch] = useState({})
  const [flights, setFlights] = useState([]);

  // console.debug(
  //     "App",
  //     "infoLoaded=", infoLoaded,
  //     "currentUser=", currentUser,
  //     "token=", token,
  // );

  // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.

  useEffect(function loadUserInfo() {
    // ("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          // put the token on the Api class so it can use it to call the API.
          FlighterApi.token = token;
          let currentUser = await FlighterApi.getCurrentUser(username);
          setCurrentUser(currentUser);
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }

    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  /** Handles site-wide logout. */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  /** Handles site-wide signup.
   *
   * Automatically logs them in (set token) upon signup.
   *
   * Make sure you await this function and check its return value!
   */
  async function signup(signupData) {
    try {
      let token = await FlighterApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  /** Handles site-wide login.
   *
   * Make sure you await this function and check its return value!
   */
  async function login(loginData) {
    try {
      let token = await FlighterApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <SearchTermContext.Provider value={{search, setSearch}}>
      <div className="App">
        <NavBar logout={logout}/>
        <Routes 
          login={login} 
          signup={signup} 
          flights={flights} 
          setFlights={setFlights}
        />
      </div>
      </SearchTermContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;