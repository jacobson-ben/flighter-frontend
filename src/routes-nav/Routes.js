import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import ProfileForm from "../profiles/ProfileForm";
import PrivateRoute from "./PrivateRoute";
import SearchForm from "../search/SearchForm";

function Routes({ login, signup }) {

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>

        <Route exact path="/login">
          <LoginForm login={login} />
        </Route>

        <Route exact path="/signup">
          <SignupForm signup={signup} />
        </Route>

        <PrivateRoute path="/profile">
          <ProfileForm />
        </PrivateRoute>

        <PrivateRoute path="/flights">
          <SearchForm />
        </PrivateRoute>

      </Switch>
      
    </div>
  )

}

export default Routes;